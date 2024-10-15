"use client";

import PageError from '@/components/page-error';
import PageLoader from '@/components/PageLoader';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import WorkspaceInvite from '@/features/workspaces/components/workspace-invite';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';

const WorkspaceInviteClient = () => {
    const workspaceId = useWorkspaceId();
    const { data: initialValues, isLoading } = useGetWorkspace({ workspaceId });

    if (isLoading) {
        return <PageLoader />
    }
    if (!initialValues) {
        return <PageError message="Project not found" />
    }

    return (
        <div className='w-full lg:max-w-xl'>
            <WorkspaceInvite initialValues={initialValues} />
        </div>
    )
}

export default WorkspaceInviteClient