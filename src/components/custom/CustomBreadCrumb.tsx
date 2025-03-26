import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import React from "react";

interface CustomBreadCrumbProps {
    data: object;
    separator: React.ReactNode | string | undefined;
}

export default function CustomBreadCrumb({data, separator}: CustomBreadCrumbProps) {
    return (
        <Breadcrumb className={`items-center flex mb-0`}>
            <BreadcrumbList>
                {
                    data.map((item, index) =>
                        <>
                        <BreadcrumbItem className={`!text-xs`}>
                            {item?.title}
                        </BreadcrumbItem>
                        { index < data?.length - 1 &&
                            <BreadcrumbSeparator>
                            { separator }
                            </BreadcrumbSeparator>
                        }
                        </>
                    )
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}