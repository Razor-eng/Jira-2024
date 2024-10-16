import { getCurrent } from "@/features/auth/queries";
import UserPageClient from "./client"
import { redirect } from "next/navigation";

const UserPage = async () => {
    const user = await getCurrent();
    if (!user) redirect('/sign-in');

    return (
        <UserPageClient />
    )
}

export default UserPage