"use client";

import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant={"outline"} className='lg:hidden'>
                    <MenuIcon className='size-5 text-neutral-500' />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className='p-0'>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar