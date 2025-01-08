'use client'

import Image from 'next/image'

// Mock data for images
const images = [
  '/placeholder.svg?height=150&width=150',
  '/placeholder.svg?height=150&width=150',
  '/placeholder.svg?height=150&width=150',
  '/placeholder.svg?height=150&width=150',
  '/placeholder.svg?height=150&width=150',
  '/placeholder.svg?height=150&width=150',
]

export default function ImageGallery({ onSelectImage }: { onSelectImage: (image: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-60">
      {images.map((image, index) => (
        <div key={index} className="cursor-pointer" onClick={() => onSelectImage(image)}>
          <Image src={image} alt={`Drone image ${index + 1}`} width={150} height={150} className="object-cover rounded-md" />
        </div>
      ))}
    </div>
  )
}

