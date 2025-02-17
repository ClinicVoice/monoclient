import React, { ReactNode } from 'react';
import { CircularProgress } from '@mui/material';
import { LoadingContainer } from '@/components/loading/styles';
import theme from '@/theme';

type LoadingProps = {
    size?: number;
};

const Loading = ({ size = 40 }: LoadingProps): ReactNode => {
    return (
        <LoadingContainer>
            <CircularProgress size={size} style={{ color: theme.palette.primary.main }} />
        </LoadingContainer>
    );
};

export default Loading;
