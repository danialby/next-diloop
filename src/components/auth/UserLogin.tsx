'use client'

import Logo from '@/../public/images/logo/diloop-logo.png'
import { useApiRoutes } from '@/app/api/auth/routes'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/authStore'

import { zodResolver } from '@hookform/resolvers/zod'

import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function UserLogin() {
  const router = useRouter()
  const [error, setError] = useState('')
  const { setUserLoginNumber } = useAuthStore()
  const { Login } = useApiRoutes()

  const FormSchema = z.object({
    mobile: z.string()
      .nonempty('شماره موبایل را وارد کنید')
      .length(11, { message: 'شماره موبایل باید 11 کاراکتر باشد.' })
      .regex(/^09\d{9}$/, 'شماره موبایل باید با 09 شروع شود'),
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mobile: '',
    },
  })

  const mutateLogin = useMutation(
    {
      // @ts-expect-error login data structure
      mutationFn: data => Login({ mobile: data?.mobile, method: 'otp' }),
      onSuccess: (response) => {
        // send code to number
        console.warn(response)
        router.push('/login/input-code')
      },
      onError: (error) => {
        console.warn(error)
        // form.setError('mobile', error)
        setError(error?.response?.data?.message)
      },
    },
  )

  const handleLogin = (data: z.infer<typeof FormSchema>) => {
    setError('')
    // @ts-expect-error data from login
    mutateLogin.mutate(data)
    setUserLoginNumber(data?.mobile)
  }

  // Dependency array ensures this runs when `data` changes
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full font-vazir">
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md mx-auto">
        <div className="flex flex-col flex-1 w-full items-center justify-center">
          <div className="py-8">
            <Image
              width={231}
              height={48}
              src={Logo}
              alt="Logo"
            />
          </div>
          <div className="text-center">

            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              ورود به دیلوپ
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              برای ورود شماره موبایل خود را وارد کنید.
            </p>
          </div>
          <div className="w-5 h-1 bg-white/30 rounded-full my-6" />
          <div>
            <div className="flex flex-1 flex-col  m-0 w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="w-full space-y-6">
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>شماره موبایل</FormLabel>
                        <FormControl>
                          <Input
                            data-testid="mobile-input"
                            placeholder="09123456789"
                            {...field}
                            className="rounded-xl font-outfit tracking-[2px] h-10 mt-1"
                          />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage />
                        <p className="text-red-600 text-xs">
                          {error}
                        </p>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" data-testid="login-btn" disabled={mutateLogin?.isPending} className="w-full rounded-xl h-10">
                    {mutateLogin.isPending && <Loader2 />}
                    ورود
                  </Button>
                </form>
              </Form>
            </div>
            {/* <form onSubmit={handleLogin}> */}
            {/*  <div className="space-y-6 flex flex-col justify-center items-center w-full`"> */}
            {/*    <div className={`flex flex-1 flex-col  m-0 w-full`}> */}
            {/*      <Label>شماره موبایل</Label> */}
            {/*    <Input */}
            {/*          testId='mobile-input' */}
            {/*          type="text" */}
            {/*          value={phone} */}
            {/*          error={error?.length > 0} */}
            {/*          onChange={(e) => { */}
            {/*            setPhone(e.target.value) */}
            {/*          }} */}
            {/*          floatingLabel={false} */}
            {/*          placeholder="09123456789" */}
            {/*          hint={error || ""} */}
            {/*          className={`rounded-xl font-outfit tracking-[2px] mt-1`} */}
            {/*      /> */}
            {/*    </div> */}
            {/*    <div className={`my-4`}/> */}
            {/*    <div className={`flex flex-1  m-0 w-full`}> */}
            {/*      <Button testId="login-btn" loading={mutateLogin?.isPending}  className="w-full rounded-xl"  size="sm"> */}
            {/*        {mutateLogin.isPending && <Loader2 />} */}
            {/*        ورود */}
            {/*      </Button> */}
            {/*    </div> */}
            {/*  </div> */}
            {/* </form> */}
            <div>
              <p className="text-xs font-normal text-center sm:text-start py-4">
                <span className={`text-gray-700 dark:text-gray-400 `}>ورود یا ثبت نام شما به منزله پذیرش </span>
                <Link
                  href="/terms"
                  className="!text-blue-500 hover:!text-blue-600 dark:!text-blue-400 dark:hover:!text-blue-600"
                >
                  قوانین دیلوپ
                </Link>
                <span className={`text-gray-700 dark:text-gray-400 `}> می باشد</span>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
