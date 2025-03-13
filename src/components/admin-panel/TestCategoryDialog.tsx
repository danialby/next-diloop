import React, {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {useAdminPanelRoutes} from "@/app/api/admin-panel/routes";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Pencil, ReceiptText} from "lucide-react";
import {ListIcon} from "@/icons";
import {UpdateCategoryForm} from "@/components/admin-panel/UpdateCategoryForm";



interface Parent{
    value: string;
    text: string;
}


function TestCategoryDialog({category, _parents = []}) {
    // Determine input styles based on state (disabled, success, error)
    const { updateNewCategory } = useAdminPanelRoutes();


    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')


    const [nameEn, setNameEn] = useState(category?.name_en)
    const [nameFa, setNameFa] = useState(category?.name_fa)
    const [description, setDescription] = useState(category?.description)
    const [is_active] = useState(category?.is_active)
    // const [iconName, setIconName] = useState('')
    const [parents] = useState(_parents)
    const [selectedParent, setSelectedParent] = useState(_parents[category?.parent_id || 1])




    const handleSelectedParent = (value: Parent) => {
        console.log(value)
        setSelectedParent(value)
    }

    const filteredParents =
        query === ''
            ? parents
            : parents.filter((parent: Parent) => {
                return parent.text.toLowerCase().includes(query.toLowerCase())
            })



    const mutateUpdateCategory = useMutation(
        {
            mutationFn: () => updateNewCategory(
                {
                    id: category?.id,
                    name_en:nameEn,
                    name_fa:nameFa,
                    description,
                    is_active,
                    parent_id: selectedParent?.id,
                    tags: null,
                    poster_image:null
                }),
            onSuccess: (response ) => {
                // send code to number
                console.log(response)
                setIsOpen(false)
            },
            onError: (error) => {
                console.log(error)
            }
        })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutateUpdateCategory.mutate()
        console.log("Form submitted:");
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size={'icon'}
                            className={`!rounded-full !bg-cyan-500 hover:!bg-cyan-600`}>
                        <Pencil />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[680px] font-vazir">
                    <DialogHeader>
                        <DialogHeader>
                            <DialogTitle>
                                <div className="flex items-center gap-2 font-bold -mt-2 mb-2 justify-center">
                                    <ListIcon className={`w-6 h-6`}/><span> ویرایش دسته بندی</span>
                                </div>
                            </DialogTitle>
                        </DialogHeader>
                    </DialogHeader>
                   <UpdateCategoryForm />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TestCategoryDialog;
