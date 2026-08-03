import { useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import etalaseVid from '../assets/video/diracik-segar.mp4'
import olahVid from '../assets/video/olah-kedelai.mp4'
import diracikVid from '../assets/video/diracik2.mp4'

const CLIPS = [
  { src: etalaseVid, label: 'Etalase Kami', tilt: '-rotate-2' },
  { src: olahVid, label: 'Olah Kedelai Pilihan', tilt: '-translate-y-2 scale-[1.05] sm:-translate-y-4' },
  { src: diracikVid, label: 'Diracik Segar', tilt: 'rotate-2' },
]

export default function VideoShowcase() {
  const videoRefs = useRef([])
  const [mutedStates, setMutedStates] = useState(CLIPS.map(() => true))

  const toggleMute = (index) => {
    const video = videoRefs.current[index]
    if (!video) return

    // Mute semua video lain dulu, biar cuma satu yang bersuara
    videoRefs.current.forEach((v, i) => {
      if (v && i !== index) v.muted = true
    })

    video.muted = !video.muted

    setMutedStates((prev) =>
      prev.map((m, i) => (i === index ? video.muted : true))
    )
  }

  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-2.5 sm:gap-5">
      {CLIPS.map((clip, i) => (
        <Reveal key={clip.label} delay={i * 120}>
          <figure
            className={`group overflow-hidden rounded-2xl bg-cream-100 p-1.5 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:rotate-0 sm:rounded-3xl sm:p-2.5 ${clip.tilt}`}
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
              <video
                ref={(el) => (videoRefs.current[i] = el)}
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

              <button
                type="button"
                onClick={() => toggleMute(i)}
                aria-label={mutedStates[i] ? 'Aktifkan suara' : 'Matikan suara'}
                className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 sm:h-8 sm:w-8"
              >
                {mutedStates[i] ? (
                  // Ikon speaker mati (muted)
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 sm:h-4.5 sm:w-4.5">
                    <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  // Ikon speaker nyala (unmuted)
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 sm:h-4.5 sm:w-4.5">
                    <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
              </button>
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