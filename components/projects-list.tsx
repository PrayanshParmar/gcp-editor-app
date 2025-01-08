'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Mock data for projects
const projects = [
  { id: 1, name: 'Project A', imageCount: 10 },
  { id: 2, name: 'Project B', imageCount: 15 },
  { id: 3, name: 'Project C', imageCount: 8 },
]

export default function ProjectsList() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Projects List</h2>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="flex items-center justify-between border p-4 rounded-md">
            <div>
              <h3 className="text-lg font-medium">{project.name}</h3>
              <p className="text-sm text-gray-500">{project.imageCount} images</p>
            </div>
            <Button asChild>
              <Link href={`/gcp-editor/${project.id}`}>View/Edit GCPs</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

