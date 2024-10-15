import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DottedSeparator from './dotted-separator'
import Navigation from './Navigation'
import WorkspaceSwitcher from './WorkspaceSwitcher'
import Projects from './Projects'

const Sidebar = () => {
    return (
        <div className='h-full bg-neutral-100 p-4 w-full'>
            <Link href={'/'}>
                <Image src={'/logo.svg'} alt='logo' width={80} height={56} />
            </Link>
            <DottedSeparator className='my-4' />
            <WorkspaceSwitcher />
            <DottedSeparator className='my-4' />
            <Navigation />
            <DottedSeparator className='my-4' />
            <Projects />
        </div>
    )
}

export default Sidebar