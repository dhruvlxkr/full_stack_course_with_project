'use client'

import { useEffect } from 'react'

export default function Analytics() {
  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

    if (gaId) {
      const s1 = document.createElement('script')
      s1.async = true
      s1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      document.head.appendChild(s1)

      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', gaId)
      window.gtag = gtag
    }

    if (plausibleDomain) {
      const s2 = document.createElement('script')
      s2.defer = true
      s2.dataset.domain = plausibleDomain
      s2.src = 'https://plausible.io/js/script.js'
      document.head.appendChild(s2)
    }
  }, [])

  return null
}
