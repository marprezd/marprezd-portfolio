'use client'

import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import React from 'react'

interface AnimationProps {
  children: ReactNode
}
export default function Animation({ children }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 'some' }}
      transition={{ duration: 2, ease: 'easeOut', delay: 0.7, type: 'tween' }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}
