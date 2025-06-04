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

// 🎯 ヒーローアニメーション：ロゴ表示 → 消失 → コンセプト表示 → ボタン表示
function initializeHeroAnimations() {
    const heroLogo = document.getElementById('hero-logo');
    const conceptContainer = document.getElementById('concept-container');
    const luxuryBtnContainer = document.getElementById('luxury-btn-container');

    if (!heroLogo || !conceptContainer || !luxuryBtnContainer) {
        console.error('🚨 アニメーション要素が見つかりません');
        return;
    }

    console.log('🎯 ヒーローアニメーション開始');

    // Phase 1: ロゴをフェードイン表示（0.5秒後）
    setTimeout(() => {
        heroLogo.classList.add('show');
        console.log('✅ Phase 1: ロゴ表示開始');
    }, 500);

    // Phase 2: ロゴをゆっくりとフェードアウト（3秒後）
    setTimeout(() => {
        heroLogo.style.transition = 'opacity 1.8s ease-out, transform 1.8s ease-out';
        heroLogo.classList.add('hide');
        console.log('✅ Phase 2: ロゴゆっくり消失開始');
    }, 3000);

    // Phase 3: コンセプトをフェードイン表示（4秒後）
    setTimeout(() => {
        conceptContainer.classList.add('show');
        console.log('✅ Phase 3: コンセプト表示開始');
    }, 4000);

    // Phase 4: 豪華ボタンをフェードイン表示（6秒後）
    setTimeout(() => {
        luxuryBtnContainer.classList.add('show');
        console.log('✅ Phase 4: 豪華ボタン表示開始');
    }, 6000);

    console.log('🎯 アニメーションタイムライン設定完了');
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
            e.stopPropagation();
            
            const targetId = tab.getAttribute('data-tab');
            console.log('メニュータブクリック:', targetId);
            
            // すべてのタブから active クラスを削除
            menuTabs.forEach(t => t.classList.remove('active'));
            // すべてのコンテンツから active クラスを削除
            menuContents.forEach(c => {
                c.classList.remove('active');
                c.style.display = 'none';
            });
            
            // クリックされたタブに active クラスを追加
            tab.classList.add('active');
            
            // 対応するコンテンツに active クラスを追加
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block !important';
                console.log('コンテンツ表示成功:', targetId);
            } else {
                console.error('コンテンツが見つかりません:', targetId);
            }
        });
    });
    
    // 初期状態の強制設定
    const firstTab = document.querySelector('.menu-tab.active');
    const firstContent = document.querySelector('.menu-content.active');
    if (firstTab && firstContent) {
        firstContent.style.display = 'block !important';
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

// 🎯 FAQアコーディオン機能の初期化
function initializeFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) {
        console.log('FAQ要素が見つかりません');
        return;
    }
    
    console.log('FAQアコーディオンを初期化中...', faqQuestions.length, '個のFAQ見つかりました');
    
    faqQuestions.forEach((question, index) => {
        // 対応する回答要素を取得
        const answer = question.nextElementSibling;
        
        if (!answer || !answer.classList.contains('faq-answer')) {
            console.error('FAQ回答要素が見つかりません:', index);
            return;
        }
        
        // 初期状態：全て閉じる
        answer.classList.remove('active');
        question.classList.remove('active');
        
        // クリックイベント追加
        question.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('FAQ質問がクリックされました:', index);
            
            // 現在の状態を取得
            const isActive = answer.classList.contains('active');
            
            // 現在のFAQの状態を切り替え
            if (isActive) {
                // 閉じる
                answer.classList.remove('active');
                question.classList.remove('active');
                console.log('FAQ閉じました:', index);
            } else {
                // 開く
                answer.classList.add('active');
                question.classList.add('active');
                console.log('FAQ開きました:', index);
            }
        });
        
        // キーボードアクセシビリティ
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
        
        // タブインデックス設定
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        console.log('FAQ初期化完了:', index);
    });
    
    console.log('✅ FAQアコーディオン初期化完了');
}

