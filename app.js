// Cursor Track
const cursorGlow = document.getElementById('cursor-glow');
window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Grand Entrance Sequence Engine
document.getElementById('enter-btn').addEventListener('click', () => {
    const curtain = document.getElementById('ocean-curtain');
    const portal = document.getElementById('portal-target');
    const flash = document.getElementById('screen-flash');
    const w1 = document.getElementById('shockwave-1');
    const w2 = document.getElementById('shockwave-2');
    const w3 = document.getElementById('shockwave-3');

    // Step 1: Start Sound & Charge Implosion (0ms)
    if (typeof playEpicEntranceSound === 'function') {
        playEpicEntranceSound();
    }
    portal.classList.add('portal-implode');

    // Step 2: Mega Explosion (at 700ms)
    setTimeout(() => {
        // Trigger Tremor Shake on body
        document.body.classList.add('earthquake-shake');

        // Particle Warp Stream
        if (typeof triggerPortalExplosion === 'function') {
            triggerPortalExplosion(window.innerWidth / 2, window.innerHeight / 2);
        }

        // Screen Flash & Shockwave Blast
        flash.classList.add('flash-active');
        w1.classList.add('active');
        w2.classList.add('active');
        w3.classList.add('active');

        // Open Curtain
        curtain.classList.add('open');
    }, 700);

    // Step 3: Cleanup FX (at 2000ms)
    setTimeout(() => {
        curtain.style.display = 'none';
        flash.classList.remove('flash-active');
        document.body.classList.remove('earthquake-shake');
    }, 2000);
});

// Navigation Engine
const navLinks = document.querySelectorAll('.nav-link, .nav-trigger');
const sections = document.querySelectorAll('.content-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').replace('#', '');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            e.preventDefault();
            if (typeof playBubbleClickSound === 'function') {
                playBubbleClickSound();
            }

            document.querySelectorAll('.nav-link').forEach(nl => nl.classList.remove('active'));
            const activeNav = document.querySelector(`.nav-link[href="#${targetId}"]`);
            if (activeNav) activeNav.classList.add('active');

            sections.forEach(sec => sec.classList.remove('active'));
            targetSection.classList.add('active');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// 3D Glass Card Tilt Effect
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 12;
        const rotateY = (centerX - x) / 12;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
});
