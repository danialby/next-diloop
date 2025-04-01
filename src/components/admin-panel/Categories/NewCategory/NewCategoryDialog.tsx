import { NewCategoryForm } from '@/components/admin-panel/Categories/NewCategory/NewCategoryForm'

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
import useAdminStore from '@/store/adminStore'
import { Plus, XIcon } from 'lucide-react'
import React, { useState } from 'react'

function NewCategoryDialog() {
  const { selectedMainCategory } = useAdminStore()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            className="!rounded-full !p-1 !px-2 !h-7 !shadow-md transition transition-all shadow-gray-400 bg-cyan-700 hover:bg-cyan-600 !text-white text-xs"
          >
            <Plus />
            {' '}
            ایجاد دسته بندی جدید در
            <span className="font-bold text-orange-300">{selectedMainCategory?.title}</span>
          </Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="bg-white/50 backdrop-blur-[10px]">
            <DialogContent className="sm:max-w-[680px] font-vazir">
              <DialogHeader>
                <DialogTitle>
                  <div className="flex items-center gap-2 font-bold -mt-2 mb-2 justify-between">
                    <div className="flex items-center gap-1.5">
                      <Plus />
                      {' '}
                      ایجاد دسته بندی جدید در
                      <span className="font-bold text-orange-300">{selectedMainCategory?.title}</span>
                    </div>
                    <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                      <XIcon />
                    </Button>
                  </div>

                </DialogTitle>
              </DialogHeader>
              <NewCategoryForm closeDialog={() => setIsOpen(false)} />
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </>
  )
}

export default NewCategoryDialog
