import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface JoinAvatarProps {
    image?: string;
    name: string;
    className?: string;
}

const JoinAvatar = ({ name, className, image }: JoinAvatarProps) => {
    if (image) {
        return (
            <div className={cn(
                "size-14 relative rounded-md overflow-hidden",
                className
            )}>
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>
        )
    }

    return (
        <Avatar className={cn(
            "size-14 rounded-md",
            className
        )}>
            <AvatarFallback className="text-white bg-blue-600 font-semibold text-lg uppercase rounded-md">
                {name.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}

export default JoinAvatar