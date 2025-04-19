'use client';

import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    CircularProgress,
    Alert,
    Box,
} from '@mui/material';
import { TableCard } from '@/components/clinic/admin/styles';
import { ResultRequestRead } from '@/types/resultRequests';
import { exportResultRequestsToCSV } from '@/utils/exportUtils';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface ResultRequestsTableProps {
    title: string;
    children?: React.ReactNode;
    resultRequests: ResultRequestRead[];
    isLoading?: boolean;
    isError?: boolean;
    onRefresh?: () => void;
    onExportFilename: string;
}

export default function ResultRequestsTable({
    title,
    children,
    resultRequests,
    isLoading,
    isError,
    onRefresh,
    onExportFilename,
}: ResultRequestsTableProps) {
    return (
        <TableCard>
            <Typography variant="h3" gutterBottom>
                {title}
            </Typography>

            {!isLoading && !isError && resultRequests.length > 0 && (
                <Box display="flex" justifyContent="space-between" mt={2}>
                    {onRefresh && (
                        <Button variant="contained" color="secondary" onClick={onRefresh}>
                            Refresh
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => exportResultRequestsToCSV(resultRequests, onExportFilename)}
                        startIcon={<FileDownloadIcon />}
                    >
                        Export to CSV
                    </Button>
                </Box>
            )}

            {children}

            {isLoading && (
                <Typography align="center" sx={{ mt: 2 }}>
                    <CircularProgress />
                </Typography>
            )}

            {isError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    Failed to load test results requests. Please try again later.
                </Alert>
            )}

            {!isLoading && !isError && resultRequests.length === 0 && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    No test results requests found.
                </Alert>
            )}

            {!isLoading && !isError && resultRequests.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Clinic ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Health Card</TableCell>
                                <TableCell>Requested Item</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Created At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {resultRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>{request.id}</TableCell>
                                    <TableCell>{request.clinic_id}</TableCell>
                                    <TableCell>{request.first_name}</TableCell>
                                    <TableCell>{request.last_name}</TableCell>
                                    <TableCell>{request.health_card_number}</TableCell>
                                    <TableCell>{request.requested_item}</TableCell>
                                    <TableCell>{request.email}</TableCell>
                                    <TableCell>{request.phone_number || '-'}</TableCell>
                                    <TableCell>
                                        {new Date(request.created_at).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </TableCard>
    );
}
