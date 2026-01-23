import '@/app/globals.css'

export const metadata = {
  title: 'Virtue ID',
  description: 'Virtue ID Digital Solution',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
