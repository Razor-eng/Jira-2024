"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetMembers } from "../api/use-get-members";
import DottedSeparator from "@/components/dotted-separator";
import { Fragment } from "react";
import MemberAvatar from "./member-avatar";
import { MoreVerticalIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MemberRole } from "../types";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";

const MembersList = () => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const { data } = useGetMembers({ workspaceId });
    const [ConfirmDialog, confirm] = useConfirm(
        "Remove member",
        "This member will be removed fom the workspace",
        "destructive"
    );
    const { mutate: deleteMember, isPending: isDeletingMember } = useDeleteMember();
    const { mutate: updateMember, isPending: isUpdatingMember } = useUpdateMember();

    const handleUpdateMember = (memberId: string, role: MemberRole) => {
        updateMember({
            json: { role },
            param: { memberId }
        });
    }
    const handleDeleteMember = async (memberId: string) => {
        const ok = await confirm();
        if (!ok) return;

        deleteMember({ param: { memberId } }, {
            onSuccess: () => {
                router.push('/');
            }
        })
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <ConfirmDialog />
            <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
                <CardTitle className="text-2xl font-bold">
                    Members List
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                {data?.documents.map((member, index) => (
                    <Fragment key={member.$id}>
                        <div className="flex items-center gap-2">
                            <MemberAvatar
                                className="size-10"
                                fallbackClassName="text-lg"
                                name={member.name}
                            />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.email}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="ml-auto"
                                        variant={"secondary"}
                                        size={"icon"}
                                    >
                                        <MoreVerticalIcon className="size-4 text-muted-foreground" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="end">
                                    <DropdownMenuItem
                                        className="font-medium"
                                        onClick={() => handleUpdateMember(member.$id, MemberRole.ADMIN)}
                                        disabled={isUpdatingMember}
                                    >
                                        Set as Admin
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="font-medium"
                                        onClick={() => handleUpdateMember(member.$id, MemberRole.MEMBER)}
                                        disabled={isUpdatingMember}
                                    >
                                        Set as Member
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="font-medium text-rose-500 hover:!bg-red-400 hover:!text-white"
                                        onClick={() => handleDeleteMember(member.$id)}
                                        disabled={isDeletingMember}
                                    >
                                        Remove Member
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {index < data.documents.length - 1 && (
                            <Separator className="my-2.5 bg-zinc-100" />
                        )}
                    </Fragment>
                ))}
            </CardContent>
        </Card>
    )
}

export default MembersList