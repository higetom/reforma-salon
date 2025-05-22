// Re'forma サロン - JavaScript（完全版・アニメーション復活・スマホナビ問題修正済み）

document.addEventListener('DOMContentLoaded', function() {
    console.log('ページ読み込み完了 - 初期化開始');
    
    // 各機能を初期化
    initializeHamburgerMenu();
    initializeOptionTabs();
    initializeMenuTabs();
    initializeSmoothScroll();
    initializeTestimonialCarousel();
    initializeScrollEffects();
    initializeConceptToggle();
    initializeAnimations();
    
    console.log('すべての初期化が完了しました');
});

// ハンバーガーメニューの処理（改良版・スマホ問題完全解決）
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('navbar-toggle');
    const navMenu = document.getElementById('navbar-nav');
    const navLinks = document.querySelectorAll('.navbar-nav a');
    const body = document.body;

    console.log('ハンバーガーメニュー初期化:', hamburger ? '成功' : '失敗');

    if (hamburger && navMenu) {
        // ハンバーガーボタンクリック
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = hamburger.classList.contains('active');
            
            if (isActive) {
                // メニューを閉じる
                closeMenu();
            } else {
                // メニューを開く
                openMenu();
            }
        });

        // メニューを開く関数
        function openMenu() {
            hamburger.classList.add('active');
            navMenu.classList.add('show');
            body.classList.add('menu-open');
            
            // スマホでのスクロール防止
            if (window.innerWidth <= 992) {
                body.style.overflow = 'hidden';
            }
        }

        // メニューを閉じる関数
        function closeMenu() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('show');
            body.classList.remove('menu-open');
            body.style.overflow = '';
        }

        // メニューリンククリック時にメニューを閉じる
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // メニュー外クリック時にメニューを閉じる
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && 
                !navMenu.contains(event.target) && 
                navMenu.classList.contains('show')) {
                closeMenu();
            }
        });

        // ESCキーでメニューを閉じる
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('show')) {
                closeMenu();
            }
        });

        // リサイズ時の処理（重要：スマホナビ問題解決）
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992) {
                // デスクトップサイズになったらメニューを閉じる
                closeMenu();
            }
        });

        // タッチイベントの処理（スマホ専用）
        if ('ontouchstart' in window) {
            navMenu.addEventListener('touchstart', function(e) {
                e.stopPropagation();
            });
        }
    }
}

// 予約オプションタブの処理（完全修正版）
function initializeOptionTabs() {
    const optionTabs = document.querySelectorAll('.option-tab');
    const optionDetails = document.querySelectorAll('.option-details');
    
    console.log('予約タブ初期化:', optionTabs.length, '個のタブ見つかりました');
    console.log('予約詳細:', optionDetails.length, '個の詳細見つかりました');
    
    // 詳細情報の定義（HTMLから現在の内容を保持）
    const optionData = {
        'home': {
            id: 'home',
            title: '出張サービス',
            content: `
                <h3>出張サービス</h3>
                <p>お客様のご自宅やご希望の場所での施術です。</p>
                <ul class="preparation-list">
                    <li><i class="fas fa-check"></i>施術用のスペース（畳2畳程度）をご用意ください</li>
                    <li><i class="fas fa-check"></i>タオル類はこちらで準備いたします</li>
                    <li><i class="fas fa-check"></i>駐車スペースがあると助かります</li>
                </ul>
            `
        },
        'salon': {
            id: 'salon',
            title: 'サロン施術',
            content: `
                <h3>サロン施術</h3>
                <p>専用サロンスペースでの施術です。</p>
                <div class="space-address">
                    <p><i class="fas fa-map-marker-alt"></i>〒XXX-XXXX 住所詳細</p>
                    <p><i class="fas fa-car"></i>駐車場：2台分完備</p>
                    <p><i class="fas fa-train"></i>最寄り駅：○○駅より徒歩5分</p>
                </div>
            `
        }
    };
    
    if (optionTabs.length > 0) {
        // 各詳細エリアの初期内容を確実に保存
        optionDetails.forEach(detail => {
            const dataOption = detail.id;
            if (optionData[dataOption] && !optionData[dataOption].originalContent) {
                optionData[dataOption].originalContent = detail.innerHTML;
            }
        });
        
        // タブクリックイベント
        optionTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                const selectedOption = this.getAttribute('data-option');
                console.log('予約タブクリック:', selectedOption);
                
                // 全てのタブのアクティブ状態をリセット
                optionTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // 全ての詳細を非表示
                optionDetails.forEach(detail => {
                    detail.classList.remove('active');
                    detail.style.display = 'none';
                    detail.style.visibility = 'hidden';
                    detail.style.opacity = '0';
                });
                
                // 選択された詳細を表示
                updateOptionDisplay(selectedOption, optionData);
            });
        });
        
        // 初期表示設定
        const firstActiveTab = document.querySelector('.option-tab.active');
        if (firstActiveTab) {
            const initialOption = firstActiveTab.getAttribute('data-option');
            setTimeout(() => {
                updateOptionDisplay(initialOption, optionData);
            }, 100);
        }
    }
}

