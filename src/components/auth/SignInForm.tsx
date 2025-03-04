"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import CustomInput from "@/components/custom/CustomInput";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
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
          <div className="mb-16 text-center">

            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              ورود به دیلوپ
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              برای ورود شماره موبایل خود را وارد کنید.
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-6">
                <div className={``}>
                  <CustomInput floatingLabel={true} placeholder="شماره موبایل" type="text"
                               className={`border-[2px] rounded-xl`} />
                </div>
                <div className="flex items-center justify-around">
                  <div className="flex items-center gap-3">
                    {/*<Checkbox checked={isChecked} onChange={setIsChecked} />*/}
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      اکانت دارید؟
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    ورود با کلمه عبور
                  </Link>
                </div>
                <div className={`mt-16`}>
                  <Button className="w-full" size="sm">
                    ورود  |  ثبت نام
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-xs font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                <span>ورود یا ثبت نام شما به منزله پذیرش </span>
                <Link
                  href="/terms"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  قوانین دیلوپ
                </Link>
                <span> می باشد</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
