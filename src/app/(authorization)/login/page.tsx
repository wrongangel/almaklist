import LoginForm from '@/components/forms/LoginForm/LoginForm'
import Link from 'next/link'

const Login = (): React.ReactNode => {
  return (
    <div>
      <h1>Login</h1>
      <p>Don&apos;t have an account? <Link href='/registration'>Register</Link></p>
      <LoginForm />
    </div>
  )
}
export default Login
