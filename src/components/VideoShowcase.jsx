import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import etalaseHd from '../assets/video/diracik2-web.mp4'
import etalaseSm from '../assets/video/diracik2-mobile.mp4'
import etalasePoster from '../assets/video/diracik2-poster.jpg'
import olahHd from '../assets/video/olah-kedelai-web.mp4'
import olahSm from '../assets/video/olah-kedelai-mobile.mp4'
import olahPoster from '../assets/video/olah-kedelai-poster.jpg'
import diracikHd from '../assets/video/diracik-segar-web.mp4'
import diracikSm from '../assets/video/diracik-segar-mobile.mp4'
import diracikPoster from '../assets/video/diracik-segar-poster.jpg'

const CLIPS = [
  { hd: etalaseHd, sm: etalaseSm, poster: etalasePoster, label: 'Etalase Kami', tilt: '-rotate-2' },
  { hd: olahHd, sm: olahSm, poster: olahPoster, label: 'Olah Kedelai Pilihan', tilt: '-translate-y-2 scale-[1.05] sm:-translate-y-4' },
  { hd: diracikHd, sm: diracikSm, poster: diracikPoster, label: 'Diracik Segar', tilt: 'rotate-2' },
]

// Di bawah breakpoint sm tiap kartu cuma ~110px, jadi versi 540p sudah lebih
// dari cukup dan HP tidak perlu mengunduh ~43 MB. Desktop tetap 1080x1440.
function pickQuality() {
  if (typeof window === 'undefined') return 'hd'
  return window.innerWidth >= 640 ? 'hd' : 'sm'
}

// Selisih maksimal antar video sebelum dipaksa sejajar lagi (detik).
const SYNC_TOLERANCE = 0.4
// Kalau ada video yang lama siapnya, jangan tahan yang lain selamanya.
const START_TIMEOUT = 4000

// Jangan tarik ~10 MB video kalau pengunjung minta hemat kuota atau
// mematikan animasi; tampilkan poster + tombol putar saja.
function shouldAutoStart() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false
  if (navigator.connection?.saveData) return false
  return true
}

export default function VideoShowcase() {
  const containerRef = useRef(null)
  const videoRefs = useRef([])
  const manualStartRef = useRef(null)
  const [autoStart] = useState(shouldAutoStart)
  const [quality] = useState(pickQuality)
  const [needsTap, setNeedsTap] = useState(!autoStart)
  const [mutedStates, setMutedStates] = useState(CLIPS.map(() => true))

  // Ketiga video baru diputar setelah semuanya siap, biar mulainya barengan.
  // Setelah jalan, video pertama dipakai sebagai acuan supaya tidak melenceng
  // saat looping (durasinya tidak persis sama).
  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean)
    if (videos.length !== CLIPS.length) return

    const master = videos[0]
    let started = false
    let visible = true

    const playAll = () => {
      videos.forEach((v) => {
        const p = v.play()
        if (!p) return
        // Safari iOS (Low Power Mode) bisa menolak autoplay walau muted.
        p.then(() => setNeedsTap(false)).catch(() => setNeedsTap(true))
      })
    }

    const rewindAll = () => {
      videos.forEach((v) => {
        v.currentTime = 0
      })
    }

    const startAll = () => {
      if (started) return
      // HAVE_FUTURE_DATA: sudah cukup buffer untuk mulai jalan
      if (!videos.every((v) => v.readyState >= 3)) return
      started = true
      rewindAll()
      if (visible) playAll()
    }

    const resync = () => {
      if (!started) return
      for (let i = 1; i < videos.length; i += 1) {
        const v = videos[i]
        if (v.seeking) continue
        if (Math.abs(v.currentTime - master.currentTime) > SYNC_TOLERANCE) {
          v.currentTime = master.currentTime
        }
      }
    }

    // Dipakai tombol putar: sentuhan pengguna selalu lolos kebijakan autoplay.
    manualStartRef.current = () => {
      started = true
      visible = true
      rewindAll()
      playAll()
    }

    master.addEventListener('timeupdate', resync)

    // Hemat CPU: berhenti decoding saat showcase tidak kelihatan.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (!started) return
        if (visible) {
          resync()
          playAll()
        } else {
          videos.forEach((v) => v.pause())
        }
      },
      { threshold: 0.1 },
    )
    if (containerRef.current) observer.observe(containerRef.current)

    if (!autoStart) {
      return () => {
        observer.disconnect()
        master.removeEventListener('timeupdate', resync)
        manualStartRef.current = null
      }
    }

    // Jaring pengaman: kalau ada satu video yang lambat, tetap mulai.
    const timer = window.setTimeout(() => {
      if (started) return
      started = true
      rewindAll()
      if (visible) playAll()
    }, START_TIMEOUT)

    videos.forEach((v) => v.addEventListener('canplay', startAll))
    startAll()

    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
      videos.forEach((v) => v.removeEventListener('canplay', startAll))
      master.removeEventListener('timeupdate', resync)
      manualStartRef.current = null
    }
  }, [autoStart])

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
    // id dipakai layar sambutan (WelcomeGate) sebagai tujuan scroll.
    <div id="showcase" ref={containerRef} className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-2.5 sm:gap-5">
      {CLIPS.map((clip, i) => (
        <Reveal key={clip.label} delay={i * 120}>
          <figure
            className={`group overflow-hidden rounded-2xl bg-cream-100 p-1.5 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:rotate-0 sm:rounded-3xl sm:p-2.5 ${clip.tilt}`}
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                src={clip[quality]}
                poster={clip.poster}
                muted
                loop
                playsInline
                preload={autoStart ? 'auto' : 'metadata'}
                disablePictureInPicture
                aria-label={`Video ${clip.label} GresSOY`}
              />

              {needsTap && (
                <button
                  type="button"
                  onClick={() => manualStartRef.current?.()}
                  aria-label="Putar video"
                  className="absolute inset-0 flex items-center justify-center bg-black/25 transition hover:bg-black/35"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-soya-800 shadow-card sm:h-12 sm:w-12">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6">
                      <path d="M8 5v14l11-7L8 5Z" />
                    </svg>
                  </span>
                </button>
              )}

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
