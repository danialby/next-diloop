import type { BookResponse, Category } from '@/types/types'
import { UpdateBookForm } from '@/components/admin-panel/Books/UpdateBook/UpdateBookForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ListXIcon, Pencil, XIcon } from 'lucide-react'
import React, { useState } from 'react'

interface UpdateBookDialogProps {
  sub_category?: Category | undefined
  category?: Category | undefined
  book?: BookResponse | undefined
}

function UpdateBookDialog({ sub_category, book }: UpdateBookDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
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
            className="!rounded-full !bg-green-500 hover:!bg-green-600 dark:text-white"
          >
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogContent className="sm:max-w-[680px] font-vazir">
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center gap-2 font-bold -mt-2 mb-2 justify-between">
                  <div className="flex items-center gap-1.5">
                    <ListXIcon className="w-6 h-6" />
                    <span> ویرایش کتابچه</span>
                  </div>
                  <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                    <XIcon />
                  </Button>
                </div>

              </DialogTitle>
            </DialogHeader>
            <UpdateBookForm closeDialog={() => setIsOpen(false)} sub_category={sub_category} book={book} />
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
};

export default UpdateBookDialog
