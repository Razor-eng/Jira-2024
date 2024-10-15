import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import DottedSeparator from "./dotted-separator";
import Link from "next/link";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Card, CardContent } from "./ui/card";
import { Project } from "@/features/projects/types";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import ProjectAvatar from "@/features/projects/components/project-avatar";

interface ProjectListProps {
    projects: Project[];
    total: number;
}

export const ProjectList = ({ projects, total }: ProjectListProps) => {
    const workspaceId = useWorkspaceId();
    const { open: createProject } = useCreateProjectModal();

    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                        Projects ({total})
                    </p>
                    <Button
                        variant={"secondary"}
                        size={"icon"}
                        onClick={createProject}
                    >
                        <PlusIcon className=" size-4 text-neutral-400" />
                    </Button>
                </div>
                <DottedSeparator className="my-4" />
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {projects.map((project) => (
                        <li key={project.$id} className="">
                            <Link href={`/workspace/${workspaceId}/project/${project.$id}`}>
                                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                                    <CardContent className="p-4 flex items-center gap-x-2.5">
                                        <ProjectAvatar
                                            name={project.name}
                                            image={project.imageUrl}
                                            fallbackClassName="text-lg"
                                            className="size-12"
                                        />
                                        <p className="text-lg font-medium truncate">
                                            {project.name}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </li>
                    ))}
                    <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                        No projects found
                    </li>
                </ul>
            </div>
        </div>
    )
}