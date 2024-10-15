import LayoutNavbar from "@/components/layout-navbar";

interface CreateLayoutProps {
    children: React.ReactNode;
};

const CreateLayout = ({ children }: CreateLayoutProps) => {
    return (
        <main className='bg-neutral-100 min-h-screen'>
            <div className="mx-auto max-w-screen-2xl p-4">
                <LayoutNavbar />
                <div className="flex flex-col items-center justify-center py-4">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default CreateLayout