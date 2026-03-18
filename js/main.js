document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. SCROLL PROGRESS BAR
    // ==========================================
    const progressBar = document.getElementById("progressBar");
    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    });

    // ==========================================
    // 2. MOUSE TRACKING FOR GLOW CARDS
    // ==========================================
    const glowCards = document.querySelectorAll('.glow-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // ==========================================
    // 3. HIGH-PERFORMANCE SCROLL OBSERVER
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
    // 4. EFECTO 3D TILT EN CARDS (Hero Logo)
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
    // 5. SISTEMA DE TABS (Sección de Variables)
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
    // 6. SISTEMA DE TABS (Ventajas vs Desventajas)
    // ==========================================
    const vdTabBtns = document.querySelectorAll('.custom-tab-btn');

    vdTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parentHeader = btn.parentElement;
            const parentCard = parentHeader.parentElement;
            parentHeader.querySelectorAll('.custom-tab-btn').forEach(b => b.classList.remove('active'));
            parentCard.querySelectorAll('.custom-tab-pane').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // ==========================================
    // 7. SISTEMA DE ACORDEÓN (Para Ventajas/Desventajas)
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            if (content) {
                content.classList.toggle('open');
            }
        });
    });

    // ==========================================
    // 8. CARRUSEL AUTOMÁTICO
    // ==========================================
    const slides = document.querySelectorAll('#creators-carousel .carousel-slide');

    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3000);
    }

    // ==========================================
    // 9. LÍNEA DE TIEMPO COMPACTA INTERACTIVA
    // ==========================================
    const tNodes = document.querySelectorAll('.timeline-nodes .node');
    const tPanes = document.querySelectorAll('.timeline-viewer .details-pane');

    tNodes.forEach(node => {
        node.addEventListener('click', () => {
            tNodes.forEach(n => n.classList.remove('active'));
            tPanes.forEach(p => p.classList.remove('active'));
            node.classList.add('active');
            const targetPaneId = node.getAttribute('data-pane');
            const targetPane = document.getElementById(targetPaneId);
            if(targetPane){
                targetPane.classList.add('active');
            }
        });
    });

    // ==========================================
    // 10. PARALLAX EFFECT FOR BACKGROUND
    // ==========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const fluid1 = document.querySelector('.fluid-1');
        const fluid2 = document.querySelector('.fluid-2');
        
        if (fluid1) fluid1.style.transform = `translateY(${scrolled * 0.1}px) scale(${1 + scrolled * 0.0001})`;
        if (fluid2) fluid2.style.transform = `translateY(${scrolled * -0.1}px) scale(${1 + scrolled * 0.0001})`;
    });

});
