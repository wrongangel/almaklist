'use client'
import { supabaseClient } from '@/service/supabase'
import * as Form from '@radix-ui/react-form'
import { type FormEvent, useState } from 'react'

const SignupForm = (): React.ReactNode => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassord] = useState<string>('')
  const signup = async (): Promise<void> => {
    await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  const handleSignup = (e: FormEvent): void => {
    e.preventDefault()
    void signup()
  }

  return (
    <Form.Root onSubmit={(e) => { handleSignup(e) }}>
      <Form.Field name='email'>
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
      <Form.Field name='password'>
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
      <Form.Field name='confirmPassword'>
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
