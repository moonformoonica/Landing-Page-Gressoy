import { useEffect, useRef, useState } from 'react'
import backsoundSrc from '../assets/audio/backsound.mp3'

// Volume backsound sengaja pelan supaya tidak mengagetkan dan tetap kalah
// dari suara video kalau pengunjung membukanya.
const VOLUME = 0.32

// Interaksi pertama dipakai untuk melewati blokir autoplay bersuara. Sengaja
// banyak: yang dihitung "user activation" beda-beda tiap browser (mouse lewat
// pointerdown, tapi di iOS baru lewat touchend/click).
const UNLOCK_EVENTS = ['pointerdown', 'pointerup', 'click', 'keydown', 'touchstart', 'touchend']

// Event media tidak bubble, tapi tetap lewat fase capture. Jadi satu listener
// di document sudah menangkap perubahan dari semua <video> di halaman.
const MEDIA_EVENTS = ['play', 'pause', 'volumechange', 'ended']

// Jaring pengaman kalau ada event yang kelewat.
const POLL_MS = 500

export default function BackgroundMusic() {
  const audioRef = useRef(null)
  // Niat pengunjung. Kalau backsound dimatikan manual lewat tombol, dia tidak
  // boleh nyala sendiri lagi waktu suara video dimatikan.
  const enabledRef = useRef(true)
  const syncRef = useRef(null)
  const unlockRef = useRef(null)
  // Autoplay bersuara sudah pernah ditolak browser. Selama true, audio tetap
  // diputar tapi dibisukan, dan kita tidak boleh coba unmute sendiri karena
  // Chrome langsung mem-pause media yang di-unmute tanpa interaksi.
  const blockedRef = useRef(false)
  // Sumber kebenaran buat tampilan tombol: apa musiknya benar-benar bunyi,
  // bukan sekadar niat. Autoplay bisa saja ditolak browser.
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = VOLUME

    // Dibaca langsung dari DOM, bukan dari state komponen lain: video mana pun
    // yang benar-benar kedengaran (tidak mute, sedang jalan, volumenya bukan
    // nol) otomatis membungkam backsound.
    const anyVideoAudible = () =>
      Array.from(document.querySelectorAll('video')).some(
        (v) => !v.muted && !v.paused && v.volume > 0,
      )

    const wantSound = () =>
      enabledRef.current && !document.hidden && !anyVideoAudible()

    // Coba putar dengan suara. Kalau ditolak kebijakan autoplay, audio tetap
    // diputar tanpa suara supaya elemennya sudah jalan duluan; begitu ada
    // interaksi pertama tinggal di-unmute, jadi terdengar seketika tanpa jeda
    // buffering.
    function playAudible() {
      audio.muted = false
      audio.volume = VOLUME
      const p = audio.play()
      if (!p) return
      p.then(() => {
        blockedRef.current = false
        unbindUnlock()
        // Keadaan bisa berubah selagi play() masih menggantung, misalnya
        // pengunjung menyalakan suara video di klik yang sama.
        if (!wantSound()) audio.pause()
      }).catch(() => {
        blockedRef.current = true
        audio.muted = true
        audio.play().catch(() => {})
        bindUnlock()
      })
    }

    // Satu pintu untuk semua kondisi: niat pengunjung, suara video, dan tab
    // yang lagi dibuka atau tidak.
    function sync() {
      if (!wantSound()) {
        audio.pause()
        return
      }
      if (blockedRef.current) {
        // Masih mode bisu: cukup jaga pemutarannya tetap hidup, jangan sentuh
        // muted-nya di luar interaksi pengunjung.
        if (audio.paused) audio.play().catch(() => {})
        return
      }
      playAudible()
    }

    // Interaksi pengunjung = izin bersuara, jadi blokir autoplay dilepas.
    function onUnlock() {
      if (!enabledRef.current) return
      blockedRef.current = false
      if (wantSound()) playAudible()
      else audio.pause()
    }

    // addEventListener dedup kalau fungsi + tipe-nya sama, jadi aman dipanggil
    // berkali-kali tiap autoplay ditolak. Capture supaya tetap kena walau ada
    // komponen lain yang menghentikan propagasi event.
    function bindUnlock() {
      UNLOCK_EVENTS.forEach((e) =>
        document.addEventListener(e, onUnlock, { capture: true, passive: true }),
      )
    }

    function unbindUnlock() {
      UNLOCK_EVENTS.forEach((e) => document.removeEventListener(e, onUnlock, true))
    }

    // Abaikan event dari elemen audio kita sendiri, kalau tidak sync() bakal
    // memanggil dirinya sendiri terus.
    const onMediaEvent = (e) => {
      if (e.target === audio) return
      sync()
    }

    // Jalan sambil mute belum berarti kedengaran, jadi mute ikut dihitung.
    const refresh = () => setPlaying(!audio.paused && !audio.muted && audio.volume > 0)

    syncRef.current = sync
    unlockRef.current = onUnlock
    audio.addEventListener('play', refresh)
    audio.addEventListener('pause', refresh)
    audio.addEventListener('volumechange', refresh)
    MEDIA_EVENTS.forEach((e) => document.addEventListener(e, onMediaEvent, true))
    document.addEventListener('visibilitychange', sync)
    const poll = window.setInterval(sync, POLL_MS)

    sync()

    return () => {
      unbindUnlock()
      window.clearInterval(poll)
      audio.removeEventListener('play', refresh)
      audio.removeEventListener('pause', refresh)
      audio.removeEventListener('volumechange', refresh)
      MEDIA_EVENTS.forEach((e) => document.removeEventListener(e, onMediaEvent, true))
      document.removeEventListener('visibilitychange', sync)
      syncRef.current = null
      unlockRef.current = null
    }
  }, [])

  // Kalau autoplay tadi ditolak, tombol tampil "mati" padahal niatnya masih
  // nyala; jadi yang dibalik adalah kondisi nyata, bukan enabledRef.
  const toggle = () => {
    const next = !playing
    enabledRef.current = next
    // Dipanggil dari dalam klik, jadi ini gesture yang sah: lewat onUnlock
    // supaya blokir autoplay dilepas dan audionya benar-benar bersuara.
    if (next) unlockRef.current?.()
    else syncRef.current?.()
  }

  const on = playing

  return (
    <>
      <audio ref={audioRef} src={backsoundSrc} loop preload="auto" />

      <button
        type="button"
        onClick={toggle}
        aria-label={on ? 'Matikan musik latar' : 'Nyalakan musik latar'}
        aria-pressed={on}
        title={on ? 'Matikan musik latar' : 'Nyalakan musik latar'}
        className="fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-soya-800/85 text-cream-100 shadow-card backdrop-blur-sm transition hover:bg-soya-800 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
      >
        {on ? (
          // Not musik + gelombang: backsound lagi jalan
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5 sm:h-5.5 sm:w-5.5">
            <path d="M9 18V5l10-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="16" cy="16" r="3" />
          </svg>
        ) : (
          // Not musik dicoret: backsound mati
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5 sm:h-5.5 sm:w-5.5">
            <path d="M9 18V5l10-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="16" cy="16" r="3" />
            <line x1="3" y1="3" x2="21" y2="21" />
          </svg>
        )}
      </button>
    </>
  )
}
