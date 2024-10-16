import { AlertTriangle } from 'lucide-react'

interface PageErrorProps {
    message?: string;
}

const PageError = ({ message = "Something went wrong" }: PageErrorProps) => {
    return (
        <div className='mt-48 flex flex-col items-center justify-center'>
            <AlertTriangle className='size-6 text-muted-foreground mb-2' />
            <p className="text-sm text-muted-foreground">
                {message}
            </p>
        </div>
    )
}

export default PageError