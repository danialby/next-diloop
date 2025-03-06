"use client";
// import Checkbox from "@/components/form/input/Checkbox";
// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
// import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import CustomInput from "@/components/custom/CustomInput";
import { useRouter } from "next/navigation";
import { useAuthStore } from '@/store/authStore';
import Label from "@/components/form/Label";
import { OtpInput } from 'reactjs-otp-input';
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';
export default function InputCodeForm() {

    const router = useRouter();
    const [error] = useState('');
    // Custom renderer for minutes:seconds format
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            return <span>زمان </span>;
        } else {
            return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
        }
    };
    const [otp, setOtp] = useState('');

    const handleChange = (otp) => setOtp(otp);
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
    const handleLogin = (evt: { preventDefault: () => void; }) => {
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
                    <div className="text-center flex flex-col gap-2 mb-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            کد تایید به شماره
                            <span
                                className={`font-bold text-lg px-2 text-black dark:!text-blue-500 tracking-[1px]`}>{userNumber}</span>
                            ارسال شد.

                        </p>
                        <Countdown className={`font-vazir`} date={Date.now() + 120000}      renderer={renderer} />
                        <h1 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
                            در قسمت پایین وارد کنید
                        </h1>
                    </div>
                    <div>
                        <form onSubmit={handleLogin}>
                            <div className="space-y-6 flex flex-col justify-center items-center w-full`">
                                <Label className={`self-start`}>کد تایید</Label>
                                <div className={`flex flex-1 flex-col  m-0 w-full dir-ltr`}>

                                    {/*<CustomInput*/}
                                    {/*    type="text"*/}
                                    {/*    defaultValue={userNumber}*/}
                                    {/*    error={error.length > 0}*/}
                                    {/*    onChange={(e) => {*/}
                                    {/*        setUserNumber(e.target.value)*/}
                                    {/*    }}*/}
                                    {/*    floatingLabel={false}*/}
                                    {/*    placeholder="09123456789"*/}
                                    {/*    hint={error || ""}*/}
                                    {/*    className={`rounded-xl font-outfit tracking-[2px] mt-1`}*/}
                                    {/*/>*/}
                                    <OtpInput className={`w-full justify-between gap-4`} isInputNum={true} shouldAutoFocus={true} inputStyle={`border-b-3 border-blue-400  !w-8 h-10 focus-visible:outline-none`}
                                              value={otp}
                                              onChange={handleChange}
                                              numInputs={6}
                                              separator={<span></span>} />
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
                                {/*<div>*/}
                                {/*    <Button className="w-full" size="sm">*/}
                                {/*        ورود  |  ثبت نام*/}
                                {/*    </Button>*/}
                                {/*</div>*/}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
