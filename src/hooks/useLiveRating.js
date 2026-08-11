import { useEffect, useState } from "react";

/**
 * Ambil rating Google terbaru dari /api/rating (serverless function di Vercel).
 *
 * Angka cadangan dari contact.js dipakai selama jawaban belum datang, dan tetap
 * dipakai kalau endpointnya tidak tersedia — misalnya waktu `npm run dev` yang
 * memang tidak menjalankan serverless function, atau kalau API key belum diisi.
 * Jadi kartu info tidak pernah kosong dan tidak pernah menampilkan error.
 */
export default function useLiveRating(fallbackRating, fallbackReviewCount) {
  const [live, setLive] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/rating", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (
          data &&
          typeof data.rating === "number" &&
          typeof data.reviewCount === "number"
        ) {
          setLive(data);
        }
      })
      .catch(() => {
        // Sengaja didiamkan: angka cadangan sudah tampil sejak awal.
      });

    return () => controller.abort();
  }, []);

  return {
    rating: live ? live.rating : fallbackRating,
    reviewCount: live ? live.reviewCount : fallbackReviewCount,
  };
}
