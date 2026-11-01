import { useState, useEffect } from 'react';
import { normalizarRutina } from '../utils/normalizarRutina';
import { DIAS_SEMANA } from '../data/diasSemana';

const crearDias = (lista) =>
  lista.map((dia) => ({ ...dia, ejercicios: [] }));

const PLANES_INICIALES = {
  lista: crearDias([{ id: 'lista', nombre: 'Mi lista' }]),
  semana: crearDias(DIAS_SEMANA),
  dias: crearDias([
    { id: 'dia-1', nombre: 'Día 1' },
    { id: 'dia-2', nombre: 'Día 2' },
    { id: 'dia-3', nombre: 'Día 3' },
  ]),
};

const RUTINA_INICIAL = {
  id: null,
  nombre: "",
  objetivo: "hipertrofia",
  modo: "semana",
  planes: PLANES_INICIALES,
};

const DIA_INICIAL = "lunes";

const CLAVE_BORRADOR = "anywherefit:borrador";

const cargarBorrador = () => {
  try {
    const texto = localStorage.getItem(CLAVE_BORRADOR);
    if (!texto) return null;

    const datos = JSON.parse(texto);
    const rutina = normalizarRutina(datos.rutina);
    if (!rutina) return null;

    const dias = rutina.planes[rutina.modo];
    const diaActivo = dias.some((dia) => dia.id === datos.diaActivo)
      ? datos.diaActivo
      : dias[0].id;

    return { rutina, diaActivo };
  } catch {
    return null;
  }
};

