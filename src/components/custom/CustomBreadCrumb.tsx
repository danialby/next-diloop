import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import React from 'react'

interface CustomBreadCrumbProps {
  data: []
  separator: React.ReactNode | string | undefined
}

export default function CustomBreadCrumb({ data, separator }: CustomBreadCrumbProps) {
  return (
    <Breadcrumb className="items-center flex mb-0">
      <BreadcrumbList>
        {
          data?.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <BreadcrumbItem>
                {item?.['title']}
              </BreadcrumbItem>
              { index < data?.length - 1
                && (
                  <BreadcrumbSeparator>
                    { separator }
                  </BreadcrumbSeparator>
                )}
            </div>
          ),
          )
        }
      </BreadcrumbList>
    </Breadcrumb>
  )
}