// 🎯 温かみメッセージセクションの機能初期化
function initializeGentleMessageFeatures() {
    console.log('🎯 温かみメッセージセクション機能を初期化中...');
    
    // FAQアコーディオン初期化
    initializeFAQAccordion();
    
    // チェックリストアニメーション（オプション）
    const gentleListItems = document.querySelectorAll('.gentle-list li');
    if (gentleListItems.length > 0) {
        console.log('チェックリスト項目:', gentleListItems.length, '個見つかりました');
        
        // スクロール連動アニメーション
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.3
        });
        
        gentleListItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.5s ease';
            observer.observe(item);
        });
    }
    
    console.log('✅ 温かみメッセージセクション機能初期化完了');
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
    console.log('🎯 Re\'forma サイト初期化開始');
    
    // 🎯 ヒーローアニメーションを初期化（最重要）
    initializeHeroAnimations();
    
    // 各機能を初期化
    initializeMenuTabs();
    initializeTestimonials();
    
    // 🎯 温かみメッセージセクション機能初期化
    initializeGentleMessageFeatures();
    
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
    
    console.log('🎯 アニメーション予定スケジュール:');
    console.log('  0.5秒後: Re\'formaロゴがフェードイン表示');
    console.log('  3.0秒後: ロゴがフェードアウト消失');
    console.log('  4.0秒後: コンセプト全文がフェードイン表示');
    console.log('  6.0秒後: 豪華な予約ボタンがフェードイン表示');
    console.log('✅ すべての初期化が完了しました');
    console.log('🎯 FAQアコーディオン機能追加完了');
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
console.log('🎯 Re\'forma JavaScript 読み込み完了（FAQアコーディオン対応版）');
console.log('📱 モバイル対応: 文字切れ対策完了');
console.log('✨ アニメーション: ロゴ表示 → 消失 → コンセプト表示 → 豪華ボタン表示');
console.log('🎯 FAQアコーディオン: Q常時表示、Aクリックで開閉');
console.log('🎯 チェックマーク: ✓ 間隔調整完了');

