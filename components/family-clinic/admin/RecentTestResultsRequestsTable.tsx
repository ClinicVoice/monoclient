import { useRecentTestResultsRequests } from '@/hooks/family_clinic/useRecentTestResultsRequests';
import TestResultsRequestsTable from '@/components/family-clinic/admin/TestResultsRequestsTable';
import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

export default function RecentTestResultsRequestsTable() {
    const [limit, setLimit] = useState(5);
    const queryClient = useQueryClient();
    const { data, isLoading } = useRecentTestResultsRequests(limit);
    const testResultsRequests = data?.recent_test_results || [];

    const refreshData = () => {
        queryClient.invalidateQueries({ queryKey: ['recentTestResultsRequests'] });
    };

    return (
        <TestResultsRequestsTable
            title="Recent Test Results Requests"
            testResultsRequests={testResultsRequests}
            isLoading={isLoading}
            onExportFilename="RecentTestResultsRequests"
            onRefresh={refreshData}
        >
            <FormControl fullWidth margin="normal">
                <InputLabel>Limit</InputLabel>
                <Select
                    label="Limit"
                    sx={{ textAlign: 'left' }}
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                >
                    {[5, 10, 15, 20, 25].map((num) => (
                        <MenuItem key={num} value={num}>
                            {num}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </TestResultsRequestsTable>
    );
}
