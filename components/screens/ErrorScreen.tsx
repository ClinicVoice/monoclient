'use client';

import { Typography, Button, Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

interface ErrorScreenProps {
    message: string;
}

export default function ErrorScreen({ message }: ErrorScreenProps) {
    const router = useRouter();

    return (
        <Container maxWidth="sm">
            <Box textAlign="center" mt={10}>
                <Typography variant="h4" gutterBottom>
                    Oops! Something went wrong.
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    {message}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push('/')}
                    sx={{ mt: 2 }}
                >
                    Return Home
                </Button>
            </Box>
        </Container>
    );
}
