"use client";

import DottedSeparator from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CopyIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { Workspace } from '../types';
import { useConfirm } from '@/hooks/use-confirm';
import { useResetInviteCode } from '../api/use-reset-invite-code';

interface WorkspaceInviteProps {
    initialValues: Workspace;
}

const WorkspaceInvite = ({ initialValues }: WorkspaceInviteProps) => {
    const { mutate: resetInviteCode, isPending: isResettingInviteCode } = useResetInviteCode();

    const [ResetDialog, confirmReset] = useConfirm(
        "Reset invite link",
        "This will invalidate the current invite link",
        "destructive"
    );

    const fullInviteLink = `${window.location.origin}/workspace/${initialValues.$id}/join/${initialValues.inviteCode}`;

    const handleCopyInviteLink = () => {
        navigator.clipboard.writeText(fullInviteLink)
            .then(() => toast.success("Copied invite link"));
    }

    const handleResetInviteCode = async () => {
        const ok = await confirmReset();

        if (!ok) return;

        resetInviteCode({
            param: { workspaceId: initialValues.$id }
        });
    }

    return (
        <div className="mt-7">
            <ResetDialog />
            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        <h3 className="font-bold">Invite Members</h3>
                        <p className="text-sm text-muted-foreground">
                            Use the invite link to add members to your workspace.
                        </p>
                        <div className="mt-4">
                            <div className="flex items-center gap-x-2">
                                <Input disabled value={fullInviteLink} />
                                <Button
                                    onClick={handleCopyInviteLink}
                                    variant={"secondary"}
                                    className="size-12"
                                    disabled={isResettingInviteCode}
                                >
                                    <CopyIcon className="size-5 text-zinc-500" />
                                </Button>
                            </div>
                        </div>
                        <DottedSeparator className="py-7" />
                        <Button
                            className="w-fit ml-auto"
                            variant={"reset"}
                            type="button"
                            disabled={isResettingInviteCode}
                            onClick={handleResetInviteCode}
                        >
                            Reset Invite Link
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default WorkspaceInvite