'use client'
import { supabaseClient } from '@/service/supabase'
import { useUserStore } from '@/stores/userStore'
import * as Form from '@radix-ui/react-form'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'

const LoginForm = (): React.ReactNode => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()
  const userStore = useUserStore()
  const login = async (): Promise<void> => {
    try {
      const { error } = await supabaseClient.auth.signInWithPassword({ email, password })
      if (error !== null) {
        console.log(error.message)
      } else {
        await userStore.getUser()
        router.push('/application/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = (e: FormEvent): void => {
    e.preventDefault()
    void login()
  }

  return (
    <Form.Root onSubmit={(e) => { handleLogin(e) }}>
      <Form.Field name='email'>
        <Form.Label>Email</Form.Label>
        <Form.Control asChild>
          <input
            type='email'
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            required />
        </Form.Control>
        <Form.Message match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </Form.Field>
      <Form.Field name='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control asChild>
          <input
            type='password'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            required
            minLength={8} />
        </Form.Control>
        <Form.Message match="valueMissing">
          Please enter your password
        </Form.Message>
        <Form.Message match="tooShort">
          Password length is minimum 8 symbols
        </Form.Message>
      </Form.Field>
      <Form.Submit asChild>
        <button>Login</button>
      </Form.Submit>
    </Form.Root>
  )
}
export default LoginForm
