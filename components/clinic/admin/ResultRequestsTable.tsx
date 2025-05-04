import React, { forwardRef, useState } from 'react';
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
    TextField,
    Grid,
} from '@mui/material';
import { TableCard } from '@/components/clinic/admin/styles';
import { exportResultRequestsToCSV } from '@/utils/exportUtils';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useParams } from 'next/navigation';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import { useResultRequestsByClinic } from '@/hooks/clinics/useResultRequestsByClinic';
import { ResultRequestRead, ListResultRequestsParams } from '@/types/resultRequests';

export type ResultRequestsTableProps = object;
export const ResultRequestsTable = forwardRef<HTMLDivElement, ResultRequestsTableProps>(
    (props, ref) => {
        const paramsUrl = useParams();
        const clinicId = parseClinicIdFromUrlParams(paramsUrl);

        // filter & pagination state
        const initialParams: ListResultRequestsParams = { page: 1, limit: 20 };
        const [filters, setFilters] = useState<ListResultRequestsParams>(initialParams);

        const {
            data: resultRequests = [],
            isLoading,
            error,
            refetch,
        } = useResultRequestsByClinic(clinicId, filters);
        const isError = Boolean(error);

        const onExportFilename = `clinic-${clinicId}-result-requests`;

        const handleChange =
            (field: keyof ListResultRequestsParams) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value.trim();
                setFilters((prev) => ({
                    ...prev,
                    [field]: value === '' ? undefined : value,
                    page: 1,
                }));
            };

        const handleSearch = () => {
            setFilters((prev) => ({ ...prev, page: 1 }));
            refetch();
        };

        const handleExport = () => {
            exportResultRequestsToCSV(resultRequests as ResultRequestRead[], onExportFilename);
        };

        const handlePrev = () => {
            setFilters((prev) => ({ ...prev, page: Math.max((prev.page || 1) - 1, 1) }));
        };

        const handleNext = () => {
            setFilters((prev) => ({ ...prev, page: (prev.page || 1) + 1 }));
        };

        const canPrev = (filters.page || 1) > 1;
        const canNext = resultRequests.length === (filters.limit || 0);

        return (
            <TableCard ref={ref}>
                <Typography variant="h2" gutterBottom>
                    Result Requests
                </Typography>

                <Box mb={2}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="First Name"
                                value={filters.first_name || ''}
                                onChange={handleChange('first_name')}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Last Name"
                                value={filters.last_name || ''}
                                onChange={handleChange('last_name')}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Requested Item"
                                value={filters.requested_item || ''}
                                onChange={handleChange('requested_item')}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Email"
                                value={filters.email || ''}
                                onChange={handleChange('email')}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Phone"
                                value={filters.phone || ''}
                                onChange={handleChange('phone')}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Button variant="contained" onClick={handleSearch} fullWidth>
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {/* Actions */}
                {!isLoading && !isError && resultRequests.length > 0 && (
                    <Box display="flex" justifyContent="flex-end" mb={2} gap={2}>
                        <Button variant="outlined" onClick={() => refetch()}>
                            Refresh
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<FileDownloadIcon />}
                            onClick={handleExport}
                        >
                            Export CSV
                        </Button>
                    </Box>
                )}

                {isLoading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : isError ? (
                    <Alert severity="error">Failed to load result requests.</Alert>
                ) : resultRequests.length === 0 ? (
                    <Alert severity="warning">No result requests found.</Alert>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Health Card</TableCell>
                                    <TableCell>Requested Item</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Created At</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {resultRequests.map((req) => (
                                    <TableRow key={req.id}>
                                        <TableCell>{req.id}</TableCell>
                                        <TableCell>{req.first_name}</TableCell>
                                        <TableCell>{req.last_name}</TableCell>
                                        <TableCell>{req.health_card_number}</TableCell>
                                        <TableCell>{req.requested_item}</TableCell>
                                        <TableCell>{req.email}</TableCell>
                                        <TableCell>{req.phone_number || '-'}</TableCell>
                                        <TableCell>
                                            {new Date(req.created_at).toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <Box display="flex" justifyContent="center" mt={2} gap={2}>
                    <Button variant="outlined" onClick={handlePrev} disabled={!canPrev}>
                        Previous
                    </Button>
                    <Typography variant="body2" align="center" sx={{ lineHeight: '40px' }}>
                        Page {filters.page}
                    </Typography>
                    <Button variant="outlined" onClick={handleNext} disabled={!canNext}>
                        Next
                    </Button>
                </Box>
            </TableCard>
        );
    },
);
ResultRequestsTable.displayName = 'ResultRequestsTable';
