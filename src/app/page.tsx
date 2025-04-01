import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title:
        'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Home for TailAdmin Dashboard Template',
}

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex gap-6">
        <Link className="px-6  py-3 bg-blue-400 font-vazir text-white font-bold rounded-xl" href="/dashboard">
          داشبورد
        </Link>
        <Link className="px-6  py-3 bg-blue-800 font-vazir text-white font-bold rounded-xl" href="/login">
          ورود
        </Link>
      </div>
    </div>
  )
}
