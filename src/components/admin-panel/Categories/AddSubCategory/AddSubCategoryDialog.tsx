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
import {Grid2X2Plus, Plus, XIcon} from "lucide-react";
import {AddSubCategoryForm} from "@/components/admin-panel/Categories/AddSubCategory/AddSubCategoryForm";


function AddSubCategoryDialog({category}) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Dialog open={isOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => setIsOpen(true)} size={`icon`} className={`rounded-full`}>
                        <Grid2X2Plus />
                    </Button>
                </DialogTrigger>
                <DialogPortal>
                    <DialogOverlay className="bg-white/50 backdrop-blur-[10px]">
                        <DialogContent className="sm:max-w-[680px] font-vazir">
                            <DialogHeader>
                                <DialogTitle>
                                    <div className="flex items-center gap-2  text-sm -mt-2 mb-2 justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <Plus className={`w-6 h-6`}/>
                                            <span> افزودن زیرشاخه به دستبندی</span><span className={`text-base font-bold text-rose-500`}>{category?.name_fa}</span>
                                        </div>
                                        <Button type="button" variant="ghost" onClick={()=>setIsOpen(false)}>
                                            <XIcon />
                                        </Button>
                                    </div>

                                </DialogTitle>
                            </DialogHeader>
                            <AddSubCategoryForm closeDialog={() => setIsOpen(false)} category={category}/>
                        </DialogContent>
                    </DialogOverlay>
                </DialogPortal>
            </Dialog>
        </>
    );
}

export default AddSubCategoryDialog;