// オプション表示更新関数（改良版）
function updateOptionDisplay(selectedOption, optionData) {
    console.log('オプション表示更新:', selectedOption);
    
    // 対応する詳細エリアを取得
    const targetDetail = document.getElementById(selectedOption);
    
    if (targetDetail && optionData[selectedOption]) {
        const data = optionData[selectedOption];
        
        // 内容を確実に設定
        if (data.originalContent) {
            targetDetail.innerHTML = data.originalContent;
        } else if (data.content) {
            targetDetail.innerHTML = data.content;
        }
        
        // 強制的に表示
        targetDetail.style.display = 'block';
        targetDetail.style.visibility = 'visible';
        targetDetail.style.opacity = '1';
        targetDetail.classList.add('active');
        
        // 追加の確実な表示処理
        setTimeout(() => {
            targetDetail.style.display = 'block';
            targetDetail.style.visibility = 'visible';
            targetDetail.style.opacity = '1';
            
            // 子要素も確実に表示
            const children = targetDetail.querySelectorAll('*');
            children.forEach(child => {
                child.style.visibility = 'visible';
                child.style.opacity = '1';
            });
        }, 10);
        
        console.log('詳細表示完了:', selectedOption);
    } else {
        console.error('詳細またはデータが見つかりません:', selectedOption);
    }
}

// サービスメニュータブの処理
function initializeMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');
    
    console.log('メニュータブ初期化:', menuTabs.length, '個のタブ見つかりました');
    
    if (menuTabs.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('data-tab');
                console.log('メニュータブクリック:', targetId);
                
                // 全てのタブのアクティブ状態をリセット
                menuTabs.forEach(t => t.classList.remove('active'));
                menuContents.forEach(c => c.classList.remove('active'));
                
                // クリックされたタブをアクティブに
                this.classList.add('active');
                
                // 対応するコンテンツを表示
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                    console.log('メニューコンテンツ表示:', targetId);
                }
            });
        });
    }
}

// スムーススクロールの処理
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length <= 1) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// お客様の声カルーセルの処理（アニメーション強化版）
function initializeTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    
    if (testimonials.length === 0) return;
    
    let currentIndex = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
        // 全ての証言をフェードアウト
        testimonials.forEach((t, i) => {
            t.classList.remove('active');
            t.style.transform = 'translateY(20px)';
            t.style.opacity = '0';
        });
        
        testimonialDots.forEach(d => d.classList.remove('active'));
        
        // 選択された証言をフェードイン
        if (testimonials[index] && testimonialDots[index]) {
            setTimeout(() => {
                testimonials[index].classList.add('active');
                testimonials[index].style.transform = 'translateY(0)';
                testimonials[index].style.opacity = '1';
                testimonialDots[index].classList.add('active');
            }, 300);
        }
    }
    
    // ドットクリック時の動作
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
            // 自動スライドをリセット
            clearInterval(testimonialInterval);
            startAutoSlide();
        });
    });
    
    // 自動スライド機能
    function autoSlideTestimonials() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }
    
    function startAutoSlide() {
        testimonialInterval = setInterval(autoSlideTestimonials, 5000);
    }
    
    // 初期表示
    showTestimonial(0);
    startAutoSlide();
}

