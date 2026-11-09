// "Eres especial para mí" en 30 idiomas, mostrados en 3 tandas de 10 que se alternan.
// Edita textos aquí. Las posiciones (en % de la pantalla) están en SLOTS:
// m = vertical/celular · d = horizontal/escritorio · s = tamaño relativo.
const F = {
  script: "'Great Vibes', cursive",
  dancing: "'Dancing Script', cursive",
  cormorant: "'Cormorant Garamond', serif",
  playfair: "'Playfair Display', serif",
  marck: "'Marck Script', cursive",
  jp: "'Noto Serif JP', serif",
  kr: "'Gowun Batang', serif",
  sc: "'Noto Serif SC', serif",
  greek: "'Noto Serif', serif",
  arabic: "'Amiri', serif",
  deva: "'Noto Serif Devanagari', serif",
  thai: "'Noto Serif Thai', serif",
}
const L = (lang, text, font, k, extra = {}) => ({ lang, text, font, k, ...extra })

const SLOTS = [
  { m: { x: 50, y: 4.5 }, d: { x: 50, y: 8 }, s: 1.15, color: '#FFFFFF', opacity: 1 },
  { m: { x: 30, y: 9.5 }, d: { x: 23, y: 21 }, s: 1, color: '#E9D5FF', opacity: 0.9 },
  { m: { x: 70, y: 14 }, d: { x: 77, y: 21 }, s: 1, color: '#B57AE8', opacity: 0.9 },
  { m: { x: 31, y: 18.5 }, d: { x: 14, y: 41 }, s: 1, color: '#FFFFFF', opacity: 0.78 },
  { m: { x: 69, y: 23 }, d: { x: 86, y: 41 }, s: 1, color: '#E9D5FF', opacity: 0.85 },
  { m: { x: 31, y: 84.5 }, d: { x: 17, y: 63 }, s: 1, color: '#FFFFFF', opacity: 0.75 },
  { m: { x: 69, y: 87.5 }, d: { x: 83, y: 63 }, s: 1, color: '#E9D5FF', opacity: 0.85 },
  { m: { x: 31, y: 90.5 }, d: { x: 20, y: 82 }, s: 1, color: '#B57AE8', opacity: 0.95 },
  { m: { x: 69, y: 93.5 }, d: { x: 80, y: 82 }, s: 1, color: '#FFFFFF', opacity: 0.8 },
  { m: { x: 50, y: 96.5 }, d: { x: 50, y: 95 }, s: 1, color: '#E9D5FF', opacity: 0.9 },
]

const ROUNDS = [
  [
    L('es', 'Eres especial para mí', F.script, 1.9),
    L('en', 'You are special to me', F.cormorant, 1.3, { italic: true }),
    L('fr', 'Tu es spéciale pour moi', F.playfair, 1.0, { italic: true }),
    L('it', 'Sei speciale per me', F.dancing, 1.4),
    L('pt', 'Você é especial para mim', F.cormorant, 1.25),
    L('de', 'Du bist etwas Besonderes für mich', F.playfair, 0.95),
    L('ja', 'あなたは私にとって特別な人', F.jp, 0.95),
    L('ko', '너는 나에게 특별한 사람이야', F.kr, 1.0),
    L('zh', '你对我来说很特别', F.sc, 1.1),
    L('ru', 'Ты особенный человек для меня', F.marck, 1.25),
  ],
  [
    L('nl', 'Je bent speciaal voor mij', F.script, 1.9),
    L('ar', 'أنت شخص مميز بالنسبة لي', F.arabic, 1.45, { dir: 'rtl' }),
    L('sv', 'Du är speciell för mig', F.playfair, 1.0, { italic: true }),
    L('pl', 'Jesteś dla mnie kimś wyjątkowym', F.cormorant, 1.25, { italic: true }),
    L('tr', 'Benim için çok özelsin', F.dancing, 1.4),
    L('el', 'Είσαι ξεχωριστό πρόσωπο για μένα', F.greek, 0.9),
    L('hi', 'तुम मेरे लिए बहुत खास हो', F.deva, 1.0),
    L('th', 'คุณพิเศษสำหรับฉัน', F.thai, 1.0),
    L('vi', 'Bạn thật đặc biệt đối với tôi', F.cormorant, 1.25),
    L('id', 'Kamu istimewa bagiku', F.dancing, 1.4),
  ],
  [
    L('ca', 'Ets una persona especial per a mi', F.script, 1.8),
    L('ro', 'Ești o persoană specială pentru mine', F.cormorant, 1.25, { italic: true }),
    L('fi', 'Olet minulle erityinen', F.playfair, 1.0, { italic: true }),
    L('no', 'Du er spesiell for meg', F.dancing, 1.4),
    L('da', 'Du er speciel for mig', F.cormorant, 1.3),
    L('cs', 'Jsi pro mě někdo výjimečný', F.playfair, 0.95),
    L('hu', 'Különleges vagy számomra', F.cormorant, 1.3, { italic: true }),
    L('uk', 'Ти особлива людина для мене', F.marck, 1.25),
    L('sw', 'Wewe ni maalum kwangu', F.dancing, 1.4),
    L('fa', 'تو برای من خاص هستی', F.arabic, 1.45, { dir: 'rtl' }),
  ],
]

export const GROUPS = ROUNDS.map((round) => round.map((lang, i) => ({ ...lang, ...SLOTS[i] })))
