import React, {useState} from "react";
import {CloseButton, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {CloseIcon, Details, ListIcon} from "@/icons";
import Button from "@/components/ui/button/Button";
import {toPersianDate, toPersianTime} from "@/utils/dateUtils";



function ViewCategoryDialog({category}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setIsOpen(true)}
                    className={`!rounded-full !p-4 !h-6 !w-6 !items-center !justify-center !flex !bg-cyan-500 hover:!bg-cyan-600  !shadow-[0px_2px_4px_#aaa]`}>
                <span><ListIcon className={` !p-0 !p-0 h-6 w-6 text-white`}/></span>
            </Button>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                transition
                className="fixed z-1000000  font-vazir top-0 inset-0 flex w-screen items-center justify-center bg-black/30 backdrop-blur-[3px] p-4 transition duration-300 ease-out data-[closed]:opacity-0"
            >
                <DialogPanel className="space-y-6 bg-white p-6 rounded-lg w-xl">
                    <DialogTitle className="font-bold flex gap-1  justify-between">
                        <div className="flex">
                            <ListIcon className={`w-6 h-6`}/><span>جزییات کامل دسته بندی</span>
                        </div>
                        <div className="flex">
                            <CloseButton className={`w-8`}><CloseIcon className={`fill-black w-6`} /></CloseButton>
                        </div>
                    </DialogTitle>
                    <div className={`grid grid-cols-3`}>
                        <div className={`flex flex-col col-span-2 gap-y-3`}>
                            <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-bold`}> <Details className={`w-6 h-6 ml-2`}/>عنوان :</span>
                                <span className={` text-nowrap`}>{category?.name_fa}</span>
                                </div>
                            </span>
                            <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-bold`}> <Details className={`w-6 h-6 ml-2`}/>نام انگلیسی :</span>
                                <span className={` text-nowrap`}>{category?.name_en}</span>
                                </div>
                            </span>
                            <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-bold`}> <Details className={`w-6 h-6 ml-2`}/>نوع :</span>
                                <span className={` text-nowrap`}>{category?.parent_id || 'دسته بندی اصلی'}</span>
                                </div>
                            </span>
                            <span className={`flex items-center`}>

                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-bold`}> <Details className={`w-6 h-6 ml-2`}/> تاریخ و ساعت :</span>
                                <span className={` text-nowrap`}>
                                    {toPersianDate(category?.created_at)} - {toPersianTime(category?.created_at)}
                                </span>
                                    </div>
                            </span>
                            <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-bold`}> <Details className={`w-6 h-6 ml-2`}/>توضیحات :</span>
                                <span className={` text-nowrap`}>{category?.description}</span>
                                </div>
                            </span>
                        </div>
                        <div className={`flex flex-col items-center col-span-1`}>
                            <div className={`flex flex-col gap-2`}>
                                <span className={`flex text-nowrap font-bold`}> <Details className={`w-6 h-6 ml-2`}/>آیکون :</span>
                                <span className={` text-nowrap`}>{category?.icon_name || 'آیکون ندارد'}</span>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </>
    );
};

export default ViewCategoryDialog;
