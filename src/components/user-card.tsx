import DottedSeparator from "./dotted-separator"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { useCurrent } from "@/features/auth/api/use-current"
import PageLoader from "./PageLoader"
import PageError from "./page-error"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Calendar, CircleCheckBigIcon } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { format } from "date-fns"

const UserCard = () => {
    const { data: user, isLoading } = useCurrent();

    if (isLoading) {
        return <PageLoader />
    }

    if (!user) {
        return <PageError message="User not found" />
    }

    const { name, email, emailVerification, registration } = user;
    const avatarFallback = name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase() ?? "U";

    return (
        <Card className="mt-20 w-full h-full border-none shadow-none">
            <CardHeader className="flex items-center p-7">
                <CardTitle className="text-xl font-bold">
                    User Profile
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7 flex flex-col items-center justify-center">
                <div className="relative">
                    <Avatar className='size-24 hover:opacity-75 transition border border-neutral-300'>
                        <AvatarFallback className='bg-neutral-200 text-5xl font-medium text-neutral-500 flex items-center justify-center'>
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    {emailVerification && (
                        <div className="absolute top-0 right-2">
                            <CircleCheckBigIcon className="size-6 text-green-600" />
                        </div>
                    )}
                </div>
                <h2 className="font-semibold text-xl mt-2">{name}</h2>
                <p className="text-muted-foreground text-sm">{email}</p>
                <span className="flex items-center text-sm text-zinc-400">
                    <Calendar className="size-4 mr-2" />
                    {format(registration, 'dd-MM-yyyy')}
                </span>
                <Button
                    asChild
                    className="mt-8 w-full"
                    variant={"outline"}
                >
                    <Link
                        href={"/"}
                    >
                        Dashboard
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default UserCard