import { IconCertificate } from '@tabler/icons-react'
import React from 'react'

interface TotalCoursesProps {
  label: string
}

export default function TotalCourses({ label }: TotalCoursesProps) {
  return (
    <div>
      <div className="flex items-center justify-center -space-x-5">
        <IconCertificate className="mx-auto size-6 shrink-0 text-cyan-200 sm:size-8" />
      </div>
      <div className="mt-3 sm:mt-5">
        <h3 className="text-lg font-semibold text-white sm:text-3xl">
          0
        </h3>
        <p className="mt-1 text-sm text-white sm:text-base">
          {label}
        </p>
      </div>
    </div>
  )
}
