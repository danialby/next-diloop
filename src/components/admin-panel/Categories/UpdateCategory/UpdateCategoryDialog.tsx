import React, {useState} from "react";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogPortal,
    DialogHeader,
    DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {Pencil, XIcon, ListXIcon} from "lucide-react";
import {UpdateCategoryForm} from "@/components/admin-panel/Categories/UpdateCategory/UpdateCategoryForm";


function TestCategoryDialog({category}) {

    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Dialog open={isOpen}>
                <DialogTrigger asChild>
                    <Button size={'icon'} onClick={() => setIsOpen(true)}
                            className={`!rounded-full !bg-green-500 hover:!bg-green-600`}>
                        <Pencil />
                    </Button>
                </DialogTrigger>
                <DialogPortal>
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
                            <UpdateCategoryForm category={category} closeDialog={() => setIsOpen(false)} />
                        </DialogContent>
                </DialogPortal>
            </Dialog>
        </>
    );
};

export default TestCategoryDialog;
