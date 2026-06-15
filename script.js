
const photoList = [
    "https://files.catbox.moe/sv1l9d.jpg",
    "https://files.catbox.moe/gkab30.jpg",
    "https://files.catbox.moe/ggguaw.jpg",
    "https://files.catbox.moe/zdz266.jpg",
    "https://files.catbox.moe/b61u9u.jpg",
    "https://files.catbox.moe/bi1ko4.jpg",
    "https://files.catbox.moe/voe4kx.jpg",
    "https://files.catbox.moe/74n6qb.jpg",
    "https://files.catbox.moe/mg9k0b.jpg",
    "https://files.catbox.moe/0mckym.jpg",
    "https://files.catbox.moe/6h8fv1.jpg",
    "https://files.catbox.moe/9m6owv.jpg"
];

const loveTypingText = `Halooow!
Selamat buat hari yang tambah tua inii...
kalau ucapin... udah banyak, terus pesan? pesan aja deh ☺
Mau bilang dan ga bosen buat bilang makasih banyak banyak banget buat cerita yang udah dilalui selama ini, entah kenapa yaa? kadang tuh kalau lagi sedih gitu inget banyak banyak sama reva sedihnya ilang gituu?. GATAU irul dah gila banget. jadi reva ga boleh pergi, kalo pergi.... YAA GABOLEH! POKOKNYA

​Terus jugaa... maaf yah buat semua cerita buruk tentang irul, juga dan tentunya pengalaman atau kesan yang mungkin ada banyak dari temen reva kah, atau apapun itu, also atas perlakuan irul ke reva yang buruk sampe buat ilfeel gitu, yang terakhir nih, maaff banget hadiahnya telat ☺ hehe, semoga yang ini bisa buat reva seneng yaa...

​yang lain? banyak harapan irul ke reva yang mungkin gabisa disampaikan atau yang bisa mungkin kaya... irul berharap banget buat semoga2 banget this story will never be end, semoga yaa, hehe

​udah yaah, Selamat yang banyak dari orang yang sayang banget sama reva.`;

let audio = null, isPlaying = false, step = 0;
let swiperObj = null;

const loveMain = document.getElementById('loveMain');
const loveIcon = document.getElementById('loveIcon');
const contentArea = document.getElementById('contentArea');
const musicWidget = document.getElementById('musicWidget');

window.onload = () => {
    setTimeout(() => {
        document.body.classList.remove('not-loaded');
    }, 100);
};

function shakeContainer() {
    loveMain.classList.add('shake-effect');
    setTimeout(() => loveMain.classList.remove('shake-effect'), 380);
}
function shakeLoveIcon() {
    loveIcon.classList.add('love-shake');
    setTimeout(() => loveIcon.classList.remove('love-shake'), 450);
}

function initAudio() {
    if (!audio) {
        audio = new Audio("https://files.catbox.moe/p48g5p.mp3");
        audio.loop = true;
        audio.volume = 0.5;
    }
}
function startMusic() {
    initAudio();
    audio.play().catch(() => {});
}
function toggleMusic() {
    if (!audio) initAudio();
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        document.getElementById('musicIcon').className = 'fas fa-pause';
        document.getElementById('musicLabel').innerText = 'Musik';
    } else {
        audio.play().then(() => {
            isPlaying = true;
            document.getElementById('musicIcon').className = 'fas fa-music';
            document.getElementById('musicLabel').innerText = 'Musik';
        }).catch(() => {});
    }
}

function typeText(el, text, speed = 25, onFinish) {
    let i = 0;
    el.innerHTML = '';
    function type() {
        if (i < text.length) {
            let ch = text.charAt(i);
            if (ch === '\n') ch = '<br>';
            el.innerHTML += ch;
            i++;
            setTimeout(type, speed);
        } else {
            if (onFinish) onFinish();
        }
    }
    type();
}

function showTyping() {
    contentArea.innerHTML = '';
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-box';
    typingDiv.innerHTML = `<div class="typing-text" id="typingText"></div>`;
    contentArea.appendChild(typingDiv);

    const btnWrap = document.createElement('div');
    btnWrap.className = 'btn-wrapper';
    btnWrap.innerHTML = `<button id="actionButton" class="btn-premium"><i class="fas fa-heart"></i> Klik ini sayang 💖 <i class="fas fa-heart"></i></button>`;
    contentArea.appendChild(btnWrap);

    const textEl = document.getElementById('typingText');
    const btn = document.getElementById('actionButton');
    btn.classList.remove('show');

    const style = document.createElement('style');
    style.textContent = `.typing-text::-webkit-scrollbar { width: 5px; } .typing-text::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); border-radius: 10px; } .typing-text::-webkit-scrollbar-thumb { background: #ff99cc; border-radius: 10px; }`;
    document.head.appendChild(style);

    typeText(textEl, loveTypingText, 25, () => {
        btn.classList.add('show');
    });

    btn.addEventListener('click', () => {
        contentArea.innerHTML = '';

        const slideContainer = document.createElement('div');
        slideContainer.className = 'swiper-container';
        slideContainer.innerHTML = `
            <div class="swiper mySwiper" id="photoSwiper">
                <div class="swiper-wrapper" id="swiperWrapper"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
            </div>
        `;
        contentArea.appendChild(slideContainer);

        const msgDiv = document.createElement('div');
        msgDiv.className = 'birthday-message';
        msgDiv.innerHTML = `
            🎂 Selamat Ulang Tahun, Reva! 🎂<br>
            Semoga hari-harimu selalu indah dan penuh cinta 💖<br>
            <div class="date">📅 11 Juni 2009 • Hari istimewamu</div>
        `;
        contentArea.appendChild(msgDiv);

        const wrapper = document.getElementById('swiperWrapper');
        if (wrapper) {
            photoList.forEach(src => {
                const slideDiv = document.createElement('div');
                slideDiv.className = 'swiper-slide';
                const img = document.createElement('img');
                img.src = src;
                img.alt = "kenangan";
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.onerror = () => { img.src = 'https://picsum.photos/id/100/400/400'; };
                slideDiv.appendChild(img);
                wrapper.appendChild(slideDiv);
            });
        }

        setTimeout(() => {
            if (window.Swiper && !swiperObj) {
                swiperObj = new Swiper('.mySwiper', {
                    loop: true,
                    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                    pagination: { el: '.swiper-pagination', clickable: true },
                    autoplay: { delay: 2500, disableOnInteraction: false },
                    speed: 700
                });
            }
        }, 200);

        canvasConfetti({ particleCount: 500, spread: 160, origin: { y: 0.6 } });
        setTimeout(() => canvasConfetti({ particleCount: 800, spread: 200, origin: { y: 0.5, x: 0.3 }, startVelocity: 30 }), 120);
        setTimeout(() => canvasConfetti({ particleCount: 1000, spread: 240, origin: { y: 0.7, x: 0.7 }, shapes: ['heart'] }), 350);

        btn.disabled = true;
        btn.style.opacity = '0.65';
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Tersenyumlah, Sayang ✨';
    });
}

function startLove() {
    if (step !== 0) return;
    step = 1;
    shakeContainer();
    shakeLoveIcon();
    startMusic();
    musicWidget.style.display = 'flex';
    loveMain.style.transition = 'opacity 0.8s ease';
    loveMain.style.opacity = '0';
    setTimeout(() => {
        loveMain.style.display = 'none';
    }, 850);
    setTimeout(() => {
        showTyping();
    }, 900);
}

if (loveMain) loveMain.addEventListener('click', startLove);

window.addEventListener('resize', () => {
    if (swiperObj) swiperObj.update();
});

window.toggleMusic = toggleMusic;
