document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // MÓDULO 1: SCROLL REVEAL (Intersection Observer)
    // ==========================================
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Solo se anima una vez para mejorar rendimiento
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => scrollObserver.observe(reveal));

    // ==========================================
    // MÓDULO 2: EFECTO 3D TILT EN CARDS
    // ==========================================
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calcula la posición del mouse relativa a la tarjeta
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calcula el centro de la tarjeta
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Determina la rotación en base a la distancia del centro (max 8 grados)
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // Resetea la posición cuando el mouse sale
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease'; // Suaviza el retorno
        });

        // Remueve la transición al entrar para que el movimiento sea inmediato
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // ==========================================
    // MÓDULO 3: SISTEMA DE TABS (Sección de Variables)
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Quitar clase active a todos los botones y ocultar todos los paneles
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // 2. Agregar clase active al botón clickeado
            btn.classList.add('active');

            // 3. Mostrar el panel correspondiente al data-target
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
});