import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import { useGetTask } from "../api/use-get-task";
import UpdateTaskForm from "./update-task-form";

interface UpdateTaskFormWrapperProps {
    id: string;
    onCancel: () => void;
}

const UpdateTaskFormWrapper = ({ onCancel, id }: UpdateTaskFormWrapperProps) => {
    const workspaceId = useWorkspaceId();
    const { data: projects, isLoading: isProjectsLoading } = useGetProjects({ workspaceId });
    const { data: members, isLoading: isMembersLoading } = useGetMembers({ workspaceId });
    const { data: initialValues, isLoading: isTaskLoading } = useGetTask({ taskId: id });

    const projectOptions = projects?.documents.map((project) => ({
        id: project.$id,
        name: project.name,
        imageUrl: project.imageUrl
    }));

    const memberOptions = members?.documents.map((member) => ({
        id: member.$id,
        name: member.name,
    }));

    const isLoading = isProjectsLoading || isMembersLoading || isTaskLoading;

    if (isLoading) {
        return (
            <Card className="w-full h-[714px] border-none shadow-none">
                <CardContent className="flex items-center justify-center h-full">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        )
    }

    if (!initialValues) {
        return null;
    }

    return (
        <UpdateTaskForm
            onCancel={onCancel}
            initialValues={initialValues}
            projectOptions={projectOptions ?? []}
            memberOptions={memberOptions ?? []}
        />
    )
}

export default UpdateTaskFormWrapper