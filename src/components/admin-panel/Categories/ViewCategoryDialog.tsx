import React, {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {toPersianDate, toPersianTime} from "@/utils/dateUtils";
import {
    AlignRight,
    Aperture,
    CalendarCheck2,
    Network,
    ReceiptText,
    SpellCheck,
    Type,
    XIcon,
    ListXIcon
} from "lucide-react";



function ViewCategoryDialog({category}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Dialog open={isOpen}>
                <DialogTrigger asChild>
                    <Button size={'icon'}  onClick={() => setIsOpen(true)}
                            className={`!rounded-full !bg-cyan-500 hover:!bg-cyan-600`}>
                        <ReceiptText/>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] font-vazir">
                    <DialogHeader>
                        <DialogHeader>
                            <DialogTitle>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <ListXIcon className={`w-6 h-6`}/><span> جزییات دسته بندی</span>
                                    </div>
                                    <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                                        <XIcon/>
                                    </Button>
                                </div>
                            </DialogTitle>
                        </DialogHeader>
                    </DialogHeader>
                    <div className={`grid grid-cols-3`}>
                        <div className={`flex flex-col col-span-2 gap-y-3`}>
                            <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <Type className={`w-6 h-6 ml-2`}/>عنوان :</span>
                                <span className={` text-nowrap`}>{category?.name_fa}</span>
                                </div>
                            </span>
                            <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <SpellCheck className={`w-6 h-6 ml-2`}/>نام انگلیسی :</span>
                                <span className={` text-nowrap`}>{category?.name_en}</span>
                                </div>
                            </span>
                            <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <Network className={`w-6 h-6 ml-2`}/>نوع :</span>
                                <span className={` text-nowrap`}>{category?.parent_id || 'دسته بندی اصلی'}</span>
                                </div>
                            </span>
                            <span className={`flex items-center`}>

                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <CalendarCheck2 className={`w-6 h-6 ml-2`}/> تاریخ و ساعت :</span>
                                <span className={` text-nowrap`}>
                                    {toPersianDate(category?.created_at)} - {toPersianTime(category?.created_at)}
                                </span>
                                    </div>
                            </span>
                            <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <AlignRight className={`w-6 h-6 ml-2`}/>توضیحات :</span>
                                <span className={` text-nowrap`}>{category?.description}</span>
                                </div>
                            </span>
                        </div>
                        <div className={`flex flex-col items-center col-span-1`}>
                            <div className={`flex flex-col gap-2 rounded-lg bg-gray-200 p-2`}>
                                <span className={`flex text-nowrap font-semibold`}> تصویر :</span>
                                { category?.poster_image ? ( <img className={`max-h-40 rounded-lg`} src={category?.poster_image}  alt={''} /> )
                                    : (<span>آیکون ندارد</span>)
                                }
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ViewCategoryDialog;
