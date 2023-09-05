import Container from '@/components/Container/Container'
import globalStyles from '@/styles/Globals.module.scss'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <main className={globalStyles.main}>
      <Container>
        <h2>Authorized</h2>
        {children}
      </Container>
    </main>
  )
}
