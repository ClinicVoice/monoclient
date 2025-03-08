'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

interface WeekViewTimeLabelsProps {
    totalMinutes: number;
}

export const WeekViewTimeLabels = ({ totalMinutes }: WeekViewTimeLabelsProps) => (
    <Box
        sx={{
            width: 60,
            top: 39,
            borderRight: '1px solid #e0e0e0',
            position: 'relative',
            height: totalMinutes,
            mt: 0,
        }}
    >
        {Array.from({ length: 12 }, (_, i) => i).map((i) => {
            const hour = 8 + i;
            return (
                <Box
                    key={i}
                    sx={{
                        position: 'absolute',
                        top: i * 60 - 4,
                        width: '100%',
                        textAlign: 'right',
                        pr: 1,
                    }}
                >
                    <Typography variant="caption">
                        {hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
                    </Typography>
                </Box>
            );
        })}
    </Box>
);
