"use client";

import Analytics from "@/components/analytics";
import { MembersList } from "@/components/members-list";
import PageError from "@/components/page-error";
import PageLoader from "@/components/PageLoader";
import { ProjectList } from "@/components/project-list";
import { TaskList } from "@/components/task-list";
import { Button } from "@/components/ui/button";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import Link from "next/link";

const WorkspaceClientPage = () => {
    const workspaceId = useWorkspaceId();
    const { data: analytics, isLoading: isAnalyticsLoading } = useGetWorkspaceAnalytics({ workspaceId });
    const { data: tasks, isLoading: isTasksLoading } = useGetTasks({ workspaceId });
    const { data: projects, isLoading: isProjectsLoading } = useGetProjects({ workspaceId });
    const { data: members, isLoading: isMembersLoading } = useGetMembers({ workspaceId });

    const { open: createWorkspace } = useCreateWorkspaceModal();

    const isLoading = isAnalyticsLoading || isMembersLoading || isProjectsLoading || isTasksLoading;
    const noData = !analytics || !members || !projects || !tasks;

    if (isLoading) {
        return <PageLoader />
    }

    if (noData) {
        return (
            <div className="flex flex-col gap-6 items-center">
                <PageError message="Failed to load workspace data" />
                <div className="flex items-center gap-4">
                    <Button
                        variant={"secondary"}
                        size={"lg"}
                        asChild
                    >
                        <Link href={"/"}>
                            Home
                        </Link>
                    </Button>
                    <Button
                        variant={"teritary"}
                        size={"lg"}
                        onClick={createWorkspace}
                    >
                        Create
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col space-y-4">
            <Analytics data={analytics} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <TaskList tasks={tasks.documents} total={tasks.total} />
                <ProjectList projects={projects.documents} total={projects.total} />
                <MembersList members={members.documents} total={members.total} />
            </div>
        </div>
    )
}

export default WorkspaceClientPage
