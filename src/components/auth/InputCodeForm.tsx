"use client";
import React, {FormEvent, useState} from "react";
import Image from "next/image";
import {PencilIcon, ResendIcon} from "@/icons";
import { useRouter } from "next/navigation";
import { useAuthStore } from '@/store/authStore';
import { OtpInput } from 'reactjs-otp-input';
import Countdown, { zeroPad  } from 'react-countdown';
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import Logo from '/public/images/logo/diloop-logo.png'
import {useMutation} from "@tanstack/react-query";
import { useApiRoutes } from "@/app/api/auth/routes";
export default function InputCodeForm() {

    const router = useRouter();
    const [error, setError] = useState('');
    const { setAuthToken } = useAuthStore()
    const { VerifyOtp, Login } = useApiRoutes();
    // Custom renderer for minutes:seconds format
    const [countCompleted, setCountCompleted] = useState(false);
    const handleTimerReset = () => {
        setCountCompleted(false)
    }
    const renderer = ({ minutes, seconds }) => {
            return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
    };


    const { userLoginNumber } = useAuthStore()
    const [otp, setOtp] = useState('');
    const handleChange = (otp) => setOtp(otp);


    const VerifyMutate= useMutation({
        mutationFn: () => VerifyOtp({mobile: userLoginNumber, otp, page: 'login'}),
        onSuccess: (response ) => {
            // send code to number
            setAuthToken(response?.['data'].token);
            document.cookie = `auth_token=${response?.['data']['token']}`;
            router.push('/admin-panel')
        },
        onError: (error) => {
            console.log(error)
            setError(error?.['response']?.data?.message);
        }
    });

    const handleVerify = (evt: FormEvent) => {
        evt.preventDefault();
        VerifyMutate.mutate();
    }

    const ResendMutate= useMutation({
        mutationFn: () => Login({mobile: userLoginNumber, method: 'otp'}),
            onSuccess: (response ) => {
        // send code to number
                console.log(response)
                handleTimerReset()
    },
        onError: (error) => {
        console.log(error)
        setError(error?.['response']?.data?.message);
    }
    });


    const handleResend = () => {
        ResendMutate.mutate();
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
                    <div className="text-center flex flex-col gap-2 mb-4 items-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                             کد تایید به شماره
                            <span
                                className={`font-bold text-lg px-2 text-black dark:!text-blue-500 tracking-[1px]`}>{userLoginNumber}</span>
                            ارسال شد.

                        </p>

                            {countCompleted ?
                                (
                                <Button startIcon={<ResendIcon className={`w-5`} />} loading={ResendMutate.isPending} onClick={handleResend} className={`flex items-center !px-2 !py-1 text-xs bg-blue-700 !rounded-full text-white gap-1 dark:text-gray-400 cursor-pointer ${countCompleted ? '' : 'disabled'}`}
                                >
                                    <span>
                                               ارسال مجدد کد
                                            </span>
                                </Button>
                                ) :
                                (
                                    <span className={`font-black text-white bg-orange-500 rounded-full px-2` }>
                                    <Countdown date={Date.now() + 120000} renderer={renderer} onComplete={() => setCountCompleted(true)} />
                                                     </span>
                                )
                            }

                        <h1 className="text-sm mb-2 font-semibold text-gray-800 dark:text-white/90">
                            کد دریافت شده را در قسمت پایین وارد کنید
                        </h1>
                    </div>
                    <div>
                        <form onSubmit={handleVerify}>
                            <div className="space-y-6 flex flex-col justify-center items-center w-full`">
                                {/*<Label className={`self-start`}>کد تایید</Label>*/}
                                <div className={`flex flex-1 flex-col  m-0 w-full dir-ltr`}>
                                    <div className={`flex justify-between flex-row-reverse text-xs`}>
                                        <Link className={`flex items-center gap-1 dark:text-gray-400`} href={`/login`}>
                                            <PencilIcon className={`w-5`} />
                                            <span>
                                                ویرایش شماره
                                            </span>
                                        </Link>
                                    </div>
                                    <OtpInput className={`text-black dark:text-white w-full justify-between gap-4 mt-4`} isInputNum={true} shouldAutoFocus={true} inputStyle={`border-b-3 border-blue-400  !w-8 h-10 focus-visible:outline-none`}
                                              value={otp}
                                              onChange={handleChange}
                                              numInputs={6}
                                              separator={<span></span>} />
                                    <span className={`relative text-xs text-rose-400 top-2 `} style={{direction: 'rtl'}}>
                                        {error}
                                    </span>
                                    <div className={`flex flex-1  mt-6 w-full`}>
                                        <Button loading={VerifyMutate.isPending} className={`w-full rounded-xl`} disabled={otp.length < 6} size="sm">
                                            ورود
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

