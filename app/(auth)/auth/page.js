'use client'

import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useSignInMutation, useSignUpMutation } from '@/store/api/userApi'
import { AuthContext } from '@/utils/AuthContext'
import Cookies from 'js-cookie'

const Page = () => {
  const router = useRouter()
  const [user, setUser] = useState(false)
  const [consoleMessage, setConsoleMessage] = useState('')

  const [signIn] = useSignInMutation()
  const [signUp] = useSignUpMutation()

  const { signin } = useContext(AuthContext)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    shouldUseNativeValidation: true,
  })

  const onSubmitSignUp = async (data) => {
    signUp(data)
      .unwrap()
      .then((data) => {
        if (data.status === true) {
          setConsoleMessage('User registered successfully')
          reset()

          setTimeout(() => {
            setUser(true)
            setConsoleMessage('')
          }, 3000)
        } else if (data.status === false) {
          reset()
          setConsoleMessage('Failed to register')
        }
      })
      .catch((error) => {
        console.log(error)
        reset()
        setConsoleMessage('Something went wrong')
      })
  }

  const onSubmitSignIn = async (data) => {
    signIn(data)
      .unwrap()
      .then((data) => {
        if (data.status === true) {
          setConsoleMessage(`Welcome ${data.user.email}`)
          reset()
          Cookies.set('token', data.token)
          signin(data.user)
          router.push('/books')
        } else if (data.status === false) {
          reset()
          setConsoleMessage('Failed to find the account')
        }
      })
      .catch((error) => {
        reset()
        setConsoleMessage('Something went wrong')
      })
  }

  const SignUp = () => {
    return (
      <section className='flex'>
        <div className='w-1/2 text-center bg-white flex flex-col justify-center gap-4'>
          <h3 className='text-center text-3xl mb-6'>Welcome.</h3>
          <form
            className='w-1/2 mx-auto border-2 border-black border-solid rounded p-4'
            onSubmit={handleSubmit(onSubmitSignUp)}
          >
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block mb-2 text-lg font-medium text-gray-700 text-left'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                className='w-full px-4 py-2 border-2 border-black rounded-md'
                {...register('email', {
                  required: 'Please enter a valid email',
                })}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block mb-2 text-lg font-medium text-gray-700 text-left'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                className='w-full px-4 py-2 border-2 border-black rounded-md'
                {...register('password', { required: 'Password is required' })}
              />
            </div>

            <button type='submit' className='black_btn w-full mb-4'>
              SIGN UP
            </button>

            <p className='text-xs'>
              Sudah punya akun?{' '}
              <span
                className='blue_gradient cursor-pointer'
                onClick={() => setUser(!user)}
              >
                Klik di sini
              </span>
            </p>
          </form>
          <p className='mt-4'>{consoleMessage}</p>
        </div>
        <div className='border-r-2 border-black h-screen' />
        <div className='w-1/2 text-center bg-yellow-fir flex flex-col justify-center'>
          <p className='text-center font-medium mb-5 text-3xl font-mabry_pro p-6'>
            &ldquo;Library App&rdquo;
          </p>
        </div>
      </section>
    )
  }

  const SignIn = () => {
    return (
      <section className='flex'>
        <div className='w-1/2 text-center bg-paleblue-fir flex flex-col justify-center'>
          <p className='text-center font-medium mb-5 text-3xl font-mabry_pro p-6'>
            &ldquo;IFABULA Fullstack&rdquo;
          </p>
        </div>
        <div className='border-r-2 border-black h-screen' />
        <div className='w-1/2 text-center bg-white flex flex-col justify-center gap-4'>
          <h3 className='text-center text-3xl mb-6'>Welcome back.</h3>
          <form
            className='w-1/2 mx-auto border-2 border-black border-solid rounded p-4'
            onSubmit={handleSubmit(onSubmitSignIn)}
          >
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block mb-2 text-lg font-medium text-gray-700 text-left'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                className='w-full px-4 py-2 border-2 border-black rounded-md'
                {...register('email', {
                  required: 'Please enter a valid email',
                })}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block mb-2 text-lg font-medium text-gray-700 text-left'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                className='w-full px-4 py-2 border-2 border-black rounded-md'
                {...register('password', { required: 'Password is required' })}
              />
            </div>

            <button type='submit' className='black_btn w-full mb-4'>
              SIGN IN
            </button>

            <p className='text-xs'>
              Belum punya akun?{' '}
              <span
                className='blue_gradient cursor-pointer'
                onClick={() => setUser(!user)}
              >
                Klik di sini
              </span>
            </p>
          </form>

          <p className='mt-4'>{consoleMessage}</p>
        </div>
      </section>
    )
  }

  return <div>{user ? <SignIn /> : <SignUp />}</div>
}

export default Page
