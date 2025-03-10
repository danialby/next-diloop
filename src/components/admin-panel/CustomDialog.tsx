import React, {FC, useState} from "react";
import {CloseButton, ComboboxButton, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {CheckLineIcon, ChevronDownIcon, CloseIcon, PlusIcon} from "@/icons";
import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import CustomInput from "@/components/custom/CustomInput";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import clsx from "clsx";


function CustomDialog() {
    // Determine input styles based on state (disabled, success, error)
    const parents = [
        { value: "1", text: "همه" },
        { value: "2", text: "کسب و کار بزرگ" },
        { value: "3", text: "متوسط" },
        { value: "4", text: "کوچک" },
        { value: "5", text: "خانگی" },
    ];

  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedParent, setSelectedParent] = useState(parents[0])

    const handleSelectedParent = (value) => {
        console.log(value)
      setSelectedParent(value)
    }

    const filteredParents =
        query === ''
            ? parents
            : parents.filter((parent) => {
                return parent.text.toLowerCase().includes(query.toLowerCase())
            })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(e.target.value)
        console.log("Form submitted:");
    };

    return (
        <>
        <Button startIcon={<PlusIcon className={`w-5`}/>} onClick={() => setIsOpen(true)}
                className={`!rounded-full !p-3 !shadow-md shadow-gray-400`}>
            ایجاد دسته بندی جدید
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
                        <PlusIcon className={`w-6 h-6`}/><span>ایجاد دسته بندی جدید</span>
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
                                defaultValue={''}
                                error={false}
                                floatingLabel={false}
                                hint={""}
                                className={`rounded-xl font-outfit`}
                            />
                        </div>
                        <div>
                            <Label>نام فارسی</Label>
                            <CustomInput
                                type="text"
                                defaultValue={''}
                                error={false}
                                hint={""}
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
                                            displayValue={(parent) => parent?.text}
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
                                        {filteredParents.map((parent) => (
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
                        <div className="col-span-full">
                            <Button type="submit" onClick={() => setIsOpen(false)} className="w-full" size="sm" startIcon={<CheckLineIcon/>}>
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

export default CustomDialog;
