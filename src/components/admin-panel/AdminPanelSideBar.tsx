"use client";
import React, { useEffect, useRef, useState,useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import {Book, ChevronDown, Grid2X2Icon, TagIcon, TagsIcon, UsersIcon} from "lucide-react";

type NavItem = {
    name: string;
    icon: React.ReactNode;
    title?: string,
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const AdminPanelNavItems: NavItem[] = [
    {
        icon: <Grid2X2Icon />,
        name: "داشبورد",
        path: "/admin-panel",
    },
    {
        icon: <UsersIcon />,
        name: "لیست کاربران",
        path: "/admin-panel/users",
    },
    {
        icon: <TagIcon />,
        name: "مدیریت دسته بندی ها",
        path: "/admin-panel/categories",
    },
    {
        icon: <TagsIcon />,
        name: "مدیریت دسته بندی ها جدید",
        path: "/admin-panel/new-categories",
    },
    {
        icon: <Book />,
        name: "مدیریت کتاب ها",
        path: "/admin-panel/books",
    },
];


const AdminPanelSidebar: React.FC = () => {
    const router = useRouter()
    const { isExpanded, isMobileOpen } = useSidebar();
    const pathname = usePathname();

    const handleOnClick = (payload: NavItem) => {
        console.log(payload)
        if (payload?.path != null) {
            router.push(payload?.path)
        }
    }
    const renderAdminPanelNavItems = (
        navItems: NavItem[],
        menuType: "main" | "others"
    ) => (
        <>
            <ul className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow shadow-md flex flex-col duration-300 ease-linear no-scrollbar font-vazir text-sm">
                <div className={`rounded-2xl overflow-hidden`}>
                    {navItems.map((nav, index) => (

                        <li key={nav.name}>
                            {nav.subItems ? (
                                <button
                                    onClick={() => handleSubmenuToggle(index, menuType)}
                                    className={`custom-menu-item group  ${
                                        openSubmenu?.type === menuType && openSubmenu?.index === index
                                            ? "menu-item-active"
                                            : "menu-item-inactive"
                                    } cursor-pointer ${
                                        !isExpanded
                                            ? "lg:justify-center"
                                            : "lg:justify-start"
                                    }`}
                                >
              <span
                  className={` ${
                      openSubmenu?.type === menuType && openSubmenu?.index === index
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                  }`}
              >
                {nav.icon}
              </span>
                                    {(isExpanded || isMobileOpen) && (
                                        <span className={`menu-item-text`}>{nav.name}</span>
                                    )}
                                    {(isExpanded || isMobileOpen) && (
                                        <ChevronDown
                                            className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                                                openSubmenu?.type === menuType &&
                                                openSubmenu?.index === index
                                                    ? "rotate-180 text-brand-500"
                                                    : ""
                                            }`}
                                        />
                                    )}
                                </button>
                            ) : (
                                nav.path && (
                                    <div
                                        onClick={() => handleOnClick(nav)}
                                        className={`custom-menu-item group cursor-pointer ${
                                            isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                                        }`}
                                    >
                <span
                    className={`${
                        isActive(nav.path)
                            ? "menu-item-icon-active"
                            : "menu-item-icon-inactive"
                    }`}
                >
                  {nav.icon}
                </span>
                                        {(isExpanded || isMobileOpen) && (
                                            <span className={`menu-item-text`}>{nav.name}</span>
                                        )}
                                    </div>
                                )
                            )}
                            {nav.subItems && (isExpanded || isMobileOpen) && (
                                <div
                                    ref={(el) => {
                                        subMenuRefs.current[`${menuType}-${index}`] = el;
                                    }}
                                    className="overflow-hidden transition-all duration-300"
                                    style={{
                                        height:
                                            openSubmenu?.type === menuType && openSubmenu?.index === index
                                                ? `${subMenuHeight[`${menuType}-${index}`]}px`
                                                : "0px",
                                    }}
                                >
                                    <ul className="mt-2 space-y-1 ml-9">
                                        {nav.subItems.map((subItem) => (
                                            <li key={subItem.name}>
                                                <Link
                                                    href={subItem.path}
                                                    className={`menu-dropdown-item ${
                                                        isActive(subItem.path)
                                                            ? "menu-dropdown-item-active"
                                                            : "menu-dropdown-item-inactive"
                                                    }`}
                                                >
                                                    {subItem.name}
                                                    <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                            <span
                                className={`ml-auto ${
                                    isActive(subItem.path)
                                        ? "menu-dropdown-badge-active"
                                        : "menu-dropdown-badge-inactive"
                                } menu-dropdown-badge `}
                            >
                            new
                          </span>
                        )}
                                                        {subItem.pro && (
                                                            <span
                                                                className={`ml-auto ${
                                                                    isActive(subItem.path)
                                                                        ? "menu-dropdown-badge-active"
                                                                        : "menu-dropdown-badge-inactive"
                                                                } menu-dropdown-badge `}
                                                            >
                            pro
                          </span>
                                                        )}
                      </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </div>
            </ul>
        </>
    );


    const [openSubmenu, setOpenSubmenu] = useState<{
        type: "main" | "others";
        index: number;
    } | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
        {}
    );
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // const isActive = (path: string) => path === pathname;
    const isActive = useCallback((path: string) => path === pathname, [pathname]);

    useEffect(() => {
        // Check if the current path matches any submenu item
        let submenuMatched = false;
            AdminPanelNavItems.forEach((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubmenu({
                                type: "main",
                                index,
                            });
                            submenuMatched = true;
                        }
                    });
                }
            });

        // If no submenu item matches, close the open submenu
        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [pathname,isActive]);

    useEffect(() => {
        // Set the height of the submenu items when the submenu is opened
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (
                prevOpenSubmenu &&
                prevOpenSubmenu.type === menuType &&
                prevOpenSubmenu.index === index
            ) {
                return null;
            }
            return { type: menuType, index };
        });
    };

    return (
        <aside
            className={`fixed flex flex-col px-5 lg:pl-0 right-0 bg-white/[0.55] backdrop-blur-[5px] lg:bg-transparent dark:border-gray-800 text-gray-900 h-[calc(100vh_-_63px)] transition-all duration-300 ease-in-out z-45 
        ${
                isExpanded || isMobileOpen
                    ? "w-[290px]"
                    : "w-[90px]"
            }
        ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
        lg:translate-x-0`}
            onMouseEnter={() => !isExpanded}
        >
            <div className="flex flex-col duration-300 ease-linear no-scrollbar py-6 gap-6">
                <nav className="font-vazir">
                    <div className="flex flex-col">
                        <div>
                            {renderAdminPanelNavItems(AdminPanelNavItems, "main")}
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AdminPanelSidebar;
