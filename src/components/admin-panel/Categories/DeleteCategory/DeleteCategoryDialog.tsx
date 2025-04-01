import { useAdminPanelRoutes } from '@/app/api/admin-panel/routes'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import useAdminStore from '@/store/adminStore'
import { useMutation } from '@tanstack/react-query'
import { Loader2, Trash, XIcon } from 'lucide-react'
import React, { useState } from 'react'

function DeleteCategoryDialog({ category }) {
  // Determine input styles based on state (disabled, success, error)
  const { deleteCategory } = useAdminPanelRoutes()
  const { deleteStoreCategory } = useAdminStore()

  const [isOpen, setIsOpen] = useState(false)

  const mutateDeleteCategory = useMutation(
    {
      mutationFn: (id: number) => deleteCategory({ id }),
      onSuccess: (response) => {
        // send code to number
        console.warn(response)
        setIsOpen(false)
        deleteStoreCategory(category?.id).then(r =>
        {
          console.warn(r)
        })
      },
      onError: (error) => {
        console.warn(error)
      },
    },
  )
  function handleOpen(e) {
    e.stopPropagation()
    setIsOpen(true)
  }
  return (
    <>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={handleOpen}
            size="icon"
            className="!rounded-full !bg-rose-400 hover:!bg-rose-500 dark:text-white"
          >
            <Trash />
          </Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogContent className="sm:max-w-[680px] font-vazir">
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center justify-end">
                  <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                    <XIcon />
                  </Button>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="flex gap-3 items-center">
              <Button
                size="icon"
                className="!rounded-full !bg-rose-400"
              >
                <Trash />
              </Button>
              <div className="flex gap-1">
                <span className="font-light">
                  آیا از حذف دسته بندی
                </span>
                <span className="font-bold">
                  {category?.name_fa}
                </span>
                <span className="font-light">
                  اطمینان دارید؟
                </span>
              </div>

            </div>
            <DialogFooter>
              <div className="grid col-reverse grid-cols-4 gap-2 justify-end w-full text-left">
                <span></span>
                <span></span>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  className="!text-black"
                  size="sm"
                >
                  انصراف
                </Button>
                <Button
                  onClick={() => mutateDeleteCategory.mutate(category?.id)}
                  variant="ghost"
                  size="sm"
                  className="hover:!bg-rose-100 !text-rose-600"
                >
                  بله، حذف شود
                  {mutateDeleteCategory.isPending && <Loader2 className="animate-spin" />}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}

export default DeleteCategoryDialog
