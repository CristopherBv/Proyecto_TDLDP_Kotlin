document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. HIGH-PERFORMANCE SCROLL OBSERVER
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        scrollObserver.observe(el);
    });

    // ==========================================
    // 2. EFECTO 3D TILT EN CARDS (Hero Logo)
    // ==========================================
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // ==========================================
    // 3. SISTEMA DE TABS (Sección de Variables)
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');

            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // ==========================================
    // 4. SISTEMA DE TABS (Ventajas vs Desventajas)
    // ==========================================
    const vdTabBtns = document.querySelectorAll('.custom-tab-btn');

    vdTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Ubicamos el contenedor padre para aislar el efecto
            const parentHeader = btn.parentElement;
            const parentCard = parentHeader.parentElement;

            // 2. Quitamos la clase 'active' de los botones hermanos
            parentHeader.querySelectorAll('.custom-tab-btn').forEach(b => b.classList.remove('active'));

            // 3. Ocultamos todos los paneles de texto de esta tarjeta
            parentCard.querySelectorAll('.custom-tab-pane').forEach(p => p.classList.remove('active'));

            // 4. Encendemos el botón clickeado y mostramos su texto
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

});