import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import ProjectClient from "./client";

const ProjectPage = async () => {
    const user = await getCurrent();
    if (!user) redirect('/sign-in');

    return (
        <ProjectClient />
    )
}

export default ProjectPage