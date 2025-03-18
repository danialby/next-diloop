import {useMutation} from "@tanstack/react-query";
import {useAdminPanelRoutes} from "@/app/api/admin-panel/routes";


import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogPortal,
    DialogHeader,
    DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog"
import {Loader2, Trash, XIcon} from "lucide-react";
import React, {useState} from "react";
import useAdminStore from "@/store/adminStore";


function DeleteCategoryDialog({category}) {
    // Determine input styles based on state (disabled, success, error)
    const { deleteCategory } = useAdminPanelRoutes();
    const { deleteStoreCategory } = useAdminStore()

    const [isOpen, setIsOpen] = useState(false)


    const mutateDeleteCategory = useMutation(
        {
            mutationFn: (id: number) => deleteCategory({id}),
            onSuccess: (response ) => {
                // send code to number
                console.log(response)
                setIsOpen(false)
                deleteStoreCategory(category?.id)
            },
            onError: (error) => {
                console.log(error)
            }
        })

    return (
        <>
            <Dialog open={isOpen}>
                <DialogTrigger asChild>
                    <Button size={'icon'} onClick={() => setIsOpen(true)}
                            className={`!rounded-full !bg-rose-400 hover:!bg-rose-500`}>
                        <Trash />
                    </Button>
                </DialogTrigger>
                <DialogPortal>
                        <DialogContent className="sm:max-w-[680px] font-vazir">
                            <DialogHeader>
                                <DialogTitle>
                                    <div className="flex items-center justify-end">
                                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                                            <XIcon/>
                                        </Button>
                                    </div>
                                </DialogTitle>
                            </DialogHeader>
                            <div className={`flex gap-3 items-center`}>
                                <Button size={'icon'}
                                        className={`!rounded-full !bg-rose-400`}>
                                    <Trash/>
                                </Button>
                                <div className={`flex gap-1`}>
                                <span className={`font-light`}>
                                        آیا از حذف دسته بندی
                                                                            </span>
                                <span className={`font-bold`}>
                                                    {category?.name_fa}
                                                </span>
                                <span className={`font-light`}>
                                        اطمینان دارید؟
                                </span>
                                </div>

                            </div>
                            <DialogFooter>
                            <div className="grid col-reverse grid-cols-4 gap-2 justify-end w-full text-left">
                                    <span></span>
                                    <span></span>
                                    <Button onClick={() => setIsOpen(false)}
                                            variant={'ghost'}
                                            className="!text-black" size="sm">
                                        انصراف
                                    </Button>
                                    <Button onClick={() => mutateDeleteCategory.mutate(category?.id)}
                                            variant={'ghost'} size="sm" className={`hover:!bg-rose-100 !text-rose-600`}>
                                        بله، حذف شود
                                        {mutateDeleteCategory.isPending && <Loader2 className="animate-spin" />}
                                    </Button>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                </DialogPortal>
            </Dialog>
        </>
    );
}

export default DeleteCategoryDialog;
