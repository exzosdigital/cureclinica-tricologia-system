'use client'

import { ReactNode } from 'react'

interface AnalyticsProviderProps {
  children: ReactNode
}

// Placeholder analytics provider
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return <>{children}</>
}