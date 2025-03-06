import {Outfit} from "next/font/google";
import localFont from "next/font/local";

export const outfit = Outfit({
    variable: "--font-outfit-sans",
    subsets: ["latin"],
});

export const vazirfd = localFont({
    src: [
        {
            path: '../../public/fonts/VazirFD/Vazir-Thin-FD.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../public/fonts/VazirFD/Vazir-Light-FD.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/fonts/VazirFD/Vazir-Regular-FD.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/fonts/VazirFD/Vazir-Medium-FD.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../public/fonts/VazirFD/Vazir-Bold-FD.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../public/fonts/VazirFD/Vazir-Bold-FD.woff2',
            weight: '900',
            style: 'normal',
        },
    ],
    variable: '--font-vazir-fd', // Optional CSS variable
});
