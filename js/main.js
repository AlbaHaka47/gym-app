const menu = document.querySelector('.hamburguesa');

const nav = document.querySelector('.nav');

document.addEventListener('DOMContentLoaded',()=>{
    eventos();
});

const eventos = () => {
    menu.addEventListener('click',abrirMenu);
}

