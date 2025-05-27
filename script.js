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
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
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

// 🚫 予約オプションタブ機能を無効化（CSSのみで動作するため不要）
/*
function initializeOptionTabs() {
    // この関数は無効化されました
    // 予約セクションはCSSのみのタブ機能で動作します
    console.log('予約タブ機能はCSSで制御されています');
}
*/

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
    console.log('ページ読み込み完了 - 初期化開始');
    
    // 各機能を初期化
    initializeMenuTabs();
    // initializeOptionTabs(); // ← この行をコメントアウト（CSSで制御するため不要）
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
    
    console.log('すべての初期化が完了しました');
    console.log('予約タブはCSSのみで動作します（JavaScript不使用）');
    console.log('お客様の声：ドット表示のみ（矢印削除済み）');
});

// 画面リサイズ時の処理
window.addEventListener('resize', () => {
    // モバイルメニューが開いている場合は閉じる
    if (window.innerWidth > 992) {
        if (navbarToggle && navbarNav) {
            navbarToggle.classList.remove('active');
            navbarNav.classList.remove('show');
        }
    }
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

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('JavaScript エラー:', e.error);
});

// デバッグ用
console.log('Re\'forma JavaScript 読み込み完了');
console.log('🎯 予約タブ機能: CSSのみで制御（JavaScript無効化済み）');
console.log('🎯 お客様の声: ドット表示のみ（矢印ボタン削除済み）');
console.log('🎯 ホームコンセプト: 常時表示（ボタン削除済み）');
