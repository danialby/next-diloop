import React, {useState} from "react";
import {CloseButton, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {CheckLineIcon, CloseIcon, TrashBinIcon} from "@/icons";
import Button from "@/components/ui/button/Button";
import {useMutation} from "@tanstack/react-query";
import {useAdminPanelRoutes} from "@/app/api/admin-panel/routes";

function DeleteCategoryDialog({category}) {
    // Determine input styles based on state (disabled, success, error)
    const { deleteNewCategory } = useAdminPanelRoutes();


    const [isOpen, setIsOpen] = useState(false)


    const mutateDeleteCategory = useMutation(
        {
            mutationFn: (id: number) => deleteNewCategory({id}),
            onSuccess: (response ) => {
                // send code to number
                console.log(response)
                setIsOpen(false)
            },
            onError: (error) => {
                console.log(error)
            }
        })

    return (
        <>
            <Button onClick={() => setIsOpen(true)}
                className={`!rounded-full !p-4 !h-6 !w-6 !items-center !justify-center !flex !bg-rose-400 hover:!bg-rose-500  !shadow-[0px_2px_4px_#aaa]`}>
                <span><TrashBinIcon className={` !p-0 h-6 w-6 text-white`}/></span>
            </Button>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                transition
                className="fixed z-1000000  font-vazir top-0 inset-0 flex w-screen items-center justify-center bg-black/30 backdrop-blur-[3px] p-4 transition duration-300 ease-out data-[closed]:opacity-0"
            >
                <DialogPanel className="space-y-6 bg-white p-6 rounded-lg w-xl">
                    <DialogTitle className="font-bold flex gap-1  justify-between">
                        <div className="flex gap-2 items-center">
                            <div
                                    className={`!rounded-full !p-4 !h-6 !w-6 !items-center !justify-center !flex !bg-rose-400 hover:!bg-rose-500  !shadow-[0px_2px_4px_#aaa]`}>
                                <span><TrashBinIcon className={` !p-0 h-6 w-6 text-white`}/></span>
                            </div>
                            <span className={`font-light`}>آیا از حذف دسته بندی
                            <span className={`font-bold`}> { category?.name_fa }</span><br />
                                اطمینان دارید؟
                        </span>
                        </div>
                        <div className="flex">
                            <CloseButton className={`w-8`}><CloseIcon className={`fill-black w-6`} /></CloseButton>
                        </div>
                    </DialogTitle>
                            <div className="grid col-reverse grid-cols-4 gap-2 justify-end w-full text-left">
                                <span></span>
                                <span></span>
                                <Button onClick={() => setIsOpen(false)} className="w-full !bg-transparent !p-0 !text-black" size="sm"
                                        startIcon={<CheckLineIcon/>}>
                                    انصراف
                                </Button>
                                <Button onClick={() => mutateDeleteCategory.mutate(category?.id)} loading={mutateDeleteCategory.isPending} className="w-full !bg-transparent !p-0 !text-rose-500" size="sm"
                                        startIcon={<CheckLineIcon/>}>
                                    بله، حذف شود
                                </Button>
                            </div>
                </DialogPanel>
            </Dialog>
        </>
    );
};

export default DeleteCategoryDialog;
