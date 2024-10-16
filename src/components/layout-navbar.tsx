"use client";
import UserButton from "@/features/auth/components/user-button"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import Image from "next/image"
import Link from "next/link"

const LayoutNavbar = () => {
    const workspaceId = useWorkspaceId();
    const path = workspaceId ? `/workspace/${workspaceId}` : "/";

    return (
        <nav className="flex justify-between items-center h-[73px]">
            <Link href={path}>
                <Image src={'/logo.svg'} alt='logo' width={80} height={56} />
            </Link>
            <UserButton />
        </nav>
    )
}

export default LayoutNavbar