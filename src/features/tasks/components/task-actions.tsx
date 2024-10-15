import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useConfirm } from '@/hooks/use-confirm';
import { ExternalLinkIcon, PencilIcon, TrashIcon } from 'lucide-react';
import React from 'react'
import { useDeleteTask } from '../api/use-delete-task';
import { useRouter } from 'next/navigation';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useUpdateTaskModal } from '../hooks/use-update-task-modal';

interface TaskActionsProps {
    id: string;
    projectId: string;
    children: React.ReactNode;
}

const TaskActions = ({ children, id, projectId }: TaskActionsProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const { open } = useUpdateTaskModal();
    const [ConfirmDialog, confirm] = useConfirm(
        "Delete task",
        "This action cannot be undone",
        "destructive"
    );
    const { mutate, isPending } = useDeleteTask();

    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) return;

        mutate({ param: { taskId: id } });
    }

    const onOpenTask = () => {
        router.push(`/workspace/${workspaceId}/task/${id}`)
    }
    const onOpenProject = () => {
        router.push(`/workspace/${workspaceId}/project/${projectId}`)
    }

    return (
        <div className='flex justify-end'>
            <ConfirmDialog />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-48'>
                    <DropdownMenuItem
                        onClick={onOpenTask}
                        className='font-medium p-[10px]'
                    >
                        <ExternalLinkIcon className='size-4 mr-2 stroke-2' />
                        Task Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onOpenProject}
                        className='font-medium p-[10px]'
                    >
                        <ExternalLinkIcon className='size-4 mr-2 stroke-2' />
                        Open Project
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => open(id)}
                        className='font-medium p-[10px]'
                    >
                        <PencilIcon className='size-4 mr-2 stroke-2' />
                        Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onDelete}
                        disabled={isPending}
                        className='text-rose-500 focus:text-red-600 font-medium p-[10px]'
                    >
                        <TrashIcon className='size-4 mr-2 stroke-2' />
                        Delete Task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default TaskActions