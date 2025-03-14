import type { Metadata } from "next";
import React from "react";
import CategoriesPanel from "@/components/admin-panel/Categories/CategoriesPanel";



export const metadata: Metadata = {
    title:
        "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
    description: "This is Next.js Home for TailAdmin Dashboard Template",
};

const Categories: React.FC = () => {
    return (
        <div className={`h-full`}>
        <CategoriesPanel />
        </div>
    )
};

export default Categories;
