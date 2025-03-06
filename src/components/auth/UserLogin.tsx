"use client";
// import Checkbox from "@/components/form/input/Checkbox";
// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
// import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, {FormEvent, useState} from "react";
import Image from "next/image";
import CustomInput from "@/components/custom/CustomInput";
import { useRouter } from "next/navigation";
import { useAuthStore } from '@/store/authStore';
import InputField from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";


export default function UserLogin() {

  const router = useRouter();
  const [error] = useState('');
  // const [showPassword, setShowPassword] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

  // const handleRegisterOrLogin = (number) => {
  // check number in database
  // let isRegistered = true
  // if(isRegistered) {
  //   router.push('/auth/login')
  // }
  // else {
  //   router.push('/auth/register')
  // }
  // }

  const { userNumber,setUserNumber } = useAuthStore()
  const handleLogin = (evt: FormEvent) => {
    evt.preventDefault();
    // send code to number
    console.log(userNumber)
    setUserNumber(userNumber)
    router.push('/input-code')
    return userNumber
  }

  return (
      <div className="flex flex-col flex-1 lg:w-1/2 w-full font-vazir">
        <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md mx-auto">
          <div className="flex flex-col flex-1 w-full items-center justify-center">
            <div className="py-8">
              <Image
                  width={231}
                  height={48}
                  src="/images/logo/Dlogo.png"
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
                        defaultValue={userNumber}
                        error={error.length > 0}
                        onChange={(e) => {
                          setUserNumber(e.target.value)
                        }}
                        floatingLabel={false}
                        placeholder="09123456789"
                        hint={error || ""}
                        className={`rounded-xl font-outfit tracking-[2px] mt-1`}
                    />
                  </div>
                  {/*<div className="flex items-center justify-around">*/}
                  {/*  <div className="flex items-center gap-3">*/}
                  {/*    /!*<Checkbox checked={isChecked} onChange={setIsChecked} />*!/*/}
                  {/*    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">*/}
                  {/*      اکانت دارید؟*/}
                  {/*    </span>*/}
                  {/*  </div>*/}
                  {/*  <Link*/}
                  {/*    href="/reset-password"*/}
                  {/*    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"*/}
                  {/*  >*/}
                  {/*    ورود با کلمه عبور*/}
                  {/*  </Link>*/}
                  {/*</div>*/}
                  {/*<div className={`w-1 h-1 rounded-full bg-gray-300 my-6`} />*/}
                  <div className={`my-4`}/>
                  <div className={`flex flex-1  m-0 w-full`}>
                    <Button className="w-full rounded-xl" size="sm">
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