// スクロール効果の初期化（強化版）
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // ナビゲーションスクロール効果
    let ticking = false;
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // スクロールトップボタンの表示/非表示
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // スクロールトップボタンの動作
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// コンセプト詳細の開閉処理（アニメーション強化版）
function initializeConceptToggle() {
    const readMoreBtn = document.getElementById('readMoreBtn');
    const readLessBtn = document.getElementById('readLessBtn');
    const conceptDetails = document.getElementById('conceptDetails');
    
    if (readMoreBtn && conceptDetails) {
        // 初期状態で詳細を非表示
        conceptDetails.classList.add('hidden');
        
        readMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('もっと詳しくボタンがクリックされました');
            
            // ボタンにローディングアニメーション
            readMoreBtn.style.transform = 'scale(0.95)';
            readMoreBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                // 詳細を表示
                conceptDetails.classList.remove('hidden');
                readMoreBtn.style.display = 'none';
                
                // スムーズなスクロール
                setTimeout(() => {
                    conceptDetails.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 300);
            }, 200);
        });
    }
    
    // 閉じるボタンの動作
    if (readLessBtn && conceptDetails) {
        readLessBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('閉じるボタンがクリックされました');
            
            // ボタンにローディングアニメーション
            readLessBtn.style.transform = 'scale(0.95)';
            readLessBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                // 詳細を非表示
                conceptDetails.classList.add('hidden');
                
                // もっと詳しくボタンを再表示
                setTimeout(() => {
                    if (readMoreBtn) {
                        readMoreBtn.style.display = 'flex';
                        readMoreBtn.style.transform = 'scale(1)';
                        readMoreBtn.style.opacity = '1';
                        readMoreBtn.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }
                }, 500);
            }, 200);
        });
    }
}

// スクロール連動アニメーション（強化版）
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 特別なアニメーション処理
                if (entry.target.classList.contains('service-option')) {
                    animateServiceFeatures(entry.target);
                }
                
                if (entry.target.classList.contains('app-card')) {
                    animateAppFeatures(entry.target);
                }
                
                if (entry.target.classList.contains('philosophy-point')) {
                    animatePhilosophyIcon(entry.target);
                }
            }
        });
    }, observerOptions);

    // アニメーション対象要素を監視
    document.querySelectorAll('.fade-in-up, .service-option, .app-card, .philosophy-point').forEach(el => {
        observer.observe(el);
    });
}

// サービス機能のアニメーション
function animateServiceFeatures(serviceOption) {
    const features = serviceOption.querySelectorAll('.service-features li');
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.transform = 'translateX(0)';
            feature.style.opacity = '1';
        }, (index + 1) * 150);
    });
}

// アプリ機能のアニメーション
function animateAppFeatures(appCard) {
    const features = appCard.querySelectorAll('.app-features li');
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.transform = 'translateX(0)';
            feature.style.opacity = '1';
        }, (index + 1) * 100);
    });
}

// 理念アイコンのアニメーション
function animatePhilosophyIcon(philosophyPoint) {
    const icon = philosophyPoint.querySelector('i');
    if (icon) {
        setTimeout(() => {
            icon.style.animation = 'iconPulse 2s ease-in-out infinite';
        }, 300);
    }
}

// パフォーマンス最適化: デバウンス関数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// パフォーマンス最適化: スロットル関数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// スクロールイベントのスロットル
const throttledScroll = throttle(() => {
    // パフォーマンス重視のスクロール処理があればここに追加
}, 16); // 60fps

