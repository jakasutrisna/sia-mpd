"use client"

import { useEffect, useRef } from 'react'
import { logout } from '@/src/actions/auth'

interface AutoLogoutProps {
  timeoutMinutes?: number // Waktu idle dalam menit
}

export default function AutoLogout({ timeoutMinutes = 15 }: AutoLogoutProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutMs = timeoutMinutes * 60 * 1000

  // Fungsi untuk me-reset timer setiap ada aktivitas
  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      alert('Sesi Anda telah berakhir karena tidak ada aktivitas. Silakan login kembali.')
      logout()
    }, timeoutMs)
  }

  useEffect(() => {
    // Event yang dipantau untuk mendeteksi aktivitas pengguna
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']

    // Jalankan timer saat pertama kali halaman di-load
    resetTimer()

    // Pasang listener pada seluruh window
    events.forEach((event) => {
      window.addEventListener(event, resetTimer)
    })

    // Cleanup listener saat komponen di-unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer)
      })
    }
  }, [timeoutMs])

  return null // Komponen ini berjalan di background tanpa UI
}