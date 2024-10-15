import DottedSeparator from '@/components/dotted-separator';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { getCurrent } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

interface DashboardProviderProps {
    children: React.ReactNode;
}

const DashboardProvider = async ({ children }: DashboardProviderProps) => {
    const user = await getCurrent();
    if (!user) redirect('/sign-in');

    return (
        <div className="flex w-full h-full">
            <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
                <Sidebar />
            </div>
            <div className="lg:pl-[264px] w-full">
                <div className="mx-auto max-w-screen-2xl h-full">
                    <Navbar />
                    <DottedSeparator className='mt-2' />
                    <main className="h-full py-8 px-6 flex flex-col">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default DashboardProvider