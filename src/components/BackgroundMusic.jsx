import { useEffect, useRef } from 'react'
import backsoundSrc from '../assets/audio/backsound.mp3'

// Angka ini relatif terhadap volume media perangkat, bukan volume mutlak:
// 0.6 artinya 60% dari volume HP/laptop pengunjung. Dinaikkan dari 0.32 karena
// di perangkat yang volumenya tidak penuh, 32% praktis tidak kedengaran.
// Tidak perlu terlalu pelan demi video: begitu ada video bersuara, backsound
// otomatis berhenti, bukan sekadar mengecil.
const VOLUME = 0.6

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

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = VOLUME

    // Autoplay bersuara sudah pernah ditolak browser. Selama true, audio tetap
    // diputar tapi dibisukan, dan kita tidak boleh coba unmute sendiri karena
    // Chrome langsung mem-pause media yang di-unmute tanpa interaksi.
    let blocked = false

    // Dibaca langsung dari DOM, bukan dari state komponen lain: video mana pun
    // yang benar-benar kedengaran (tidak mute, sedang jalan, volumenya bukan
    // nol) otomatis membungkam backsound.
    const anyVideoAudible = () =>
      Array.from(document.querySelectorAll('video')).some(
        (v) => !v.muted && !v.paused && v.volume > 0,
      )

    // Backsound mengalah pada suara video, dan berhenti kalau tabnya tidak
    // sedang dibuka. Waktu pengunjung scroll menjauh dari showcase,
    // VideoShowcase mem-pause ketiga videonya, jadi syarat ini otomatis
    // terpenuhi lagi dan musik nyala sendiri — tidak perlu logika scroll
    // terpisah di sini.
    const wantSound = () => !document.hidden && !anyVideoAudible()

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
        blocked = false
        unbindUnlock()
        // Keadaan bisa berubah selagi play() masih menggantung, misalnya
        // pengunjung menyalakan suara video di klik yang sama.
        if (!wantSound()) audio.pause()
      }).catch(() => {
        blocked = true
        audio.muted = true
        audio.play().catch(() => {})
        bindUnlock()
      })
    }

    // Satu pintu untuk semua kondisi: suara video dan tab yang lagi dibuka
    // atau tidak.
    function sync() {
      if (!wantSound()) {
        audio.pause()
        return
      }
      if (blocked) {
        // Masih mode bisu: cukup jaga pemutarannya tetap hidup, jangan sentuh
        // muted-nya di luar interaksi pengunjung.
        if (audio.paused) audio.play().catch(() => {})
        return
      }
      playAudible()
    }

    // Interaksi pengunjung = izin bersuara, jadi blokir autoplay dilepas.
    function onUnlock() {
      blocked = false
      if (wantSound()) playAudible()
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

    MEDIA_EVENTS.forEach((e) => document.addEventListener(e, onMediaEvent, true))
    document.addEventListener('visibilitychange', sync)
    const poll = window.setInterval(sync, POLL_MS)

    sync()

    return () => {
      unbindUnlock()
      window.clearInterval(poll)
      MEDIA_EVENTS.forEach((e) => document.removeEventListener(e, onMediaEvent, true))
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  // Tanpa tombol: backsound sepenuhnya diatur otomatis.
  return <audio ref={audioRef} src={backsoundSrc} loop preload="auto" />
}
