"use client";

import ResponsiveModal from '@/components/responsive-modal'
import CreateTaskFormWrapper from './create-task-form-wrapper';
import { useUpdateTaskModal } from '../hooks/use-update-task-modal';
import UpdateTaskFormWrapper from './update-task-form-wrapper';

const UpdateTaskModal = () => {
    const { taskId, setTaskId, close } = useUpdateTaskModal();

    return (
        <ResponsiveModal open={!!taskId} onOpenChange={close}>
            {taskId && (
                <UpdateTaskFormWrapper id={taskId} onCancel={close} />
            )}
        </ResponsiveModal>
    )
}

export default UpdateTaskModal