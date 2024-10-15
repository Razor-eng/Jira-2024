"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createTaskSchema } from "../schemas";
import DatePicker from "@/components/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MemberAvatar from "@/features/members/components/member-avatar";
import { Task, TaskStatus } from "../types";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import { useUpdateTask } from "../api/use-update-task";

interface UpdateTaskFormProps {
    onCancel?: () => void;
    projectOptions: { id: string, name: string, imageUrl: string }[];
    memberOptions: { id: string, name: string }[];
    initialValues: Task;
}

const UpdateTaskForm = ({ initialValues, onCancel, memberOptions, projectOptions }: UpdateTaskFormProps) => {
    const { mutate, isPending } = useUpdateTask();

    const form = useForm<z.infer<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema.omit({ workspaceId: true, description: true })),
        defaultValues: {
            ...initialValues,
            dueDate: initialValues.dueDate ? new Date(initialValues.dueDate) : undefined,
        }
    });

    const onSubmit = (values: z.infer<typeof createTaskSchema>) => {
        mutate({ json: values, param: { taskId: initialValues.$id } }, {
            onSuccess: () => {
                form.reset();
                onCancel?.();
            },
        });
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Update task
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Task Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter task name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Due Date
                                        </FormLabel>
                                        <FormControl>
                                            <DatePicker {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="assigneeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Assignee
                                        </FormLabel>
                                        <Select
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Assignee" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage>
                                                <SelectContent>
                                                    {memberOptions.map((member) => (
                                                        <SelectItem key={member.id} value={member.id}>
                                                            <div className="flex items-center gap-x-2">
                                                                <MemberAvatar
                                                                    className="size-6"
                                                                    name={member.name}
                                                                />
                                                                {member.name}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </FormMessage>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Status
                                        </FormLabel>
                                        <Select
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage>
                                                <SelectContent>
                                                    <SelectItem value={TaskStatus.BACKLOG}>
                                                        Backlog
                                                    </SelectItem>
                                                    <SelectItem value={TaskStatus.IN_PROGRESS}>
                                                        In Progress
                                                    </SelectItem>
                                                    <SelectItem value={TaskStatus.IN_REVIEW}>
                                                        IN REVIEW
                                                    </SelectItem>
                                                    <SelectItem value={TaskStatus.TODO}>
                                                        Todo
                                                    </SelectItem>
                                                    <SelectItem value={TaskStatus.DONE}>
                                                        Done
                                                    </SelectItem>
                                                </SelectContent>
                                            </FormMessage>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="projectId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Project
                                        </FormLabel>
                                        <Select
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Project" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage>
                                                <SelectContent>
                                                    {projectOptions.map((project) => (
                                                        <SelectItem key={project.id} value={project.id}>
                                                            <div className="flex items-center gap-x-2">
                                                                <ProjectAvatar
                                                                    className="size-6"
                                                                    name={project.name}
                                                                    image={project.imageUrl}
                                                                />
                                                                {project.name}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </FormMessage>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DottedSeparator className="py-7" />
                        <div className="flex items-center justify-between">
                            <Button
                                type="button"
                                size={"lg"}
                                variant={"secondary"}
                                onClick={onCancel}
                                disabled={isPending}
                                className={cn(!onCancel && "invisible")}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size={"lg"}
                                disabled={isPending}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default UpdateTaskForm