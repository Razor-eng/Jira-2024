"use client";

import DottedSeparator from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader, PlusIcon } from 'lucide-react'
import React, { useCallback } from 'react'
import { useCreateTaskModal } from '../hooks/use-create-task-modal'
import { useGetTasks } from '../api/use-get-tasks';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useQueryState } from 'nuqs';
import DataFilters from './data-filters';
import { useTaskFilters } from '../hooks/use-task-filters';
import { DataTable } from './data-table';
import { Columns } from './columns';
import DataKanban from './data-kanban';
import { TaskStatus } from '../types';
import { useBulkUpdateTasks } from '../api/use-bulk-update-tasks';
import DataCalendar from './data-calendar';
import { useProjectId } from '@/features/projects/hooks/use-project-id';

interface TaskViewSwitcherProps {
    hideProjectFilter?: boolean;
}

const TaskViewSwitcher = ({ hideProjectFilter }: TaskViewSwitcherProps) => {
    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table"
    });
    const [{ status, assigneeId, dueDate, projectId, search }] = useTaskFilters();

    const workspaceId = useWorkspaceId();
    const currentProjectId = useProjectId();
    const { data: tasks, isLoading: isTasksLoading } = useGetTasks({
        workspaceId,
        assigneeId,
        dueDate,
        projectId: currentProjectId || projectId,
        search,
        status
    });
    const { open } = useCreateTaskModal();

    const { mutate: bulkUpdate } = useBulkUpdateTasks();

    const onKanbanChange = useCallback((
        tasks: { $id: string; status: TaskStatus; position: number }[]
    ) => {
        bulkUpdate({
            json: { tasks }
        });
    }, [bulkUpdate]);


    return (
        <Tabs defaultValue={view} onValueChange={setView} className='flex-1 w-full border rounded-lg'>
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <TabsList className='w-full lg:w-auto'>
                        <TabsTrigger
                            className='h-8 w-full lg:w-auto'
                            value='table'
                        >
                            Table
                        </TabsTrigger>
                        <TabsTrigger
                            className='h-8 w-full lg:w-auto'
                            value='kanban'
                        >
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger
                            className='h-8 w-full lg:w-auto'
                            value='calendar'
                        >
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        className='w-full lg:w-auto'
                        size={"default"}
                        onClick={open}
                    >
                        <PlusIcon className='size-4 mr-2' />
                        New
                    </Button>
                </div>
                <DottedSeparator className='my-4' />
                <DataFilters hideProjectFilter={hideProjectFilter} />
                <DottedSeparator className='my-4' />
                {isTasksLoading ? (
                    <div className="w-full border rounded-lg h-[200px flex flex-col items-center justify-center]">
                        <Loader className='size-5 animate-spin text-muted-foreground' />
                    </div>
                ) : (
                    <>
                        <TabsContent value='table' className='mt-0'>
                            <DataTable columns={Columns} data={tasks?.documents ?? []} />
                        </TabsContent>
                        <TabsContent value='kanban' className='mt-0'>
                            <DataKanban onChange={onKanbanChange} data={tasks?.documents ?? []} />
                        </TabsContent>
                        <TabsContent value='calendar' className='mt-0 h-full pb-4'>
                            <DataCalendar data={tasks?.documents ?? []} />
                        </TabsContent>
                    </>
                )}
            </div>
        </Tabs>
    )
}

export default TaskViewSwitcher