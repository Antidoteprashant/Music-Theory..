window.addEventListener('DOMContentLoaded', () => {
    alert("Welcome to Music Theory!");
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.classList.remove('active');
        section.classList.remove('highlighted');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

const highlightBtn = document.getElementById('highlight-btn');
if (highlightBtn) {
    highlightBtn.addEventListener('click', () => {
        const activeSection = document.querySelector('section.active');
        if (activeSection) {
            activeSection.classList.toggle('highlighted');
        }
    });
}

const notes = ["A", "B", "C", "D", "E", "F", "G"];
const randomNoteBtn = document.getElementById('random-note-btn');
const noteDisplay = document.getElementById('random-note-display');

if (randomNoteBtn && noteDisplay) {
    randomNoteBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * notes.length);
        const randomNote = notes[randomIndex];

        noteDisplay.textContent = randomNote;

        noteDisplay.style.transform = "scale(1.5)";
        setTimeout(() => {
            noteDisplay.style.transform = "scale(1)";
        }, 200);
    });
}

// 3D Background Animation
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    let width, height;
    const particles = [];
    const musicalChars = ['♪', '♫', '♩', '♬', '♭', '♮', '♯'];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = (Math.random() - 0.5) * width * 1.5;
            this.y = (Math.random() - 0.5) * height * 1.5;
            this.z = initial ? Math.random() * 1000 : 1000;
            this.char = musicalChars[Math.floor(Math.random() * musicalChars.length)];
            this.size = 20 + Math.random() * 30;
            this.velocity = 0.5 + Math.random() * 1.5;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        }

        update() {
            this.z -= this.velocity;
            this.rotation += this.rotationSpeed;

            if (this.z <= 0.1) {
                this.reset();
            }
        }

        draw() {
            const perspective = 300;
            const scale = perspective / (perspective + this.z);
            const x2d = width / 2 + this.x * scale;
            const y2d = height / 2 + this.y * scale;

            ctx.save();
            ctx.translate(x2d, y2d);
            ctx.scale(scale, scale);
            ctx.rotate(this.rotation);
            
            // Opacity based on depth (fade in from back, fade out very close)
            const alpha = Math.min(1, (1000 - this.z) / 200) * 0.5; 
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#4ecca3';
            ctx.font = `${this.size}px Arial`;
            ctx.fillText(this.char, -this.size/2, -this.size/2);
            
            ctx.restore();
        }
    }

    function initAnimation() {
        resize();
        window.addEventListener('resize', resize);

        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    initAnimation();
}