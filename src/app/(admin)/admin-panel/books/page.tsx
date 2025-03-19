import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title:
        "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
    description: "This is Next.js Home for TailAdmin Dashboard Template",
};

const Books: React.FC = () => {
    return (
        <div className={`h-full`}>
            books
        </div>
    )
};

export default Books;
