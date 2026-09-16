document.addEventListener("DOMContentLoaded", function () {

    // 1. LÓGICA MENÚ HAMBURGUESA
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });
    }

    // 2. LÓGICA FILTRO DE CATEGORÍAS
    const tarjetasCategoria = document.querySelectorAll('.categoria-card');
    const tarjetasEntrenamiento = document.querySelectorAll('.entrenamiento-card');

    let filtroSeleccionado = null; // Guarda el filtro activo

    tarjetasCategoria.forEach(categoria => {
        categoria.addEventListener('click', function () {
            const h3 = this.querySelector('h3');
            if (!h3) return;

            const texto = h3.innerText.toLowerCase();
            let filtroNuevo = '';

            if (texto.includes('casa')) filtroNuevo = 'casa';
            if (texto.includes('gimnasio')) filtroNuevo = 'gimnasio';
            if (texto.includes('aire')) filtroNuevo = 'aire_libre';

            // Si pulsas en la que ya está filtrada, quitamos el filtro para mostrar todas
            if (filtroSeleccionado === filtroNuevo) {
                filtroSeleccionado = null;
            } else {
                filtroSeleccionado = filtroNuevo;
            }

            // Aplicar visibilidad a las tarjetas de entrenamiento
            tarjetasEntrenamiento.forEach(entrenamiento => {
                const categoriaCard = entrenamiento.dataset.categoria;

                if (filtroSeleccionado === null || categoriaCard === filtroSeleccionado) {
                    entrenamiento.style.display = 'flex';
                    entrenamiento.style.flexDirection = 'column';
                } else {
                    entrenamiento.style.display = 'none';
                }
            });
        });
    });

    /*// 3. LÓGICA GENERADOR DE RUTINAS (SIMULACIÓN EN FRONTEND)

        // Base de datos de prueba local
        const baseEjercicios = {
            casa: {
                principiante: ["Flexiones apoyando rodillas (3x10)", "Sentadillas sin peso (3x12)", "Plancha abdominal (3x30 seg)"],
                intermedio: ["Flexiones clásicas (4x12)", "Zancadas alternativas (3x15)", "Plancha con elevación de pierna (3x45 seg)"],
                avanzado: ["Flexiones con pies elevados (4x15)", "Sentadillas con salto (4x15)", "Burpees (4x12)"]
            },
            gimnasio: {
                principiante: ["Prensa de piernas (3x10)", "Jalón al pecho en polea (3x10)", "Press de pecho en máquina (3x10)"],
                intermedio: ["Sentadilla con barra (4x10)", "Press de banca con barra (4x8)", "Remo con barra (4x10)"],
                avanzado: ["Peso muerto pesado (4x6)", "Press militar de pie (4x8)", "Dominadas con lastre (4x8)"]
            },
            aire_libre: {
                principiante: ["Flexiones en banco del parque (3x10)", "Sentadillas (3x15)", "Jumping Jacks (3x45 seg)"],
                intermedio: ["Dominadas agarre prono (4x8)", "Fondos en paralelas (4x10)", "Sprints de 50 metros (5 series)"],
                avanzado: ["Muscle-ups o Dominadas explosivas (4x5)", "Pistol Squats (4x8 por pierna)", "L-Sit en paralelas (3x20 seg)"]
            }
        };

        const formRutina = document.getElementById("form-rutina");
        const contenedorResultado = document.getElementById("resultado-rutina");

        if (formRutina) {
            formRutina.addEventListener("submit", function (e) {
                // Evita que la página se recargue al enviar el formulario
                e.preventDefault();

                // Capturar los valores seleccionados por el usuario
                const lugar = document.getElementById("lugar").value;
                const nivel = document.getElementById("nivel").value;

                // Obtener los ejercicios correspondientes
                const listaEjercicios = baseEjercicios[lugar][nivel];

                // Construir el HTML de respuesta
                let htmlEjercicios = "";
                listaEjercicios.forEach(ejercicio => {
                    htmlEjercicios += `<li><span>${ejercicio}</span></li>`;
                });

                contenedorResultado.innerHTML = `
                    <div class="tarjeta-resultado">
                        <h3>Tu Rutina Recomendada (${lugar.toUpperCase()} - ${nivel.toUpperCase()})</h3>
                        <ul>
                            ${htmlEjercicios}
                        </ul>
                    </div>
                `;
            });
        }

        */

        // 3. LÓGICA GENERADOR DE RUTINAS (CON VALIDACIÓN Y COOKIES)

            const formRutina = document.getElementById("form-rutina");
            const contenedorResultado = document.getElementById("resultado-rutina");

            if (formRutina) {
                formRutina.addEventListener("submit", function (e) {
                e.preventDefault();

            const lugar = document.getElementById("lugar").value;
            const nivel = document.getElementById("nivel").value;

            contenedorResultado.innerHTML = `
                <div class="tarjeta-resultado">
                    <p style="color: var(--amarillo);">Validando datos y consultando la base de datos...</p>
                </div>
            `;

            // 1. Guardar la última categoría en Cookie
            fetch(`http://localhost:5000/api/preferencias?lugar=${lugar}`, { credentials: 'include' });

            // 2. Petición principal de la rutina
            fetch(`http://localhost:5000/api/rutinas/generar?equipamiento=${lugar}&dificultad=${nivel}`, {
                credentials: 'include'
            })
                .then(async response => {
                    const data = await response.json();
                    
                    // Si express-validator devolvió error (HTTP 400)
                    if (!response.ok) {
                        throw data;
                    }
                    return data;
                })
                .then(data => {
                    if (data.rutina && data.rutina.length > 0) {
                        let htmlEjercicios = "";
                        data.rutina.forEach(ejercicio => {
                            htmlEjercicios += `
                                <li>
                                    <strong>${ejercicio.nombre}</strong> 
                                    <span style="color: var(--turquesa);">${ejercicio.grupo_muscular}</span>
                                </li>
                            `;
                        });

                        contenedorResultado.innerHTML = `
                            <div class="tarjeta-resultado">
                                <h3>Tu Rutina Desde MySQL (${lugar.toUpperCase()} - ${nivel.toUpperCase()})</h3>
                                <ul>${htmlEjercicios}</ul>
                            </div>
                        `;
                    } else {
                        contenedorResultado.innerHTML = `
                            <div class="tarjeta-resultado">
                                <p>No se encontraron ejercicios en la base de datos.</p>
                            </div>
                        `;
                    }
                })
                .catch(error => {
                    console.error("Error devuelto por la API:", error);

                    // Si viene de express-validator, mostramos qué falló
                    if (error.errores) {
                        const listaErrores = error.errores.map(err => `<li>${err.msg}</li>`).join('');
                        contenedorResultado.innerHTML = `
                            <div class="tarjeta-resultado" style="border-color: var(--rosa);">
                                <p style="color: var(--rosa);">⚠️ Error de validación:</p>
                                <ul>${listaErrores}</ul>
                            </div>
                        `;
                    } else {
                        contenedorResultado.innerHTML = `
                            <div class="tarjeta-resultado">
                                <p style="color: var(--rosa);">❌ Error al conectar con el servidor.</p>
                            </div>
                        `;
                    }
                });
        });
    }

});