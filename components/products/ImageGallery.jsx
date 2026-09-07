'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ImageGallery({ images, title }) {
  const [active, setActive] = useState(0)
  const current = images[active]

  if (!current) return null

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-blue-100 bg-blue-50">
        <Image
          src={current.url}
          alt={current.alt || title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-20 w-24 overflow-hidden rounded-lg border-2 transition-all ${
                i === active ? 'border-yellow-500' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={image.url} alt={image.alt || `${title} ${i + 1}`} fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
