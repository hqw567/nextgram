'use client'

import { type ElementRef, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import Link from 'next/link'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const dialogRef = useRef<ElementRef<'dialog'>>(null)

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal()
    }
  }, [])

  function onDismiss() {
    router.back()
  }

  return createPortal(
    <div className="modal-backdrop">
      <dialog
        ref={dialogRef}
        className="modal"
        onClose={onDismiss}
      >
        <header>
          <Link href={'/'}>Go Home( Link )</Link>
          <button
            onClick={() => {
              router.push('/')
            }}
          >
            Go Home( router.push('/') )
          </button>
        </header>
        {children}
        <button
          onClick={onDismiss}
          className="close-button"
        />
      </dialog>
    </div>,
    document.getElementById('modal-root')!,
  )
}
