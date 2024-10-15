"use client";

import UserButton from "@/features/auth/components/user-button"
import MobileSidebar from "./MobileSidebar"
import { usePathname } from "next/navigation"

const pathnames = {
    "tasks": {
        title: "My Tasks",
        description: "View all your tasks here"
    },
    "project": {
        title: "My Project",
        description: "View tasks of your project here"
    },
}

const defaultPath = {
    title: "Home",
    description: "Monitor all of your projects and tasks here"
}

const Navbar = () => {
    const pathname = usePathname();
    const pathnameParts = pathname.split("/");
    const pathnameKey = pathnameParts[3] as keyof typeof pathnames;

    const { title, description } = pathnames[pathnameKey] || defaultPath;

    return (
        <div className="pt-4 px-6 flex items-center justify-between">
            <div className="flex-col hidden lg:flex">
                <h1 className="text-2xl font-semibold">
                    {title}
                </h1>
                <p className="text-muted-foreground">
                    {description}
                </p>
            </div>
            <MobileSidebar />
            <UserButton />
        </div>
    )
}

export default Navbar