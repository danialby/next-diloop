import type { Metadata } from 'next'
import InputCodeForm from '@/components/auth/InputCodeForm'

export const metadata: Metadata = {
  title: 'Next.js SignIn Page | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Signin Page TailAdmin Dashboard Template',
}

export default function InputCode() {
  return <InputCodeForm />
}
