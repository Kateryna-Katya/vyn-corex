document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок и плавного скролла
    lucide.createIcons();
    const lenis = new Lenis();
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // 2. Мобильное меню
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    burger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        burger.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // 3. Анимация появления секций (GSAP ScrollTrigger)
    gsap.registerPlugin(ScrollTrigger);
    
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // 4. Валидация формы и Капча
    const form = document.getElementById('careerForm');
    const phoneInput = document.getElementById('phoneInput');
    const captchaLabel = document.getElementById('captchaLabel');
    const captchaInput = document.getElementById('captchaInput');
    const formMessage = document.getElementById('formMessage');

    // Генерация простой капчи
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    captchaLabel.innerText = `${num1} + ${num2} = ?`;

    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, ''); // Только цифры
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (parseInt(captchaInput.value) !== (num1 + num2)) {
            alert('Неверный ответ капчи!');
            return;
        }

        // Имитация AJAX
        form.style.opacity = '0.5';
        form.style.pointerEvents = 'none';

        setTimeout(() => {
            form.reset();
            form.style.opacity = '1';
            form.style.pointerEvents = 'all';
            formMessage.innerText = 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.';
            formMessage.classList.add('success');
            
            // Обновляем капчу
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);
            captchaLabel.innerText = `${num1} + ${num2} = ?`;
        }, 1500);
    });

    // 5. Cookie Popup
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptBtn = document.getElementById('acceptCookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookiePopup.classList.remove('active');
    });
});