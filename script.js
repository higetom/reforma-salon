// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.remove('show');
        }
    });

    // Mobile menu toggle - 修正版
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // トグル状態を切り替え
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('show');
            
            console.log('Menu toggled:', navbarMenu.classList.contains('show')); // デバッグ用
        });

        // メニューリンクがクリックされたときにメニューを閉じる
        const navLinks = navbarMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('show');
            });
        });

        // 外側をクリックしたときにメニューを閉じる
        document.addEventListener('click', function(event) {
            if (!navbarToggle.contains(event.target) && !navbarMenu.contains(event.target)) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('show');
            }
        });

        // ESCキーでメニューを閉じる
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('show');
            }
        });
    }

    // Scroll to top button
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Hero slider functionality
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    const prevSlideBtn = document.querySelector('.prev-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    // Function to change slides
    function changeSlide(index) {
        // Remove active class from all slides and dots
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        heroDots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Add active class to the current slide and dot
        currentSlide = (index + heroSlides.length) % heroSlides.length;
        if (heroSlides[currentSlide]) heroSlides[currentSlide].classList.add('active');
        if (heroDots[currentSlide]) heroDots[currentSlide].classList.add('active');

        // Reset the auto slide interval
        resetSlideInterval();
    }

    // Auto slide functionality
    function startSlideInterval() {
        if (heroSlides.length > 1) {
            slideInterval = setInterval(() => {
                changeSlide(currentSlide + 1);
            }, 5000); // Change slide every 5 seconds
        }
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    // Initialize slider only if slides exist
    if (heroSlides.length > 0) {
        startSlideInterval();
    }

    // Previous and Next buttons
    if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', () => {
            changeSlide(currentSlide - 1);
        });
    }

    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', () => {
            changeSlide(currentSlide + 1);
        });
    }

    // Dot navigation
    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            changeSlide(index);
        });
    });

    // Service menu tabs
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            menuTabs.forEach(t => t.classList.remove('active'));
            menuContents.forEach(c => c.classList.remove('active'));

            // Add active class to the clicked tab
            tab.classList.add('active');

            // Show the corresponding content
            const tabId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Reservation option tabs
    const optionTabs = document.querySelectorAll('.option-tab');
    const optionDetails = document.querySelectorAll('.option-details');

    optionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and details
            optionTabs.forEach(t => t.classList.remove('active'));
            optionDetails.forEach(d => d.classList.remove('active'));

            // Add active class to the clicked tab
            tab.classList.add('active');

            // Show the corresponding details
            const optionType = tab.getAttribute('data-option');
            const targetDetails = document.getElementById(`${optionType}-details`);
            if (targetDetails) {
                targetDetails.classList.add('active');
            }
        });
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    // Function to change testimonials
    function changeTestimonial(index) {
        // Remove active class from all testimonials and dots
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Add active class to the current testimonial and dot
        currentTestimonial = (index + testimonials.length) % testimonials.length;
        if (testimonials[currentTestimonial]) testimonials[currentTestimonial].classList.add('active');
        if (testimonialDots[currentTestimonial]) testimonialDots[currentTestimonial].classList.add('active');
    }

    // Auto testimonial rotation
    function startTestimonialInterval() {
        if (testimonials.length > 1) {
            testimonialInterval = setInterval(() => {
                changeTestimonial(currentTestimonial + 1);
            }, 8000); // Change testimonial every 8 seconds
        }
    }

    // Initialize testimonial slider
    if (testimonials.length > 0) {
        startTestimonialInterval();
    }

    // Testimonial dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            changeTestimonial(index);
            clearInterval(testimonialInterval);
            startTestimonialInterval();
        });
    });

    // もっと読むボタン機能 - 修正版
    const readMoreBtn = document.getElementById('read-more-btn');
    const readLessBtn = document.getElementById('read-less-btn');
    const conceptDetails = document.getElementById('concept-details');

    if (readMoreBtn && readLessBtn && conceptDetails) {
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            conceptDetails.classList.remove('hidden');
            readMoreBtn.style.display = 'none';
            
            // スムーズにスクロール
            setTimeout(() => {
                conceptDetails.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 100);
        });
        
        readLessBtn.addEventListener('click', function(e) {
            e.preventDefault();
            conceptDetails.classList.add('hidden');
            
            setTimeout(() => {
                readMoreBtn.style.display = 'flex';
                // 「もっと詳しく」ボタンの位置にスムーズにスクロール
                readMoreBtn.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 500); // アニメーション完了後にもっと読むボタンを表示
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navbarMenu && navbarMenu.classList.contains('show')) {
                    navbarMenu.classList.remove('show');
                    if (navbarToggle) navbarToggle.classList.remove('active');
                }
                
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dynamically set active navigation link based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.navbar-nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === currentSection) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);

    // リサイズ時にモバイルメニューを閉じる
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            if (navbarToggle) navbarToggle.classList.remove('active');
            if (navbarMenu) navbarMenu.classList.remove('show');
        }
    });

    // デバッグ用：要素の存在確認
    console.log('Navbar toggle:', navbarToggle);
    console.log('Navbar menu:', navbarMenu);
    console.log('Read more btn:', readMoreBtn);
    console.log('Read less btn:', readLessBtn);
    console.log('Concept details:', conceptDetails);
});

// Loading animation (optional)
window.addEventListener('load', function() {
    // Hide preloader if you decide to add one
    // const preloader = document.querySelector('.preloader');
    // if (preloader) {
    //     preloader.style.display = 'none';
    // }
    
    // 初期化完了のログ
    console.log('Site loaded successfully');
});
