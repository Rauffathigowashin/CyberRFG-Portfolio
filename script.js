document.addEventListener('DOMContentLoaded', function() {
    const typingEffectElement = document.getElementById('typing-effect');
    if (typingEffectElement) {
        const words = ["Cybersecurity Enthusiast", "Python Developer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        function type() {
            const currentWord = words[wordIndex];
            const typeSpeed = isDeleting ? 75 : 150;

            if (isDeleting) {
                typingEffectElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            } else {
                typingEffectElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentWord.length) {
                    setTimeout(() => { isDeleting = true; }, 2000);
                }
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    const animatedElements = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    const canvas = document.getElementById('matrix-background');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        const characters = '01';
        const charArray = characters.split('');
        const fontSize = 16;
        let columns = Math.ceil(canvas.width / fontSize);

        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const matrixColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');

        function draw() {
            ctx.fillStyle = 'rgba(15, 15, 26, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = matrixColor; 
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 40);
        window.addEventListener('resize', () => {
            setCanvasSize();
            columns = Math.ceil(canvas.width / fontSize);
            drops.length = 0;
            for (let x = 0; x < columns; x++) {
                drops[x] = 1;
            }
        });
    }

    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});