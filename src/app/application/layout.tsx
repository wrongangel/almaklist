export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <main>
      <h2>Authorized</h2>
      {children}
    </main>
  )
}
