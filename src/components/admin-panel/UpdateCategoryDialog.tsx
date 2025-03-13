import React, {useState} from "react";
import {CloseButton, ComboboxButton, Dialog, DialogPanel, DialogTitle, Textarea} from "@headlessui/react";
import {CheckLineIcon, ChevronDownIcon, CloseIcon, PencilIcon} from "@/icons";
import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import CustomInput from "@/components/custom/CustomInput";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import clsx from "clsx";
import {useMutation} from "@tanstack/react-query";
import {useAdminPanelRoutes} from "@/app/api/admin-panel/routes";

interface Parent{
    value: string;
    text: string;
}


function UpdateCategoryDialog({category, _parents = []}) {
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
            <Button onClick={() => setIsOpen(true)}
                className={`!rounded-full !p-4 !h-6 !w-6 !items-center !justify-center !flex !bg-green-500  hover:!bg-green-700  !shadow-[0px_2px_4px_#aaa]`}>
                <span><PencilIcon className={` !p-0 !p-0 h-6 w-6 text-white`}/></span>
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
                            <PencilIcon className={`w-6 h-6`}/><span>ویرایش دسته بندی</span>
                        </div>
                        <div className="flex">
                            <CloseButton className={`w-8`}><CloseIcon className={`fill-black w-6`} /></CloseButton>
                        </div>
                    </DialogTitle>
                    <Form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <Label>نام انگلیسی</Label>
                                <CustomInput
                                    type="text"
                                    defaultValue={nameEn}
                                    error={false}
                                    floatingLabel={false}
                                    hint={""}
                                    onChange={(e) => setNameEn(e.target.value)}
                                    className={`rounded-xl font-outfit`}
                                />
                            </div>
                            <div>
                                <Label>نام فارسی</Label>
                                <CustomInput
                                    type="text"
                                    defaultValue={nameFa}
                                    error={false}
                                    hint={""}
                                    onChange={(e) => setNameFa(e.target.value)}
                                    className={`rounded-xl font-vazir`}
                                />
                            </div>
                            <div>
                                <Label>دسته بندی والد</Label>

                                {/*<Combobox value={selectedParent} onChange={() => setSelectedParent}*/}
                                {/*          onClose={() => setQuery('')}>*/}
                                {/*    <ComboboxInput*/}
                                {/*        aria-label="Assignee"*/}
                                {/*        displayValue={(parent) => parent.text}*/}
                                {/*        onChange={(event) => setQuery(event.target.value)}*/}
                                {/*    />*/}
                                {/*    <ComboboxOptions anchor="bottom" className="border empty:invisible">*/}
                                {/*        {filteredParents.map((parent) => (*/}
                                {/*            <ComboboxOption key={parent.value} value={parent}*/}
                                {/*                            className="data-[focus]:bg-blue-100">*/}
                                {/*                {parent.text}*/}
                                {/*            </ComboboxOption>*/}
                                {/*        ))}*/}
                                {/*    </ComboboxOptions>*/}
                                {/*</Combobox>*/}

                                <Combobox value={selectedParent} onChange={(value) => handleSelectedParent(value)}
                                          onClose={() => setQuery('')}>
                                    <div className="relative">
                                        <ComboboxInput
                                            className={clsx(
                                                'text-black h-11 w-full rounded-xl border appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3',
                                                'dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
                                                'bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10',
                                                'dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800'
                                            )}
                                            displayValue={(parent: Parent) => parent?.text}
                                            onChange={(event) => setQuery(event.target.value)}
                                        />
                                        <ComboboxButton className="group absolute inset-y-0 left-0 px-2.5 text-black">
                                            <ChevronDownIcon
                                                className="size-4 fill-white/60 group-data-[hover]:fill-white"/>
                                        </ComboboxButton>
                                    </div>

                                    <ComboboxOptions
                                        anchor="bottom"
                                        transition
                                        className={clsx(
                                            'w-[var(--input-width)] rounded-xl border border-black/5 p-1 bg-white [--anchor-gap:var(--spacing-1)] empty:invisible',
                                            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                                        )}
                                    >
                                        {parents && filteredParents.map((parent: Parent) => (
                                            <ComboboxOption
                                                key={parent.value}
                                                value={parent}
                                                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/10"
                                            >
                                                <CheckLineIcon
                                                    className="invisible w-4 h-4 fill-blue-800 group-data-[selected]:visible"/>
                                                <div className="text-sm/6 text-black">{parent.text}</div>
                                            </ComboboxOption>
                                        ))}
                                    </ComboboxOptions>
                                </Combobox>
                            </div>
                            <div>
                                <Label>نام آیکون</Label>
                                <CustomInput
                                    type="text"
                                    defaultValue={''}
                                    error={false}
                                    floatingLabel={false}
                                    hint={""}
                                    className={`rounded-xl font-vazir`}
                                />
                            </div>
                            <div className={`col-span-full`}>
                                <Label>توضیحات</Label>
                                <Textarea
                                    value={description}
                                    name="description"
                                    rows={6}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className={clsx(
                                        'text-black w-full rounded-xl border appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3',
                                        'dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
                                        'bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10',
                                        'dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800'
                                    )}
                                />
                            </div>
                            <div className="col-span-full">
                                <Button loading={mutateUpdateCategory.isPending} className="w-full" size="sm"
                                        startIcon={<CheckLineIcon/>}>
                                    تایید
                                </Button>
                            </div>
                        </div>
                    </Form>
                </DialogPanel>
            </Dialog>
        </>
    );
};

export default UpdateCategoryDialog;
