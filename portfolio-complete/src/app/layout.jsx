import './globals.css'
import ServiceWorkerRegister from '../components/ServiceWorkerRegister.jsx'

export const metadata = {
  metadataBase: new URL('https://your-domain-here.com'),
  title: 'Dharmendra Laxkar — PHP, Laravel & Full-Stack Developer',
  description:
    'Portfolio of Dharmendra Laxkar — PHP & Laravel developer building ERP, CRM, and full-stack web applications with Laravel, CakePHP, React, Next.js and Node.js.',
  authors: [{ name: 'Dharmendra Laxkar' }],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'D.Laxkar',
  },
  openGraph: {
    type: 'website',
    title: 'Dharmendra Laxkar — PHP, Laravel & Full-Stack Developer',
    description:
      'Portfolio of Dharmendra Laxkar — PHP & Laravel developer building ERP, CRM, and full-stack web applications with Laravel, CakePHP, React, Next.js and Node.js.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dharmendra Laxkar — PHP, Laravel & Full-Stack Developer',
    description:
      'Portfolio of Dharmendra Laxkar — PHP & Laravel developer building ERP, CRM, and full-stack web applications.',
    images: ['/og-image.png'],
  },
}

export const viewport = {
  themeColor: '#05070D',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
