export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
      <main>
        {children}
      </main>
  )
}
