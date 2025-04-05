import type { Category } from '@/types'

import { InsertBookForm } from '@/components/admin-panel/Books/InsertBook/InsertBookForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { BookPlus, Plus, XIcon } from 'lucide-react'
import React, { useState } from 'react'

interface BooksDialogProps {
  subcategory?: Category
  button_size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined
}

const InsertBookDialog: React.FC<BooksDialogProps> = ({ subcategory, button_size }) => {
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
            size={button_size}
            onClick={handleOpen}
            className="!rounded-full !bg-blue-500 hover:!bg-blue-600 dark:text-white"
          >
            <BookPlus />
            { button_size !== 'icon' && 'افزودن کتابچه' }
          </Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="bg-white/50 backdrop-blur-[10px]">
            <DialogContent className="w-full !max-w-2xl font-vazir">
              <DialogHeader>
                <DialogTitle>
                  <div className="flex items-center gap-2  text-sm -mt-2 mb-2 justify-between">
                    <div className="flex items-center gap-1.5">
                      <Plus className="w-6 h-6" />
                      <span> افزودن کتابچه</span>
                      {subcategory
                        && (
                          <>
                            <span className="text-base">
                              به
                              {' '}
                            </span>
                            <span className="text-base font-bold text-rose-500">
                              {subcategory?.name_fa}
                            </span>
                          </>
                        )}
                    </div>
                    <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                      <XIcon />
                    </Button>
                  </div>

                </DialogTitle>
              </DialogHeader>
              <InsertBookForm closeDialog={() => setIsOpen(false)} sub_category={subcategory} />
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </>
  )
}

export default InsertBookDialog
