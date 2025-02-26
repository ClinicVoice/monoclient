export interface TestResultsRequest {
    id: string;
    first_name: string;
    last_name: string;
    health_card_number: string;
    requested_item: string;
    request_timestamp: number;
}

export interface GetRecentTestResultsRequestsResponse {
    recent_test_results: TestResultsRequest[];
}
