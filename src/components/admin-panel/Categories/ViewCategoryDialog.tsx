import React, {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {ListIcon} from "@/icons";
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
    XIcon
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
                <DialogContent className="sm:max-w-[425px] font-vazir">
                    <DialogHeader>
                        <DialogHeader>
                            <DialogTitle>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <ListIcon className={`w-6 h-6`}/><span> جزییات دسته بندی</span>
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
                            <div className={`flex flex-col gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <Aperture className={`w-6 h-6 ml-2`}/>آیکون :</span>
                                <span className={` text-nowrap`}>{category?.icon_name || 'آیکون ندارد'}</span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ViewCategoryDialog;
