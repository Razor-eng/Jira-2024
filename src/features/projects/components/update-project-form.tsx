"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { useUpdateProject } from "../api/use-update-project";
import { Project } from "../types";
import { updateProjectSchema } from "../schemas";
import { useDeleteProject } from "../api/use-delete-project";

interface UpdateProjectFormProps {
    onCancel?: () => void;
    initialValues: Project;
}

const UpdateProjectForm = ({ onCancel, initialValues }: UpdateProjectFormProps) => {
    const router = useRouter();
    const { mutate, isPending } = useUpdateProject();
    const { mutate: deleteProject, isPending: isDeletingProject } = useDeleteProject();

    const [DeleteDialog, confirmDelete] = useConfirm(
        "Delete Workspace",
        "This action cannot be undone",
        "destructive"
    );

    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof updateProjectSchema>>({
        resolver: zodResolver(updateProjectSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? ""
        }
    });

    const handleDelete = async () => {
        const ok = await confirmDelete();

        if (!ok) return;

        deleteProject({
            param: { projectId: initialValues.$id }
        }, {
            onSuccess: () => {
                router.push(`/workspace/${initialValues.workspaceId}`);
            }
        })
    }

    const onSubmit = (values: z.infer<typeof updateProjectSchema>) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : ""
        };

        mutate({
            form: finalValues,
            param: { projectId: initialValues.$id }
        });
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file);
        }
    }

    return (
        <div className="flex flex-col gap-y-4">
            <DeleteDialog />
            <Card className="w-full h-full border-none shadow-none">
                <CardHeader className="flex items-center p-7">
                    <CardTitle className="text-xl font-bold">
                        {initialValues.name}
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
                                                Project Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter project name"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex items-center gap-x-5">
                                                {field.value ? (
                                                    <div className="size-[72px] relative rounded-md overflow-hidden">
                                                        <Image
                                                            src={field.value instanceof File ? URL.createObjectURL(field.value) : field.value}
                                                            alt="Image"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )
                                                    : (
                                                        <Avatar className="size-[72px]">
                                                            <AvatarFallback>
                                                                <ImageIcon className="size-[36px] text-neutral-400" />
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    )
                                                }
                                                <div className="flex flex-col">
                                                    <p className="text-sm">Project Icon</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        JPG, PNG, SVG OR JPEG, max 1mb
                                                    </p>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept=".jpg, .png, .jpeg, .svg"
                                                        ref={inputRef}
                                                        onChange={handleImageChange}
                                                        disabled={isPending}
                                                    />
                                                    <Button
                                                        type="button"
                                                        disabled={isPending}
                                                        variant={"teritary"}
                                                        size={"xs"}
                                                        className="w-fit mt-2"
                                                        onClick={() => inputRef.current?.click()}
                                                    >
                                                        Upload Image
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                            <DottedSeparator className="py-7" />
                            <div className="flex items-center justify-between">
                                <Button
                                    type="button"
                                    size={"lg"}
                                    variant={"secondary"}
                                    onClick={onCancel ? onCancel : () => router.push(`/workspace/${initialValues.workspaceId}/project/${initialValues.$id}`)}
                                    disabled={isPending}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    size={"lg"}
                                    disabled={isPending}
                                >
                                    Update
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="w-full h-full border-none shadow-none">
                <CardTitle className="hidden">Delete Project</CardTitle>
                <CardContent className="py-5 px-7">
                    <div className="flex flex-col">
                        <h3 className="font-bold">Delete Project</h3>
                        <p className="text-sm text-muted-foreground">
                            Deleting a project is irreversible and will remove all associated data
                        </p>
                        <div className="py-4">
                            <DottedSeparator />
                        </div>
                        <Button
                            className="w-fit ml-auto"
                            size={"lg"}
                            variant={"destructive"}
                            type="button"
                            disabled={isPending || isDeletingProject}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default UpdateProjectForm