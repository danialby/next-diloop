'use client'
import { Input } from '@/components/ui/input'
import { ImagePlus, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageUploaderProps {
  image?: File | string
  onSelectImage: (image: File | string) => void
}

export function ImageUploader({ onSelectImage, image }: ImageUploaderProps) {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>('')
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader()
      try {
        reader.onload = () => setPreview(reader.result)
        reader.readAsDataURL(acceptedFiles[0])
        onSelectImage(acceptedFiles[0])
      }
      catch {
        setPreview(null)
      }
    },
    [onSelectImage],
  )
  const maxSize = 2000000
  const { getRootProps, getInputProps, isDragActive, fileRejections }
        = useDropzone({
          onDrop,
          maxFiles: 1,
          maxSize,
          accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
        })

  function clearImage(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    e.stopPropagation()
    setPreview(null)
    onSelectImage('')
  }
  return (
    <div className="flex flex-row items-center justify-start gap-3">
      <div
        {...getRootProps()}
        className="relative flex cursor-pointer items-center justify-center gap-y-2 rounded-lg p-0.5 shadow-md shadow-foreground/20"
      >
        {(preview || image) && (
          <Image
            src={preview as string || image as string}
            alt="Uploaded image"
            width={100}
            height={100}
            className="max-h-[150px] rounded-lg"
          />
        )}
        {(preview || image)
          && (
            <XCircleIcon
              className="bg-white rounded-full text-rose-500 absolute top-2 left-1"
              onClick={clearImage}
            />
          )}
        {/* {(image && !preview) && ( */}
        {/*    <img */}
        {/*        src={image as string} */}
        {/*        alt="Uploaded image" */}
        {/*        className="max-h-[150px] rounded-lg" */}
        {/*    /> */}
        {/* )} */}
        {/* {(image && preview) && ( */}
        {/*    <img */}
        {/*        src={preview as string} */}
        {/*        alt="Uploaded image" */}
        {/*        className="max-h-[200px] rounded-lg" */}
        {/*    /> */}
        {/* )} */}
        {(!image && !preview)
          && (
            <ImagePlus
              className={`size-20 ${preview ? 'hidden' : 'block'}`}
            />
          )}
        <Input {...getInputProps()} type="file" />
        {isDragActive
          && <p>تصویر را رها کنید</p>}
      </div>
      {fileRejections.length !== 0 && (
        <p className="text-xs bg-gray-200 px-3 py-1 rounded-lg">
          - فایل باید فرمت
          <span className="text-rose-400 px-1 text-sm font-outfit"> JPG</span>
          ,
          <span className="text-rose-400 px-1 text-sm font-outfit"> PNG</span>
          یا
          <span className="text-rose-400 px-1 text-sm font-outfit"> JPEG</span>
          داشته
          باشد
          <br />
          - سایز فایل نباید بیشتر از
          <span className="text-rose-400 px-1 text-sm font-outfit">
            {' '}
            { maxSize / 1000000 }
            MB
          </span>
          باشد
        </p>
      )}
    </div>
  )
}
