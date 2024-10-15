import { getCurrent } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import WorkspaceClientPage from './client';

const WorkspacePage = async () => {
    const user = await getCurrent();
    if (!user) redirect('/sign-in');

    return (
        <WorkspaceClientPage />
    )
}

export default WorkspacePage