const renumerar = (lista) =>
  lista.map((dia, indice) => ({ ...dia, nombre: `Día ${indice + 1}` }));

  export function useRutina() {
    const [inicial] = useState(cargarBorrador);
    const [rutina, setRutina] = useState(inicial?.rutina ?? RUTINA_INICIAL);
    const [diaActivo, setDiaActivo] = useState(inicial?.diaActivo ?? DIA_INICIAL);

    useEffect(() => {
      try {
        localStorage.setItem(
          CLAVE_BORRADOR,
          JSON.stringify({ rutina, diaActivo })
        );
      } catch {
        // Sin espacio o con el almacenamiento bloqueado: seguimos sin guardar
      }
    }, [rutina, diaActivo]);

    const dias = rutina.planes[rutina.modo];

    const cambiarModo = (nuevoModo) => {
      setRutina((prev) => ({ ...prev, modo: nuevoModo }));
      setDiaActivo(rutina.planes[nuevoModo][0].id);
    };

    const actualizarDias = (cambiar) => {
      setRutina((prev) => ({
        ...prev,
        planes: {
          ...prev.planes,
          [prev.modo]: cambiar(prev.planes[prev.modo]),
        },
      }));
    };

    const agregarEjercicio = (ejercicioId, diaId = diaActivo, antesDeUid = null) => {
      const nuevo = {
        uid: crypto.randomUUID(),
        ejercicioId,
        series: 3,
        reps: 10,
        descanso: 60,
      };

      actualizarDias((diasActuales) =>
        diasActuales.map((dia) => {
          if (dia.id !== diaId) return dia;

          const copia = [...dia.ejercicios];
          const indice = copia.findIndex((item) => item.uid === antesDeUid);

          copia.splice(indice === -1 ? copia.length : indice, 0, nuevo);

          return { ...dia, ejercicios: copia };
        })
    );
    };

    const cambiarDato = (campo, valor) => {
      setRutina((prev) => ({ ...prev, [campo]: valor }));
    };

    const agregarDia = () => {
      if (dias.length >= 7) return;

      const nuevoDia = {
        id: `dia-${crypto.randomUUID()}`,
        nombre: '',
        ejercicios: [],
      };

      actualizarDias((diasActuales) => renumerar([...diasActuales, nuevoDia]));
      setDiaActivo(nuevoDia.id);
    };

    const eliminarDia = (diaId) => {
      if (dias.length <= 1) return;

      actualizarDias((diasActuales) =>
        renumerar(diasActuales.filter((dia) => dia.id !== diaId))
      );

      if (diaActivo === diaId) {
        setDiaActivo(dias.find((dia) => dia.id !== diaId).id);
      }
    };

    const actualizarEjercicio = (diaId, uid, campo, valor) => {
      actualizarDias((diasActuales) =>
        diasActuales.map((dia) =>
          dia.id === diaId
            ? {
                ...dia,
                ejercicios: dia.ejercicios.map((item) =>
                  item.uid === uid ? { ...item, [campo]: valor } : item
                ),
              }
            : dia
        )
      );
    };

    const eliminarEjercicio = (diaId, uid) => {
      actualizarDias((diasActuales) =>
        diasActuales.map((dia) =>
          dia.id === diaId
            ? {
                ...dia,
                ejercicios: dia.ejercicios.filter((item) => item.uid !== uid),
              }
            : dia
        )
      );
    };

    const moverEjercicio = (diaId, uid, direccion) => {
      actualizarDias((diasActuales) =>
        diasActuales.map((dia) => {
          if (dia.id !== diaId) return dia;

          const indice = dia.ejercicios.findIndex((item) => item.uid === uid);
          const destino = indice + direccion;

          if (destino < 0 || destino >= dia.ejercicios.length) return dia;

          const copia = [...dia.ejercicios];
          [copia[indice], copia[destino]] = [copia[destino], copia[indice]];

          return { ...dia, ejercicios: copia };
        })
      );
    };

    const reubicarEjercicio = (uid, diaDestinoId, sobreUid, debajo) => {
      actualizarDias((diasActuales) => {
        const diaOrigen = diasActuales.find((dia) =>
          dia.ejercicios.some((item) => item.uid === uid)
        );
        if (!diaOrigen) return diasActuales;

        // Mismo día: el ejercicio ocupa el sitio de aquel sobre el que se suelta
        if (diaOrigen.id === diaDestinoId) {
          return diasActuales.map((dia) => {
            if (dia.id !== diaOrigen.id) return dia;

            const copia = [...dia.ejercicios];
            const desde = copia.findIndex((item) => item.uid === uid);
            const hasta = sobreUid
              ? copia.findIndex((item) => item.uid === sobreUid)
              : copia.length - 1;

            const [movido] = copia.splice(desde, 1);
            copia.splice(hasta, 0, movido);

            return { ...dia, ejercicios: copia };
          });
        }

        // Otro día: se quita del origen y se inserta en el destino
        const movido = diaOrigen.ejercicios.find((item) => item.uid === uid);

        return diasActuales.map((dia) => {
          if (dia.id === diaOrigen.id) {
            return {
              ...dia,
              ejercicios: dia.ejercicios.filter((item) => item.uid !== uid),
            };
          }

          if (dia.id === diaDestinoId) {
            const copia = [...dia.ejercicios];
            const indiceSobre = copia.findIndex((item) => item.uid === sobreUid);
            const posicion =
              indiceSobre === -1 ? copia.length : indiceSobre + (debajo ? 1 : 0);

            copia.splice(posicion, 0, movido);
            return { ...dia, ejercicios: copia };
          }

          return dia;
        });
      });
    };

    const vaciarRutina = () => {
      setRutina(RUTINA_INICIAL);
      setDiaActivo(DIA_INICIAL);
    };

    const cargarRutina = (guardada) => {
      const normalizada = normalizarRutina(guardada);
      if (!normalizada) return;

      setRutina(normalizada);
      setDiaActivo(normalizada.planes[normalizada.modo][0].id);
    };

    const reemplazarPlan = (nuevosDias, nombreSugerido) => {
      setRutina((prev) => ({
        ...prev,
        nombre: prev.nombre.trim() === '' ? nombreSugerido : prev.nombre,
        planes: { ...prev.planes, [prev.modo]: nuevosDias },
      }));

      const primero =
        nuevosDias.find((dia) => dia.ejercicios.length > 0) ?? nuevosDias[0];
      setDiaActivo(primero.id);
    };

    return {
      rutina,
      dias,
      diaActivo,
      setDiaActivo,
      cambiarModo,
      cambiarDato,
      agregarDia,
      eliminarDia,
      agregarEjercicio,
      actualizarEjercicio,
      eliminarEjercicio,
      moverEjercicio,
      reubicarEjercicio,
      vaciarRutina,
      cargarRutina,
      reemplazarPlan,
    };
  }