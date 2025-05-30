// DOM要素の取得
const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbar-toggle');
const navbarNav = document.getElementById('navbar-nav');
const scrollTopBtn = document.getElementById('scrollTop');

// ナビゲーションスクロール効果
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // スクロールトップボタンの表示/非表示
    if (scrollTopBtn && window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else if (scrollTopBtn) {
        scrollTopBtn.classList.remove('show');
    }
});

// ハンバーガーメニューの動作
if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarNav.classList.toggle('show');
    });
}

// ナビゲーションリンクのクリック時にメニューを閉じる
document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (navbarToggle && navbarNav) {
            navbarToggle.classList.remove('active');
            navbarNav.classList.remove('show');
        }
    });
});

// スクロールトップボタンの動作
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 🎯 モバイル判定関数
function isMobile() {
    return window.innerWidth <= 768;
}

// 🎯 モバイル専用：要素を強制表示する関数
function forceShowElementsOnMobile() {
    if (!isMobile()) return;
    
    const heroLogo = document.getElementById('hero-logo');
    const conceptContainer = document.getElementById('concept-container');
    const luxuryBtnContainer = document.getElementById('luxury-btn-container');
    
    console.log('📱 モバイル：要素を強制表示開始');
    
    // ロゴを強制表示
    if (heroLogo) {
        heroLogo.style.opacity = '1';
        heroLogo.style.visibility = 'visible';
        heroLogo.style.display = 'flex';
        heroLogo.classList.add('show');
        console.log('✅ ロゴ強制表示完了');
    }
    
    // コンセプトを強制表示
    if (conceptContainer) {
        conceptContainer.style.opacity = '1';
        conceptContainer.style.visibility = 'visible';
        conceptContainer.style.display = 'flex';
        conceptContainer.classList.add('show');
        console.log('✅ コンセプト強制表示完了');
    }
    
    // ボタンを強制表示
    if (luxuryBtnContainer) {
        luxuryBtnContainer.style.opacity = '1';
        luxuryBtnContainer.style.visibility = 'visible';
        luxuryBtnContainer.style.display = 'flex';
        luxuryBtnContainer.classList.add('show');
        console.log('✅ ボタン強制表示完了');
    }
    
    console.log('📱 モバイル：全要素表示完了');
}

