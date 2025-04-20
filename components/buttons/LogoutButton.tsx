'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/hooks/authentication/useLogout';

interface LogoutButtonProps {
    redirectTo?: string;
}
const LogoutButton = ({ redirectTo = '/' }: LogoutButtonProps) => {
    const router = useRouter();
    const { mutate: logout, isPending } = useLogout();

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                router.push(redirectTo);
            },
        });
    };

    return (
        <Button variant="contained" color="error" onClick={handleLogout} disabled={isPending}>
            {isPending ? 'Logging out...' : 'Logout'}
        </Button>
    );
};

export default LogoutButton;
