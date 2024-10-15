import { useMedia } from 'react-use';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface ResponsiveModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ResponsiveModal = ({ children, onOpenChange, open }: ResponsiveModalProps) => {
    const isDesktop = useMedia("(min-width: 1024px)", true);

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogTitle>
                    <VisuallyHidden.Root className="hidden">Form</VisuallyHidden.Root>
                </DialogTitle>
                <DialogDescription>
                    <VisuallyHidden.Root className="hidden">Form</VisuallyHidden.Root>
                </DialogDescription>
                <DialogContent className='w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]'>
                    {children}
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div className='overflow-y-auto hide-scrollbar max-h-[85vh]'>
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default ResponsiveModal