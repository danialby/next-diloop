"use client";
import React, {FormEvent, useState} from "react";
import {useMutation} from '@tanstack/react-query';
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import Image from "next/image";
import CustomInput from "@/components/custom/CustomInput";
import { useRouter } from "next/navigation";
import { useAuthStore } from '@/store/authStore';
import Label from "@/components/form/Label";
import Logo from '/public/images/logo/diloop-logo.png'
import {Login} from "@/app/api/auth/routes";


const login =  async({mobile, method}) => {
  const response = await Login({mobile, method});
  return response.json();
}

export default function UserLogin() {

  const router = useRouter();
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const { setUserLoginNumber } = useAuthStore()

  const { mutate, isPending  } = useMutation({
    mutationFn: login,
    throwOnError: true,
    onSuccess: (response) => {
      // send code to number
      console.log(response)
      const hasFalseResult = response?.data?.result !== undefined && response?.data?.result === false;
      if(response?.errors || hasFalseResult) {
        setError(response.message)
        return;
      }
      setUserLoginNumber(phone)
      router.push('/login/input-code')
    },
    onError: (error) => {
      console.log(error)
      setError('مشکل پیش آمده، دوباره تلاش کنید')
    }
  });

  function handleLogin(evt: FormEvent) {
    evt.preventDefault();
    mutate({
      mobile: phone as string,
      method: 'otp',
    });
  }

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
            <div className={`w-5 h-1 bg-white/30 rounded-full my-6`} />
            <div>
              <form onSubmit={handleLogin}>
                <div className="space-y-6 flex flex-col justify-center items-center w-full`">
                  <div className={`flex flex-1 flex-col  m-0 w-full`}>
                    <Label>شماره موبایل</Label>
                    <CustomInput
                        type="text"
                        defaultValue={phone}
                        error={error.length > 0}
                        onChange={(e) => {
                          setPhone(e.target.value)
                        }}
                        floatingLabel={false}
                        placeholder="09123456789"
                        hint={error || ""}
                        className={`rounded-xl font-outfit tracking-[2px] mt-1`}
                    />
                  </div>
                  <div className={`my-4`}/>
                  <div className={`flex flex-1  m-0 w-full`}>
                    <Button loading={isPending} className="w-full rounded-xl" size="sm">
                      ورود
                    </Button>
                  </div>
                </div>
              </form>
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
  );
}
