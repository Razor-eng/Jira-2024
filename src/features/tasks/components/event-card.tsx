import { Project } from "@/features/projects/types";
import { TaskStatus } from "../types";
import { cn } from "@/lib/utils";
import MemberAvatar from "@/features/members/components/member-avatar";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { Member } from "@/features/members/types";

interface EventCardProps {
    title: string;
    assignee: Member;
    project: Project;
    status: TaskStatus;
    id: string;
}

const statusColorMap: Record<TaskStatus, string> = {
    [TaskStatus.BACKLOG]: "border-l-zinc-500",
    [TaskStatus.TODO]: "border-l-red-500",
    [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
    [TaskStatus.IN_REVIEW]: "border-l-blue-500",
    [TaskStatus.DONE]: "border-l-green-500",
}

const EventCard = ({ assignee, id, project, status, title }: EventCardProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        router.push(`/workspace/${workspaceId}/task/${id}`);
    }

    return (
        <div className="px-2">
            <div onClick={onClick} className={cn(
                "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
                statusColorMap[status]
            )}>
                <p className="">{title}</p>
                <div className="flex items-center gap-x-1">
                    <MemberAvatar
                        name={assignee?.name}
                    />
                    <div className="size-1 rounded-full bg-neutral-300" />
                    <ProjectAvatar
                        name={project.name}
                        image={project.imageUrl}
                    />
                </div>
            </div>
        </div>
    )
}

export default EventCard