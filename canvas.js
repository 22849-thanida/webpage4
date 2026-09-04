const canvas = document.getElementById('plankton-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let warpParticles = [];
let mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class PlanktonParticle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3.5 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8 - 0.2;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.color = Math.random() > 0.4 ? '#00f5d4' : (Math.random() > 0.5 ? '#ff70a6' : '#00bbf9');
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (mouse.x && mouse.y) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let force = (mouse.radius - distance) / mouse.radius;
                this.x -= forceDirectionX * force * 5;
                this.y -= forceDirectionY * force * 5;
            }
        }
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) { this.reset(); }
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 14;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
    }
}

// Hyper Velocity Laser Streaks (ลำแสงพุ่งทะลุจอ)
class WarpParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 35 + 10;
        this.friction = 0.96;
        this.length = Math.random() * 80 + 20;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.008;
        this.color = Math.random() > 0.3 ? '#00f5d4' : (Math.random() > 0.5 ? '#ff70a6' : '#ffffff');
        this.lineWidth = Math.random() * 4 + 1;
    }
    update() {
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= this.decay;
    }
    draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.shadowBlur = 25;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();
        ctx.restore();
    }
}

function triggerPortalExplosion(x, y) {
    for (let i = 0; i < 250; i++) {
        warpParticles.push(new WarpParticle(x, y));
    }
}

for (let i = 0; i < 80; i++) {
    particles.push(new PlanktonParticle());
}

function animatePlankton() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });

    for (let i = warpParticles.length - 1; i >= 0; i--) {
        const wp = warpParticles[i];
        wp.update();
        wp.draw();
        if (wp.alpha <= 0) warpParticles.splice(i, 1);
    }
    requestAnimationFrame(animatePlankton);
}
animatePlankton();
const canvas = document.getElementById('plankton-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let warpParticles = [];
let particleState = 'normal'; // 'normal' | 'suck' | 'warp'
let mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class PlanktonParticle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3.5 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8 - 0.2;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.color = Math.random() > 0.4 ? '#00f5d4' : (Math.random() > 0.5 ? '#ff70a6' : '#00bbf9');
    }
    update() {
        if (particleState === 'suck') {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            let dx = centerX - this.x;
            let dy = centerY - this.y;
            this.x += dx * 0.08;
            this.y += dy * 0.08;
            this.size *= 0.97;
            return;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        if (mouse.x && mouse.y) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let force = (mouse.radius - distance) / mouse.radius;
                this.x -= forceDirectionX * force * 5;
                this.y -= forceDirectionY * force * 5;
            }
        }
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) { this.reset(); }
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 14;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
    }
}

// 3D Speed Tunnel Warp Lines
class WarpParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 45 + 15;
        this.friction = 0.97;
        this.length = Math.random() * 120 + 30;
        this.alpha = 1;
        this.decay = Math.random() * 0.012 + 0.005;
        this.color = ['#00f5d4', '#ff70a6', '#ffffff', '#00bbf9', '#7000ff'][Math.floor(Math.random() * 5)];
        this.lineWidth = Math.random() * 5 + 1.5;
    }
    update() {
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= this.decay;
    }
    draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.shadowBlur = 30;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();
        ctx.restore();
    }
}

function setParticleState(state) {
    particleState = state;
}

function triggerPortalExplosion(x, y) {
    for (let i = 0; i < 350; i++) {
        warpParticles.push(new WarpParticle(x, y));
    }
}

for (let i = 0; i < 100; i++) {
    particles.push(new PlanktonParticle());
}

function animatePlankton() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });

    for (let i = warpParticles.length - 1; i >= 0; i--) {
        const wp = warpParticles[i];
        wp.update();
        wp.draw();
        if (wp.alpha <= 0) warpParticles.splice(i, 1);
    }
    requestAnimationFrame(animatePlankton);
}
animatePlankton();
