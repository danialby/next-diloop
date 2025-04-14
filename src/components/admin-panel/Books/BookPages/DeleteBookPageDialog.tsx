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
import { useMutation } from '@tanstack/react-query'
import { Loader2, Trash, XCircle, XIcon } from 'lucide-react'
import React, { useState } from 'react'

function DeleteBookPageDialog({ book_page, onDelete }) {
  // Determine input styles based on state (disabled, success, error)
  const { deleteBookPage } = useAdminPanelRoutes()

  const [isOpen, setIsOpen] = useState(false)

  const mutateDeleteBookPage = useMutation(
    {
      mutationFn: (id: number) => deleteBookPage({ id }),
      onSuccess: (response) => {
        // send code to number
        console.warn(response)
        onDelete()
        setIsOpen(false)
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
            className="absolute -left-7 top-0 text-rose-400 z-10 transition-all group-hover:left-0"
            variant="link"
            size="sm"
            onClick={handleOpen}
          >
            <XCircle className="w-4 h-4" />
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
                  آیا از حذف صفحه
                </span>
                <span className="font-bold">
                  {book_page?.name_fa}
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
                  onClick={() => mutateDeleteBookPage.mutate(book_page?.id)}
                  variant="ghost"
                  size="sm"
                  className="hover:!bg-rose-100 !text-rose-600"
                >
                  بله، حذف شود
                  {mutateDeleteBookPage.isPending && <Loader2 className="animate-spin" />}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}

export default DeleteBookPageDialog
