import React from 'react'
import Categories from './categories'
import Tags from './tags'

export default function Sidebar() {
  return (
    <div className="space-y-4">
      <Categories />
      <Tags />
    </div>
  )
}
