import type { Metadata } from "next";
import React from "react";
import UsersList from "@/components/admin-panel/UsersList";



export const metadata: Metadata = {
    title:
        "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
    description: "This is Next.js Home for TailAdmin Dashboard Template",
};

const Users: React.FC = () => {
    return (
        <UsersList />
    )
};

export default Users;
