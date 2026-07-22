import Reveal from './Reveal.jsx'
import etalaseVid from '../assets/video/etalase.mp4'
import etalasePoster from '../assets/video/etalase-poster.jpg'
import olahVid from '../assets/video/olah-kedelai.mp4'
import olahPoster from '../assets/video/olah-kedelai-poster.jpg'
import diracikVid from '../assets/video/diracik.mp4'
import diracikPoster from '../assets/video/diracik-poster.jpg'

// Kemiringan berlaku di semua ukuran layar. Sudut rotasi sama persis di mobile
// & desktop (sudut tidak terpengaruh ukuran), tapi angkat kartu tengah dikecilkan
// di mobile karena translate satuannya px — 16px terlalu jauh untuk kartu kecil.
const CLIPS = [
  { src: etalaseVid, poster: etalasePoster, label: 'Etalase Kami', tilt: '-rotate-2' },
  { src: olahVid, poster: olahPoster, label: 'Olah Kedelai Pilihan', tilt: '-translate-y-2 scale-[1.05] sm:-translate-y-4' },
  { src: diracikVid, poster: diracikPoster, label: 'Diracik Segar', tilt: 'rotate-2' },
]

export default function VideoShowcase() {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-2.5 sm:gap-5">
      {CLIPS.map((clip, i) => (
        <Reveal key={clip.label} delay={i * 120}>
          <figure
            className={`group overflow-hidden rounded-2xl bg-cream-100 p-1.5 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:rotate-0 sm:rounded-3xl sm:p-2.5 ${clip.tilt}`}
          >
            <div className="overflow-hidden rounded-xl sm:rounded-2xl">
              <video
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                src={clip.src}
                poster={clip.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={`Video ${clip.label} GresSOY`}
              />
            </div>
            <figcaption className="py-1.5 text-center font-display text-[11px] font-bold leading-tight text-soya-800 sm:text-sm">
              {clip.label}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  )
}
