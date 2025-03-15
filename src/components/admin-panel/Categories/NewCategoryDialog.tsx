import React, {useState} from "react";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogHeader,
    DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {Plus, XIcon, ListXIcon} from "lucide-react";
import {NewCategoryForm} from "@/components/admin-panel/Categories/NewCategoryForm";


function NewCategoryDialog() {

    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Dialog open={isOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => setIsOpen(true)}
                            className={`!rounded-full !p-3 !shadow-md shadow-gray-400`}>
                            <Plus />                        ایجاد دسته بندی جدید
                    </Button>
                </DialogTrigger>
                <DialogPortal>
                    <DialogOverlay className="bg-white/50 backdrop-blur-[10px]">
                        <DialogContent className="sm:max-w-[680px] font-vazir">
                            <DialogHeader>
                                <DialogTitle>
                                    <div className="flex items-center gap-2 font-bold -mt-2 mb-2 justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <ListXIcon className={`w-6 h-6`}/><span> ویرایش دسته بندی</span>
                                        </div>
                                        <Button type="button" variant="ghost" onClick={()=>setIsOpen(false)}>
                                            <XIcon />
                                        </Button>
                                    </div>

                                </DialogTitle>
                            </DialogHeader>
                            <NewCategoryForm closeDialog={() => setIsOpen(false)} />
                        </DialogContent>
                    </DialogOverlay>
                </DialogPortal>
            </Dialog>
        </>
    );
}

export default NewCategoryDialog;
