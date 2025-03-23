import type { Metadata } from "next";
import React from "react";
import CategoriesPanel from "@/components/admin-panel/Categories/CategoriesPanel";
import NewCategoriesPanel from "@/components/admin-panel/Categories/NewCategoriesPanel";



export const metadata: Metadata = {
    title:
        "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
    description: "This is Next.js Home for TailAdmin Dashboard Template",
};

const NewCategories: React.FC = () => {
    return (
        <div className={`h-full`}>
            <NewCategoriesPanel />
        </div>
    )
};

export default NewCategories;
