'use client'
import { supabaseClient } from '@/service/supabase'
import { useUserStore } from '@/stores/userStore'
import * as Form from '@radix-ui/react-form'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'
import styles from './SignupForm.module.scss'

const SignupForm = (): React.ReactNode => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassord] = useState<string>('')
  const router = useRouter()
  const userStore = useUserStore()
  const signup = async (): Promise<void> => {
    try {
      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`
        }
      })
      if (error !== null) {
        console.log(error.message)
      } else {
        void userStore.getUser()
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignup = (e: FormEvent): void => {
    e.preventDefault()
    void signup()
  }

  return (
    <Form.Root onSubmit={(e) => { handleSignup(e) }} className={styles.signupForm}>
      <Form.Field name='email' className={styles.formField}>
        <Form.Label>Email</Form.Label>
        <Form.Control asChild>
          <input
            type='email'
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
        </Form.Control>
        <Form.Message match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </Form.Field>
      <Form.Field name='password' className={styles.formField}>
        <Form.Label>Password</Form.Label>
        <Form.Control asChild>
          <input
            type='password'
            value={password}
            onChange={(e) => { setPassord(e.target.value) }}
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
      <Form.Field name='confirmPassword' className={styles.formField}>
        <Form.Label>Confirm password</Form.Label>
        <Form.Control asChild>
          <input type='password' required minLength={8} />
        </Form.Control>
        <Form.Message match="valueMissing">
          Please enter your password
        </Form.Message>
        <Form.Message match="tooShort">
          Password length is minimum 8 symbols
        </Form.Message>
        <Form.Message match={(value, formData) => value !== password}>
          Passwords does not match
        </Form.Message>
      </Form.Field>
      <Form.Submit asChild>
        <button>Register</button>
      </Form.Submit>
    </Form.Root>
  )
}
export default SignupForm
