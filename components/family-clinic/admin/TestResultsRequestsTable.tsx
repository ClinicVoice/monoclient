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
import { TableCard } from '@/components/family-clinic/admin/styles';
import { TestResultsRequest } from '@/types/family_clinic/test_results_requests';
import { exportTestResultsRequestsToCSV } from '@/utils/exportUtils';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface TestResultsRequestsTableProps {
    title: string;
    children?: React.ReactNode;
    testResultsRequests: TestResultsRequest[];
    isLoading?: boolean;
    isError?: boolean;
    onRefresh?: () => void;
    onExportFilename: string;
}

export default function TestResultsRequestsTable({
    title,
    children,
    testResultsRequests,
    isLoading,
    isError,
    onRefresh,
    onExportFilename,
}: TestResultsRequestsTableProps) {
    return (
        <TableCard>
            <Typography variant="h3" gutterBottom>
                {title}
            </Typography>

            {!isLoading && !isError && testResultsRequests.length > 0 && (
                <Box display="flex" justifyContent="space-between" mt={2}>
                    {onRefresh && (
                        <Button variant="contained" color="secondary" onClick={onRefresh}>
                            Refresh
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            exportTestResultsRequestsToCSV(testResultsRequests, onExportFilename)
                        }
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

            {!isLoading && !isError && testResultsRequests.length === 0 && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    No test results requests found.
                </Alert>
            )}

            {!isLoading && !isError && testResultsRequests.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Health Card</TableCell>
                                <TableCell>Requested Item</TableCell>
                                <TableCell>Request Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {testResultsRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>{request.id}</TableCell>
                                    <TableCell>{request.first_name}</TableCell>
                                    <TableCell>{request.last_name}</TableCell>
                                    <TableCell>{request.health_card_number}</TableCell>
                                    <TableCell>{request.requested_item}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            request.request_timestamp * 1000,
                                        ).toLocaleString()}
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
