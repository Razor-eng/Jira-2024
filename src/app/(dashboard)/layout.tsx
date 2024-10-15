import CreateProjectModal from '@/features/projects/components/create-project-modal';
import CreateTaskModal from '@/features/tasks/components/create-task-modal';
import UpdateTaskModal from '@/features/tasks/components/update-task-modal';
import CreateWorkspaceModal from '@/features/workspaces/components/create-workspace-modal';
import DashboardProvider from './DashboardProvider';

interface DashboardLayoutProps {
    children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className='min-h-screen'>
            <CreateWorkspaceModal />
            <CreateProjectModal />
            <CreateTaskModal />
            <UpdateTaskModal />
            <DashboardProvider>
                {children}
            </DashboardProvider>
        </div>
    )
}

export default DashboardLayout