// 🎯 Perfect Coming Soon - 完璧1回再生制御システム

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Perfect Coming Soon システム初期化開始');
    
    // すべてのComing Soon動画要素を取得
    const videoContainers = document.querySelectorAll('.coming-soon-video-bg');
    const videos = document.querySelectorAll('.coming-soon-video-bg video');
    
    if (videoContainers.length === 0 || videos.length === 0) {
        console.log('ℹ️ Coming Soon要素が見つかりません（正常：動画なしページ）');
        return;
    }
    
    console.log(`🎬 Coming Soon動画: ${videos.length}個見つかりました`);
    
    // 各動画の再生状態を管理
    const playbackState = new Map();
    
    // 🎯 動画の初期設定（最重要）
    videos.forEach((video, index) => {
        // 必須属性設定
        video.pause();
        video.currentTime = 0;
        video.loop = false; // 🎯 ループ無効（1回のみ）
        video.muted = true;
        video.playsInline = true;
        video.preload = 'metadata'; // パフォーマンス最適化
        
        // 再生状態を初期化
        playbackState.set(video, {
            hasPlayed: false,
            isVisible: false,
            container: videoContainers[index],
            playStartTime: null
        });
        
        // 🎯 動画再生開始時
        video.addEventListener('play', function() {
            const state = playbackState.get(video);
            state.playStartTime = Date.now();
            console.log(`🎬 動画${index + 1} 再生開始`);
        });
        
        // 🎯 動画終了時のイベント（最重要）
        video.addEventListener('ended', function() {
            console.log(`✅ 動画${index + 1} 再生完了`);
            const state = playbackState.get(video);
            const container = state.container;
            
            // 再生完了のマーク
            container.classList.add('played');
            
            // 2秒後に完全フェードアウト
            setTimeout(() => {
                container.classList.add('finished');
                console.log(`🎯 動画${index + 1} フェードアウト開始`);
                
                // さらに1秒後に完全除去
                setTimeout(() => {
                    container.style.display = 'none';
                    console.log(`👻 動画${index + 1} 完全非表示`);
                }, 1000);
            }, 2000);
        });
        
        // 🎯 エラーハンドリング
        video.addEventListener('error', function(e) {
            console.error(`❌ 動画${index + 1} エラー:`, e);
            const state = playbackState.get(video);
            const container = state.container;
            container.style.display = 'none'; // エラー時は非表示
        });
        
        // 🎯 読み込み完了時
        video.addEventListener('loadedmetadata', function() {
            console.log(`📝 動画${index + 1} メタデータ読み込み完了 (${video.duration.toFixed(1)}秒)`);
        });
        
        console.log(`⚙️ 動画${index + 1} 初期化完了`);
    });
    
    // 🎯 Intersection Observer でスクロール監視（高精度）
    const observerOptions = {
        threshold: [0.2, 0.5, 0.8], // 複数閾値で精密監視
        rootMargin: '0px 0px -30px 0px' // 少し早めに発火
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // アプリカード全体が対象
            if (!entry.target.classList.contains('app-card-coming-soon')) {
                return;
            }
            
            const videoContainer = entry.target.querySelector('.coming-soon-video-bg');
            const video = entry.target.querySelector('.coming-soon-video-bg video');
            
            if (!video || !videoContainer) return;
            
            const state = playbackState.get(video);
            if (!state) return;
            
            // 🎯 交差率に応じた処理
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !state.hasPlayed) {
                // 50%以上表示されて、まだ再生していない場合
                console.log(`👁️ アプリセクション50%到達 - Coming Soon準備開始`);
                
                // 表示開始
                videoContainer.classList.add('show');
                state.isVisible = true;
                
                // 🎯 少し遅延してから再生開始（滑らかな体験）
                setTimeout(() => {
                    if (state.isVisible && !state.hasPlayed) {
                        video.currentTime = 0;
                        video.play().then(() => {
                            console.log(`🎬 Coming Soon動画再生開始！`);
                            state.hasPlayed = true;
                        }).catch(error => {
                            console.error('❌ 動画再生エラー:', error);
                            // エラー時は非表示
                            videoContainer.style.display = 'none';
                        });
                    }
                }, 200); // 200ms遅延
                
            } else if (!entry.isIntersecting && state.isVisible && !state.hasPlayed) {
                // 🎯 再生前にセクションから離れた場合のクリーンアップ
                console.log(`📤 セクション離脱 - 再生キャンセル`);
                videoContainer.classList.remove('show');
                video.pause();
                video.currentTime = 0;
                state.isVisible = false;
            }
        });
    }, observerOptions);
    
    // 🎯 すべてのアプリカードを監視開始
    const appCards = document.querySelectorAll('.app-card-coming-soon');
    appCards.forEach((card, index) => {
        observer.observe(card);
        console.log(`🔍 アプリカード${index + 1} 監視開始`);
    });
    
    // 🎯 ページ可視性変更時の制御（タブ切り替え等）
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // ページが非表示になったら動画を停止
            videos.forEach((video, index) => {
                if (!video.paused) {
                    video.pause();
                    console.log(`⏸️ ページ非表示により動画${index + 1}停止`);
                }
            });
        }
    });
    
    // 🎯 モバイル向け touch start 最適化
    if ('ontouchstart' in window) {
        console.log('📱 モバイルデバイス検出 - タッチ最適化適用');
        
        videos.forEach(video => {
            // モバイルでの自動再生準備
            video.setAttribute('webkit-playsinline', 'true');
            video.setAttribute('playsinline', 'true');
        });
    }
    
    // 🎯 パフォーマンス監視
    let performanceWarned = false;
    const checkPerformance = () => {
        if (!performanceWarned && performance.memory) {
            const memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024;
            if (memoryUsage > 100) { // 100MB超
                console.warn(`⚠️ メモリ使用量注意: ${memoryUsage.toFixed(1)}MB`);
                performanceWarned = true;
            }
        }
    };
    
    // 🎯 ページ離脱時のクリーンアップ
    window.addEventListener('beforeunload', function() {
        videos.forEach((video, index) => {
            video.pause();
            video.currentTime = 0;
            video.src = ''; // メモリ解放
        });
        console.log('🧹 ページ離脱 - Coming Soon動画完全クリーンアップ');
    });
    
    // 🎯 デバッグ情報出力
    console.log('✅ Perfect Coming Soon システム初期化完了');
    console.log('📊 動作仕様:');
    console.log('  🎯 スクロールでアプリセクション50%到達時に再生開始');
    console.log('  🔄 1回のみ再生（ループなし）');
    console.log('  🎨 完璧クロマキー処理で緑色除去');
    console.log('  📱 モバイル縦長画面完全対応');
    console.log('  💬 Coming Soonテキスト最前面表示');
    console.log('  🎭 再生終了後は2秒でフェードアウト');
    
    // パフォーマンス監視開始
    setInterval(checkPerformance, 5000);
});
