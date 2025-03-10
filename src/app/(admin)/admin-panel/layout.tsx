"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import React from "react";
import AdminPanelSidebar from "@/components/admin-panel/AdminPanelSideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "mr-0"
    : isExpanded
    ? "lg:mr-[290px]"
    : "lg:mr-[70px]";


  return (
    <div className="relative min-h-screen">
        <AppHeader />
      {/* Sidebar and Backdrop */}
      <AdminPanelSidebar />
      {/* Main Content Area */}
      <div
        className={`transition-all block  duration-300 ease-in-out relative ${mainContentMargin}`}
      >
        {/* Page Content */}
        <div className={`p-4 mx-auto md:p-6 left-0`}>{children}</div>
      </div>
    </div>
  );
}
