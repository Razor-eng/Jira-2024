import { getCurrent } from '@/features/auth/queries';
import SignInCard from '@/features/auth/components/SignInCard'
import { redirect } from 'next/navigation';

const SignIn = async () => {
    const user = await getCurrent();
    if (user) redirect('/');

    return (
        <SignInCard />
    )
}

export default SignIn