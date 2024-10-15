"use client";

import Analytics from "@/components/analytics";
import { MembersList } from "@/components/members-list";
import PageError from "@/components/page-error";
import PageLoader from "@/components/PageLoader";
import { ProjectList } from "@/components/project-list";
import { TaskList } from "@/components/task-list";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const WorkspaceClientPage = () => {
    const workspaceId = useWorkspaceId();
    const { data: analytics, isLoading: isAnalyticsLoading } = useGetWorkspaceAnalytics({ workspaceId });
    const { data: tasks, isLoading: isTasksLoading } = useGetTasks({ workspaceId });
    const { data: projects, isLoading: isProjectsLoading } = useGetProjects({ workspaceId });
    const { data: members, isLoading: isMembersLoading } = useGetMembers({ workspaceId });

    const { open: createProject } = useCreateProjectModal();

    const isLoading = isAnalyticsLoading || isMembersLoading || isProjectsLoading || isTasksLoading;
    const noData = !analytics || !members || !projects || !tasks;

    if (isLoading) {
        return <PageLoader />
    }

    if (noData) {
        return <PageError message="Failed to load workspace data" />
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
