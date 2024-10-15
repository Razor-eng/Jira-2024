import { Loader } from "lucide-react"

const PageLoader = () => {
    return (
        <div className='h-96 flex items-center justify-center'>
            <Loader className='size-6 animate-spin text-muted-foreground' />
        </div>
    )
}

export default PageLoader