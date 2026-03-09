/*Esperar a que tod el HTML cargue*/
document.addEventListener("DOMContentLoaded", function() {

    // Seleccionar todos los elementos que tienen la clase 'reveal'
    const reveals = document.querySelectorAll('.reveal');

    // Configurar el observador
    const revealOptions = {
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            // Si el elemento entra en la pantalla, le agregamos la clase 'active'
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Opcional: Descomenta la siguiente línea si quieres que la animación ocurra solo una vez
                // observer.unobserve(entry.target);
            } else {
                // Si sale de la pantalla, se la quitamos para que vuelva a animarse al subir
                entry.target.classList.remove('active');
            }
        });
    }, revealOptions);

    // Aplicar el observador a cada elemento
    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});