// 🎯 ヒーローアニメーション：ロゴ表示 → 消失 → コンセプト表示 → ボタン表示（モバイル対応強化版）
function initializeHeroAnimations() {
    const heroLogo = document.getElementById('hero-logo');
    const conceptContainer = document.getElementById('concept-container');
    const luxuryBtnContainer = document.getElementById('luxury-btn-container');

    if (!heroLogo || !conceptContainer || !luxuryBtnContainer) {
        console.error('🚨 アニメーション要素が見つかりません');
        
        // フォールバック：要素が見つからない場合はすべて表示
        setTimeout(() => {
            if (heroLogo) heroLogo.style.opacity = '1';
            if (conceptContainer) conceptContainer.style.opacity = '1';
            if (luxuryBtnContainer) luxuryBtnContainer.style.opacity = '1';
        }, 1000);
        return;
    }

    console.log('🎯 ヒーローアニメーション開始（モバイル対応版）');
    console.log('📱 モバイル判定:', isMobile());

    // 初期状態を確実に設定
    heroLogo.style.opacity = '0';
    conceptContainer.style.opacity = '0';
    luxuryBtnContainer.style.opacity = '0';
    
    // クラスをリセット
    heroLogo.classList.remove('show', 'hide');
    conceptContainer.classList.remove('show');
    luxuryBtnContainer.classList.remove('show');

    // モバイル用タイミング調整
    const timing = isMobile() ? {
        logoShow: 800,     // モバイルではやや遅めに表示
        logoHide: 3500,    // ロゴ表示時間を少し延長
        conceptShow: 4500, // コンセプト表示をやや遅めに
        buttonShow: 6500   // ボタン表示も遅めに
    } : {
        logoShow: 500,
        logoHide: 3000,
        conceptShow: 4000,
        buttonShow: 6000
    };

    // Phase 1: ロゴをフェードイン表示
    setTimeout(() => {
        heroLogo.classList.add('show');
        heroLogo.style.opacity = '1';
        console.log('✅ Phase 1: ロゴ表示開始');
        
        // モバイルでの表示確認
        if (isMobile()) {
            console.log('📱 モバイル：ロゴ表示状態確認', {
                opacity: heroLogo.style.opacity,
                hasShowClass: heroLogo.classList.contains('show'),
                zIndex: window.getComputedStyle(heroLogo).zIndex
            });
        }
    }, timing.logoShow);

    // Phase 2: ロゴをフェードアウト
    setTimeout(() => {
        heroLogo.classList.add('hide');
        heroLogo.classList.remove('show');
        heroLogo.style.opacity = '0';
        console.log('✅ Phase 2: ロゴ消失開始');
    }, timing.logoHide);

    // Phase 3: コンセプトをフェードイン表示
    setTimeout(() => {
        conceptContainer.classList.add('show');
        conceptContainer.style.opacity = '1';
        conceptContainer.style.transform = 'translateY(0)';
        console.log('✅ Phase 3: コンセプト表示開始');
        
        // モバイルでの表示確認
        if (isMobile()) {
            console.log('📱 モバイル：コンセプト表示状態確認', {
                opacity: conceptContainer.style.opacity,
                hasShowClass: conceptContainer.classList.contains('show'),
                transform: conceptContainer.style.transform
            });
        }
    }, timing.conceptShow);

    // Phase 4: 豪華ボタンをフェードイン表示
    setTimeout(() => {
        luxuryBtnContainer.classList.add('show');
        luxuryBtnContainer.style.opacity = '1';
        luxuryBtnContainer.style.transform = 'translateY(0)';
        console.log('✅ Phase 4: 豪華ボタン表示開始');
        
        // モバイルでの表示確認
        if (isMobile()) {
            console.log('📱 モバイル：ボタン表示状態確認', {
                opacity: luxuryBtnContainer.style.opacity,
                hasShowClass: luxuryBtnContainer.classList.contains('show'),
                transform: luxuryBtnContainer.style.transform
            });
        }
    }, timing.buttonShow);

    // 全体完了確認
    setTimeout(() => {
        console.log('🎯 アニメーション完了確認');
        if (isMobile()) {
            console.log('📱 モバイル：最終状態確認', {
                logoVisible: heroLogo.style.opacity,
                conceptVisible: conceptContainer.style.opacity,
                buttonVisible: luxuryBtnContainer.style.opacity
            });
        }
    }, timing.buttonShow + 1000);

    console.log('🎯 アニメーションタイムライン設定完了（モバイル対応版）');
    console.log('📱 使用タイミング:', timing);
}

// サービスメニュータブの動作（こちらは正常動作）
function initializeMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');
    
    console.log('メニュータブを初期化中...', menuTabs.length, 'タブ見つかりました');
    console.log('メニューコンテンツを確認中...', menuContents.length, 'コンテンツ見つかりました');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('data-tab');
            console.log('メニュータブクリック:', targetId);
            
            // すべてのタブから active クラスを削除
            menuTabs.forEach(t => t.classList.remove('active'));
            // すべてのコンテンツから active クラスを削除
            menuContents.forEach(c => c.classList.remove('active'));
            
            // クリックされたタブに active クラスを追加
            tab.classList.add('active');
            
            // 対応するコンテンツに active クラスを追加
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log('コンテンツ表示成功:', targetId);
                
                // 強制的にコンテンツを表示（フォールバック）
                targetContent.style.display = 'block';
                
                // 他のコンテンツを非表示
                menuContents.forEach(c => {
                    if (c.id !== targetId) {
                        c.style.display = 'none';
                    }
                });
            } else {
                console.error('コンテンツが見つかりません:', targetId);
            }
        });
    });
    
    // 初期状態の設定
    const firstTab = document.querySelector('.menu-tab.active');
    const firstContent = document.querySelector('.menu-content.active');
    if (firstTab && firstContent) {
        firstContent.style.display = 'block';
        console.log('メニュー初期状態設定完了');
    }
}

// お客様の声スライダーの動作（ドット表示のみ）
let currentTestimonial = 0;
let testimonialInterval;

