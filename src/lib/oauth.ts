"use server";

import { createAdminClient } from "./appwrite";
import { OAuthProvider } from "node-appwrite";
import { redirect } from "next/navigation";

export async function signUpWithGithub() {
    const { account } = await createAdminClient();
    const origin = process.env.NEXT_PUBLIC_APP_URL;

    const redirectUrl = await account.createOAuth2Token(
        OAuthProvider.Github,
        `${origin}/oauth`,
        `${origin}/sign-up`,
    );

    return redirect(redirectUrl);
}

export async function signUpWithGoogle() {
    const { account } = await createAdminClient();
    const origin = process.env.NEXT_PUBLIC_APP_URL;

    const redirectUrl = await account.createOAuth2Token(
        OAuthProvider.Google,
        `${origin}/oauth`,
        `${origin}/sign-up`,
    );

    return redirect(redirectUrl);
}