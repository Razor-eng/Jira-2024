"use client";

import React from 'react'
import DottedSeparator from '@/components/dotted-separator'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { z } from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import { loginSchema } from '../schema';
import { useLogin } from '../api/use-login';
import { signUpWithGithub, signUpWithGoogle } from '@/lib/oauth';

const SignInCard = () => {
    const { mutate, isPending } = useLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        mutate({ json: values });
    }

    return (
        <Card className='w-full h-full md:w-[487px] border-none shadow-none'>
            <CardHeader className='flex items-center justify-center text-center p-7'>
                <CardTitle className='text-2xl'>
                    Welcome back!
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className='p-7'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='email'
                                            placeholder='Enter email address'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='password'
                                            placeholder='Enter password'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className='w-full'
                            type='submit'
                            size={"lg"}
                            disabled={isPending}
                        >
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className='p-7 flex flex-col gap-y-4'>
                <Button
                    variant={"secondary"}
                    size={"lg"}
                    className='w-full'
                    disabled={isPending}
                    onClick={() => signUpWithGoogle()}
                >
                    <FcGoogle className='mr-2 size-5' />
                    Login with Google
                </Button>
                <Button
                    variant={"secondary"}
                    size={"lg"}
                    className='w-full'
                    disabled={isPending}
                    onClick={() => signUpWithGithub()}
                >
                    <FaGithub className='mr-2 size-5' />
                    Login with Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p className="">
                    Don&apos;t have an account?
                    <Link href={'/sign-up'}>
                        <span className="text-blue-600">&nbsp;Sign Up</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}

export default SignInCard
