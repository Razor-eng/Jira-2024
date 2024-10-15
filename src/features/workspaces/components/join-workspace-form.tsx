"use client";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import JoinAvatar from "./join-avatar";

interface JoinWorkspaceFormProps {
    initialValues: {
        name: string;
        imageUrl: string;
    }
}

export const JoinWorkspaceForm = ({ initialValues }: JoinWorkspaceFormProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const inviteCode = useInviteCode();
    const { mutate, isPending } = useJoinWorkspace();

    const onSubmit = () => {
        mutate({
            param: { workspaceId },
            json: { code: inviteCode }
        }, {
            onSuccess: ({ data }) => {
                router.push(`/workspace/${data.$id}`);
            }
        })
    }

    return (
        <Card className="w-full h-full outline-none shadow-none">
            <CardHeader className="p-7 text-center">
                <CardTitle className="text-xl font-bold">
                    Join Workspace
                </CardTitle>
                <div className="flex items-center pt-4 pb-1 justify-center">
                    <JoinAvatar name={initialValues.name} image={initialValues.imageUrl} />
                </div>
                <CardDescription>
                    You&apos;ve been invited to join <strong>{initialValues.name}</strong>
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <div className="flex flex-col lg:flex-row items-center gap-2 justify-between">
                    <Button
                        className="w-full lg:w-fit"
                        variant={"secondary"}
                        size={"lg"}
                        type="button"
                        asChild
                        disabled={isPending}
                    >
                        <Link href={'/'}>
                            Cancel
                        </Link>
                    </Button>
                    <Button
                        className="w-full lg:w-fit"
                        size={"lg"}
                        type="button"
                        onClick={onSubmit}
                        disabled={isPending}
                    >
                        Join Workspace
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
