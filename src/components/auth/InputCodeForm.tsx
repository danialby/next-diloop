"use client";
import React, {useState} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from '@/store/authStore';
import Countdown, { zeroPad  } from 'react-countdown';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Logo from '/public/images/logo/diloop-logo.png'
import {useMutation} from "@tanstack/react-query";
import { useApiRoutes } from "@/app/api/auth/routes";
import {Loader2, Pencil, SendIcon} from "lucide-react";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
export default function InputCodeForm() {

    const router = useRouter();
    const [error, setError] = useState('');
    const { setAuthToken } = useAuthStore()
    const { VerifyOtp, Login } = useApiRoutes();

    const form = useForm({
        defaultValues: {
            otp_code: "",
        },
    })



    // Custom renderer for minutes:seconds format
    const [countCompleted, setCountCompleted] = useState(false);
    const handleTimerReset = () => {
        setCountCompleted(false)
    }
    const renderer = ({ minutes, seconds }) => {
            return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
    };


    const { userLoginNumber } = useAuthStore()

    const VerifyMutate= useMutation({
        mutationFn: (data: object) => VerifyOtp({mobile: userLoginNumber,  otp:data?.['otp_code'],  page: 'login'}),
        onSuccess: (response ) => {
            // send code to number
            console.log(response);
            
            setAuthToken(response?.['data'].token);
            document.cookie = `auth_token=${response?.['data']['token']}`;
            router.push('/admin-panel')
        },
        onError: (error) => {
            console.log(error)
            setError(error?.['response']?.data?.message);
        }
    });

    const handleVerify = (data) => {
        console.log(data)
        VerifyMutate.mutate(data);
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
                                <Button onClick={handleResend}
                                        className={`flex items-center !px-2 !py-1 text-xs bg-blue-700 !rounded-full text-white gap-1 dark:text-gray-400 cursor-pointer ${countCompleted ? '' : 'disabled'}`}
                                >
                                    {ResendMutate.isPending ? <Loader2 /> :
                                        (
                                            <span>
                                            <SendIcon className={`w-5`} />   ارسال مجدد کد
                                            </span>
                                        )}
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
                        <div className={`flex flex-1 flex-col  m-0 w-full`}>
                            <div className={`flex justify-between flex-row-reverse text-xs`}>
                                <Link className={`flex items-center gap-1 dark:text-gray-400`} href={`/login`}>
                                    <Pencil className={`w-5`} />
                                    <span>
                                                ویرایش شماره
                                            </span>
                                </Link>
                            </div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleVerify)} className="w-full space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="otp_code"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>کد تایید</FormLabel>
                                                <FormControl>
                                                    {/*<Input testId='mobile-input' placeholder="09123456789" {...field}*/}
                                                    {/*       className={`rounded-xl font-outfit tracking-[2px] h-10 mt-1`}*/}
                                                    {/*/>*/}
                                                    <InputOTP data-testid='otp-input' onComplete={form.handleSubmit(handleVerify)} maxLength={6} {...field} containerClassName={`dir-ltr`}>
                                                        <InputOTPGroup className={`space-x-2`}>
                                                            <InputOTPSlot  className={`!rounded-lg !border-1 !border-gray-400`} index={0} />
                                                            <InputOTPSlot className={`!rounded-lg !border-1 !border-gray-400`} index={1} />
                                                            <InputOTPSlot className={`!rounded-lg !border-1 !border-gray-400`} index={2} />
                                                            <InputOTPSlot className={`!rounded-lg !border-1 !border-gray-400`} index={3} />
                                                            <InputOTPSlot className={`!rounded-lg !border-1 !border-gray-400`} index={4} />
                                                            <InputOTPSlot className={`!rounded-lg !border-1 !border-gray-400`} index={5} />
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                </FormControl>
                                                <FormDescription>
                                                </FormDescription>
                                                <p className={`text-rose-600 text-xs`}>
                                                    {error}
                                                </p>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" disabled={VerifyMutate?.isPending}  className="w-full rounded-xl h-10" >
                                        {VerifyMutate.isPending && <Loader2 />}
                                        ورود
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    {/*<div>*/}
                    {/*    <form onSubmit={handleVerify}>*/}
                    {/*        <div className="space-y-6 flex flex-col justify-center items-center w-full`">*/}
                    {/*            /!*<Label className={`self-start`}>کد تایید</Label>*!/*/}
                    {/*            <div className={`flex flex-1 flex-col  m-0 w-full dir-ltr`}>*/}
                    {/*                <div className={`flex justify-between flex-row-reverse text-xs`}>*/}
                    {/*                    <Link className={`flex items-center gap-1 dark:text-gray-400`} href={`/login`}>*/}
                    {/*                        <Pencil className={`w-5`} />*/}
                    {/*                        <span>*/}
                    {/*                            ویرایش شماره*/}
                    {/*                        </span>*/}
                    {/*                    </Link>*/}
                    {/*                </div>*/}
                    {/*                <OtpInput className={`text-black dark:text-white w-full justify-between gap-4 mt-4`} isInputNum={true} shouldAutoFocus={true} inputStyle={`border-b-3 border-blue-400  !w-8 h-10 focus-visible:outline-none`}*/}
                    {/*                          value={otp}*/}
                    {/*                          onChange={handleChange}*/}
                    {/*                          numInputs={6}*/}
                    {/*                          separator={<span></span>} />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </form>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
        </div>
    );
}

