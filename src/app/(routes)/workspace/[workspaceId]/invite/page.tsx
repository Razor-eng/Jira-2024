import { getCurrent } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import WorkspaceInviteClient from './client';

const WorkspaceInvitePage = async () => {
    const user = await getCurrent();
    if (!user) redirect('/sign-in');

    return (
        <WorkspaceInviteClient />
    )
}

export default WorkspaceInvitePage