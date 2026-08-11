import './globals.css'

export const metadata = {
  metadataBase: new URL('https://your-domain-here.com'),
  title: 'Dharmendra Laxkar — PHP, Laravel & Full-Stack Developer',
  description:
    'Portfolio of Dharmendra Laxkar — PHP & Laravel developer building ERP, CRM, and full-stack web applications with Laravel, CakePHP, React, Next.js and Node.js.',
  authors: [{ name: 'Dharmendra Laxkar' }],
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
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