window.addEventListener('scroll', throttledScroll);

// ページ読み込み完了時とリサイズ時の処理
window.addEventListener('load', function() {
    // 予約タブの再初期化（念のため）
    setTimeout(() => {
        initializeOptionTabs();
    }, 500);
    
    // 初期アニメーションの開始
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

window.addEventListener('resize', debounce(function() {
    // モバイルメニューが開いている場合は閉じる
    const hamburger = document.getElementById('navbar-toggle');
    const navMenu = document.getElementById('navbar-nav');
    const body = document.body;
    
    if (window.innerWidth > 992) {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('show');
            body.classList.remove('menu-open');
            body.style.overflow = '';
        }
    }
}, 250));

// ロゴ読み込みエラー時の処理
document.addEventListener('DOMContentLoaded', () => {
    const logos = document.querySelectorAll('img[src*="reforma-logo"]');
    logos.forEach(logo => {
        logo.addEventListener('error', function() {
            console.log('Logo failed to load, showing fallback');
            this.style.display = 'none';
            const fallback = this.nextElementSibling;
            if (fallback && fallback.classList.contains('logo-fallback')) {
                fallback.style.display = 'flex';
            }
        });
        
        logo.addEventListener('load', function() {
            console.log('Logo loaded successfully');
        });
    });
    
    // アプリロゴ読み込みエラー時の処理
    const appLogos = document.querySelectorAll('.app-logo');
    appLogos.forEach(logo => {
        logo.addEventListener('error', function() {
            console.log('App logo failed to load');
        });
        
        logo.addEventListener('load', function() {
            console.log('App logo loaded successfully');
        });
    });
});

// タッチデバイス対応
if ('ontouchstart' in window) {
    // タッチデバイス専用の処理
    document.querySelectorAll('.btn, .menu-tab, .option-tab').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        });
    });
}

// フォーカストラップ（アクセシビリティ向上）
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('JavaScript エラー:', e.error);
    
    // 重要な機能が動作しない場合のフォールバック
    if (e.error && e.error.message) {
        if (e.error.message.includes('querySelector') || e.error.message.includes('getElementById')) {
            console.warn('DOM要素が見つからない可能性があります。ページの再読み込みを試してください。');
        }
    }
});

// 未処理のPromise拒否をキャッチ
window.addEventListener('unhandledrejection', function(event) {
    console.error('未処理のPromise拒否:', event.reason);
    event.preventDefault();
});

// パフォーマンス監視
if ('performance' in window && 'mark' in performance) {
    performance.mark('script-start');
    
    window.addEventListener('load', () => {
        performance.mark('script-end');
        performance.measure('script-duration', 'script-start', 'script-end');
        
        const measures = performance.getEntriesByType('measure');
        measures.forEach(measure => {
            console.log(`${measure.name}: ${measure.duration}ms`);
        });
    });
}

// Service Worker登録（PWA対応の準備）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service Workerの登録はここで行う（将来的な拡張用）
        console.log('Service Worker対応ブラウザです');
    });
}

// デバッグ用
console.log('Re\'forma JavaScript 読み込み完了（アニメーション復活・スマホナビ問題修正済み）');

// 開発モード検出
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
if (isDevelopment) {
    console.log('開発モードで実行中');
    
    // 開発者向けのデバッグ情報
    window.reformaDebug = {
        version: '2.0.0',
        features: [
            'アニメーション復活',
            'スマホナビゲーション修正',
            'パフォーマンス最適化',
            'アクセシビリティ向上'
        ],
        testFunctions: {
            openMenu: () => document.getElementById('navbar-toggle').click(),
            showTestimonial: (index) => document.querySelectorAll('.testimonial-dot')[index]?.click(),
            toggleConcept: () => document.getElementById('readMoreBtn').click()
        }
    };
    
    console.log('Re\'forma Debug Tools:', window.reformaDebug);
}