function initializeTestimonials() {
    const track = document.getElementById('testimonialsTrack');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!track || indicators.length === 0) {
        console.log('お客様の声要素が見つかりません');
        return;
    }
    
    console.log('お客様の声を初期化中...', indicators.length, '件見つかりました');
    
    const totalSlides = indicators.length;
    
    function updateCarousel() {
        const translateX = -(currentTestimonial * (100 / totalSlides));
        track.style.transform = `translateX(${translateX}%)`;
        
        // インジケーター更新
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentTestimonial);
        });
    }
    
    // ドットクリック時の動作
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentTestimonial = index;
            updateCarousel();
            // 自動スライドをリセット
            clearInterval(testimonialInterval);
            startAutoSlide();
        });
    });
    
    // 自動スライド機能
    function autoSlideTestimonials() {
        currentTestimonial = (currentTestimonial + 1) % totalSlides;
        updateCarousel();
    }
    
    function startAutoSlide() {
        testimonialInterval = setInterval(autoSlideTestimonials, 5000);
    }
    
    // 初期表示
    updateCarousel();
    startAutoSlide();
    
    console.log('お客様の声スライダー初期化完了（ドット表示のみ）');
}

// スムーズスクロール機能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length <= 1) return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // ナビゲーションの高さを考慮
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// スクロール連動アニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// アニメーション対象要素を監視
document.querySelectorAll('.fade-in-up, .service-option, .app-card, .philosophy-point').forEach(el => {
    observer.observe(el);
});

// ページ読み込み完了時の処理
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Re\'forma サイト初期化開始（モバイル対応強化版）');
    
    // デバイス情報をログ出力
    console.log('📱 デバイス情報:', {
        userAgent: navigator.userAgent,
        screenWidth: screen.width,
        screenHeight: screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        isMobile: isMobile()
    });
    
    // 🎯 モバイルの場合は要素を即座に表示
    if (isMobile()) {
        console.log('📱 モバイル検知：要素を即座に表示します');
        forceShowElementsOnMobile();
        
        // 念のため少し遅らせても実行
        setTimeout(() => {
            forceShowElementsOnMobile();
        }, 500);
        
        setTimeout(() => {
            forceShowElementsOnMobile();
        }, 1000);
    } else {
        // PCの場合は従来のアニメーション
        console.log('💻 PC検知：アニメーション実行');
        initializeHeroAnimations();
    }
    
    // 各機能を初期化
    initializeMenuTabs();
    initializeTestimonials();
    
    // ロゴ読み込みエラー時の処理
    const logos = document.querySelectorAll('img[src*="reforma-logo"]');
    logos.forEach(logo => {
        logo.addEventListener('error', function() {
            console.log('Logo failed to load, showing fallback');
            this.style.display = 'none';
            const fallback = this.nextElementSibling;
            if (fallback && fallback.classList.contains('logo-fallback')) {
                fallback.style.display = 'flex';
                console.log('📱 Fallback logo displayed');
            }
        });
    });
    
    // アプリロゴ読み込みエラー時の処理
    const appLogos = document.querySelectorAll('.app-logo');
    appLogos.forEach(logo => {
        logo.addEventListener('error', function() {
            console.log('App logo failed to load');
        });
    });
    
    console.log('✅ すべての初期化が完了しました（モバイル対応強化版）');
});

// 画面リサイズ時の処理（モバイル対応強化）
window.addEventListener('resize', () => {
    // モバイルメニューが開いている場合は閉じる
    if (window.innerWidth > 992) {
        if (navbarToggle && navbarNav) {
            navbarToggle.classList.remove('active');
            navbarNav.classList.remove('show');
        }
    }
    
    // リサイズ時にデバイス判定を再確認
    console.log('📱 リサイズ検知 - 新しい画面サイズ:', {
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: isMobile()
    });
});

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

// スクロールイベントのデバウンス
const debouncedScroll = debounce(() => {
    // パフォーマンス重視のスクロール処理があればここに追加
}, 10);

window.addEventListener('scroll', debouncedScroll);

// エラーハンドリング（モバイル対応強化）
window.addEventListener('error', (e) => {
    console.error('JavaScript エラー:', e.error);
    if (isMobile()) {
        console.error('📱 モバイルでのエラー詳細:', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno
        });
    }
});

// デバッグ用（モバイル対応版）
console.log('🎯 Re\'forma JavaScript 読み込み完了（モバイル対応強化版）');
console.log('📱 モバイル対応: ヒーローセクションアニメーション強化');
console.log('✨ アニメーション: ロゴ表示 → 消失 → コンセプト表示 → 豪華ボタン表示（モバイル最適化済み）');
console.log('🎯 3ファイル構成: HTML + CSS + JS 分離完了');
console.log('🎯 豪華ボタン: グラデーション + グロー効果 + パルスアニメーション（モバイル対応）');
console.log('🎯 お客様の声: ドット表示のみ（矢印ボタン削除済み）');
console.log('📱 モバイル判定機能: 768px以下で最適化されたタイミング適用');
