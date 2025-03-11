document.addEventListener('DOMContentLoaded', function() {
    // ランキングアイテムと画像を取得
    const rankingItems = document.querySelectorAll('.ranking-item');
    const wagashiImages = document.querySelectorAll('.wagashi-image');
    
    // スクロールアニメーション
    function checkVisibility() {
        rankingItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // 要素が画面内に入ったかチェック
            if (rect.top < windowHeight - 100) {
                // ランキングアイテムのフェードイン
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    item.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
                }, index * 250);
                
                // 和菓子画像のアニメーション
                const image = item.querySelector('.wagashi-image');
                if (image) {
                    setTimeout(() => {
                        image.classList.add('animate');
                    }, index * 250 + 400);
                }
            }
        });
    }
    
    // 初期表示時とスクロール時にアニメーションをチェック
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    
    // 桜の花びらを追加
    function addSakuraPetals() {
        const sakuraContainer = document.querySelector('.sakura-petals');
        
        // 桜の花びらSVG定義
        const sakuraSvg = `
            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <path id="sakura-petal" d="M20,0 C15,10 0,15 10,20 C0,25 15,30 20,40 C25,30 40,25 30,20 C40,15 25,10 20,0" fill="#ffd7e5" opacity="0.6" />
            </svg>
        `;
        
        // SVG定義を追加
        sakuraContainer.innerHTML = sakuraSvg;
        
        // 花びらの数
        const petalCount = 10;
        
        // 花びらを生成
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const size = 10 + Math.random() * 20; // 10px〜30pxのランダムなサイズ
            
            petal.setAttribute("width", size);
            petal.setAttribute("height", size);
            petal.setAttribute("viewBox", "0 0 40 40");
            petal.style.position = "absolute";
            petal.style.top = "-50px";
            petal.style.left = Math.random() * 100 + "%";
            petal.style.filter = "drop-shadow(0 2px 3px rgba(0,0,0,0.1))";
            petal.style.animationDuration = 7 + Math.random() * 10 + "s"; // 7〜17秒
            petal.style.animationDelay = Math.random() * 5 + "s";
            petal.style.animationTimingFunction = "ease-in-out";
            petal.style.animationIterationCount = "infinite";
            petal.style.animationName = "sakuraFall";
            petal.style.animationPlayState = "running";
            petal.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
            use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#sakura-petal");
            petal.appendChild(use);
            
            sakuraContainer.appendChild(petal);
        }
    }
    
    // 紙風の装飾要素を追加
    function addDecorativeElements() {
        const container = document.querySelector('.container');
        
        // 和風の装飾要素を追加
        const decorationPatterns = [
            // 円形の和柄
            `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="none" stroke="#723d1e" stroke-width="0.5" opacity="0.2" /></svg>`,
            // 菱形の和柄
            `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,0 L100,50 L50,100 L0,50 Z" fill="none" stroke="#723d1e" stroke-width="0.5" opacity="0.15" /></svg>`
        ];
        
        for (let i = 0; i < 4; i++) {
            const decoration = document.createElement('div');
            const patternIndex = i % decorationPatterns.length;
            
            decoration.className = 'paper-decoration';
            decoration.innerHTML = decorationPatterns[patternIndex];
            decoration.style.cssText = `
                position: absolute;
                width: ${40 + Math.random() * 40}px;
                height: ${40 + Math.random() * 40}px;
                z-index: -1;
                opacity: 0.5;
                transform: rotate(${Math.random() * 45}deg);
                top: ${20 + Math.random() * 60}%;
                ${i % 2 === 0 ? 'left' : 'right'}: ${5 + Math.random() * 10}%;
            `;
            document.body.appendChild(decoration);
        }
    }
    
    addSakuraPetals();
    addDecorativeElements();
    
    // ランキングアイテムにホバーエフェクト追加
    rankingItems.forEach(item => {
        // 和風のインク効果（ホバー時）
        item.addEventListener('mouseenter', function() {
            this.style.borderLeftWidth = '8px';
            this.style.transition = 'border-left-width 0.3s ease, transform 0.4s ease, box-shadow 0.4s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderLeftWidth = '4px';
        });
    });
    
    // 画像にさりげないアニメーションのディレイを適用
    wagashiImages.forEach((image, index) => {
        image.style.animationDelay = `${index * 0.3}s`;
    });
    
    // クリック時にさりげない波紋効果
    document.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background-color: rgba(114, 61, 30, 0.15);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            pointer-events: none;
            z-index: 9999;
            animation: ripple 0.7s ease-out;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 700);
    });
    
    // 波紋アニメーションのスタイルを追加
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            0% {
                width: 0;
                height: 0;
                opacity: 0.6;
            }
            100% {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});
