import Container from '@/components/Container/Container'
import Header from '@/components/Header/Header'
import globalStyles from '@/styles/Globals.module.scss'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (<>
    <Header />
    <main className={globalStyles.main}>
      <Container>
        {children}
      </Container>
    </main>
  </>
  )
}
