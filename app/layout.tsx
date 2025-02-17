import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Space_Grotesk } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import './globals.css';
import { CssBaseline } from '@mui/material';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { ToasterProvider } from '@/providers/ToasterProvider';
import theme from '@/theme';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    weight: ['400', '500', '700'],
});

const manrope = Manrope({
    subsets: ['latin'],
    variable: '--font-manrope',
    weight: ['400', '700'],
});

export const metadata: Metadata = {
    title: 'ClinicVoice AI',
    description: 'Virtual AI Receptionist for family doctor clinics.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
                <ReactQueryProvider>
                    <AppRouterCacheProvider>
                        <ToasterProvider>
                            <AuthProvider>
                                <ThemeProvider theme={theme}>
                                    <CssBaseline />
                                    {children}
                                </ThemeProvider>
                            </AuthProvider>
                        </ToasterProvider>
                    </AppRouterCacheProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
