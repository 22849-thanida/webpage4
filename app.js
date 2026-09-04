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
                // Cursor Track
const cursorGlow = document.getElementById('cursor-glow');
window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// 5-Stage Cinematic Timeline Sequence
document.getElementById('enter-btn').addEventListener('click', () => {
    const curtain = document.getElementById('ocean-curtain');
    const portal = document.getElementById('portal-target');
    const statusBox = document.getElementById('portal-status-box');
    const statusText = document.getElementById('status-text');
    const progressBar = document.getElementById('progress-bar');
    const statusPercent = document.getElementById('status-percent');

    const flash = document.getElementById('screen-flash');
    const crack = document.getElementById('reality-crack');
    const btn = document.getElementById('enter-btn');

    const waves = [
        document.getElementById('shockwave-1'),
        document.getElementById('shockwave-2'),
        document.getElementById('shockwave-3'),
        document.getElementById('shockwave-4'),
        document.getElementById('shockwave-5')
    ];

    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.3';
    statusBox.style.display = 'block';

    // Start 6-Second Epic Audio
    if (typeof playLongEpicEntranceSound === 'function') {
        playLongEpicEntranceSound();
    }

    // --- STAGE 1: ENERGY CHARGE (0s - 2.2s) ---
    portal.classList.add('portal-charge');
    let percent = 0;
    const progressInterval = setInterval(() => {
        percent += 1;
        if (percent <= 100) {
            progressBar.style.width = percent + '%';
            statusPercent.textContent = percent + '%';

            if (percent === 30) statusText.textContent = 'CORE ENERGY CHARGING...';
            if (percent === 60) statusText.textContent = 'QUANTUM STABILITY: CRITICAL';
            if (percent === 85) statusText.textContent = 'IMPLOSION SINGULARITY NEAR';
        } else {
            clearInterval(progressInterval);
        }
    }, 22);

    // --- STAGE 2: GRAVITY WELL IMPLOSION (2.2s - 3.8s) ---
    setTimeout(() => {
        statusText.textContent = 'WARNING: GRAVITY COLLAPSE!';
        portal.classList.remove('portal-charge');
        portal.classList.add('portal-implode');
        if (typeof setParticleState === 'function') {
            setParticleState('suck');
        }
    }, 2200);

    // --- STAGE 3: SUPERNOVA EXPLOSION & REALITY CRACK (3.9s) ---
    setTimeout(() => {
        statusText.textContent = 'DIMENSION SHATTERING...';
        document.body.classList.add('earthquake-shake');
        crack.classList.add('crack-active');

        if (typeof setParticleState === 'function') {
            setParticleState('warp');
        }
        if (typeof triggerPortalExplosion === 'function') {
            triggerPortalExplosion(window.innerWidth / 2, window.innerHeight / 2);
        }

        flash.classList.add('flash-active');
        waves.forEach((w, idx) => {
            setTimeout(() => w.classList.add('active'), idx * 120);
        });

        curtain.classList.add('open');
    }, 3900);

    // --- STAGE 4: CLEANUP & REVEAL SITE (6.0s) ---
    setTimeout(() => {
        curtain.style.display = 'none';
        flash.classList.remove('flash-active');
        crack.classList.remove('crack-active');
        document.body.classList.remove('earthquake-shake');
    }, 6000);
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
