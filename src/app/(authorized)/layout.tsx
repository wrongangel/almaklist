import IsAuth from '@/components/util/IsAuth'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <main>
      <IsAuth />
      <h2>Authorized</h2>
      {children}
    </main>
  )
}
