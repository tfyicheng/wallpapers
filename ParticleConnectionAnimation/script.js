let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let particles = [];
let mouse = { x: null, y: null };
let config = {
 lineColor: [255, 255, 255],
    bgColor: [0, 0, 0],
    density: 100,
    particleSpeed: 1.5,
    particleSize: 2,
    connectionDistance: 100
};

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * config.particleSpeed;
    this.vy = (Math.random() - 0.5) * config.particleSpeed;
    this.radius = config.particleSize;
}

Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
};

Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgb(' + config.lineColor.join(',') + ')';
    ctx.fill();
};

function initParticles() {
    particles = [];
    for (let i = 0; i < config.density; i++) {
        particles.push(new Particle());
    }
}

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < config.connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(' + config.lineColor.join(',') + ',' + (1 - dist / config.connectionDistance) + ')';
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
            let dx = particles[i].x - mouse.x;
            let dy = particles[i].y - mouse.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < config.connectionDistance * 1.5) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(' + config.lineColor.join(',') + ',' + (1 - dist / (config.connectionDistance * 1.5)) + ')';
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
}


function animate() {
    ctx.fillStyle = 'rgb(' + config.bgColor.join(',') + ')';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawLines();
    requestAnimationFrame(animate);
}

function parseColorString(str) {
    // 将0-1范围的颜色值转换为0-255范围
    return str.split(' ').map(s => Math.ceil(parseFloat(s.trim()) * 255));
}

window.wallpaperPropertyListener = {
    applyUserProperties: function (props) {
        if (props.lineColor) config.lineColor = parseColorString(props.lineColor.value);
        if (props.bgColor) config.bgColor = parseColorString(props.bgColor.value);
        if (props.density) {
            config.density = props.density.value;
            initParticles();
        }
        if (props.particleSpeed) {
            config.particleSpeed = props.particleSpeed.value;
            initParticles();
        }
        if (props.particleSize) {
            config.particleSize = props.particleSize.value;
            initParticles();
        }
        if (props.connectionDistance) {
            config.connectionDistance = props.connectionDistance.value;
        }
    }
};


initParticles();
animate();

