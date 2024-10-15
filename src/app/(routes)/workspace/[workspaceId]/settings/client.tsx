"use client";

import PageError from '@/components/page-error';
import PageLoader from '@/components/PageLoader';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import UpdateWorkspaceForm from '@/features/workspaces/components/update-workspace-form';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';

const WorkspaceSettingsClient = () => {
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
            <UpdateWorkspaceForm initialValues={initialValues} />
        </div>
    )
}

export default WorkspaceSettingsClient