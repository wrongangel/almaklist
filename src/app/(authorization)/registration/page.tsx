import SignupForm from '@/components/forms/SignupForm/SignupForm'
import Link from 'next/link'

const Registration = (): React.ReactNode => {
  return (
    <div>
      <h1>Registration</h1>
      <p>Have an account? <Link href='/login'>Log in</Link></p>
      <SignupForm />
    </div>
  )
}
export default Registration
