/**
 * API client for M-OBS API
 */

// PRODUCTION: Hardcoded to fix env var issue
const API_BASE_URL = 'https://m-obs-api.onrender.com';
// const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000';

export interface ApiResponse<T> {
	data?: T;
	error?: string;
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...options?.headers,
			},
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			return {
				error: errorData.detail || `HTTP ${response.status}: ${response.statusText}`,
			};
		}

		const data = await response.json();
		return { data };
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : 'Unknown error',
		};
	}
}

// Health
export async function checkHealth() {
	return fetchApi<{ status: string; timestamp: number }>('/health');
}

// Metrics
export interface GetMetricsParams {
	start_ts?: number;
	end_ts?: number;
	resolution?: 'minute' | 'hour' | 'day';
}

export async function getMetricsOverview(params: GetMetricsParams = {}) {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined) searchParams.append(key, value.toString());
	});
	return fetchApi<any>(`/metrics/overview?${searchParams}`);
}

// Providers
export async function getProvidersHealth(hours: number = 24, endpointId?: number) {
	const params = new URLSearchParams({ hours: hours.toString() });
	if (endpointId) params.append('endpoint_id', endpointId.toString());
	return fetchApi<any>(`/providers/health?${params}`);
}

// Transactions
export interface GetTransactionsParams {
	status?: 'all' | 'success' | 'failed';
	contract_id?: number;
	address?: string;
	start_ts?: number;
	end_ts?: number;
	error_signature?: string;
	limit?: number;
	cursor?: string;
	sort?: 'time_desc' | 'time_asc' | 'gas_desc';
}

export async function getTransactions(params: GetTransactionsParams = {}) {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined) searchParams.append(key, value.toString());
	});
	return fetchApi<any>(`/txs?${searchParams}`);
}

export async function getTransactionDetail(hash: string) {
	return fetchApi<any>(`/txs/${hash}`);
}

// Contracts
export async function getContracts() {
	return fetchApi<any>('/contracts');
}

export interface CreateContractParams {
	address: string;
	name: string;
	tags?: string[];
	abi_json?: any[];
}

export async function createContract(params: CreateContractParams) {
	return fetchApi<any>('/contracts', {
		method: 'POST',
		body: JSON.stringify(params),
	});
}

// Alerts
export interface GetAlertsParams {
	include_events?: boolean;
	events_limit?: number;
	enabled_only?: boolean;
}

export async function getAlerts(params: GetAlertsParams = {}) {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined) searchParams.append(key, value.toString());
	});
	return fetchApi<any>(`/alerts?${searchParams}`);
}

export interface CreateAlertParams {
	name: string;
	description?: string;
	alert_type: 'failure_rate' | 'gas_spike' | 'provider_down' | 'custom';
	conditions?: any;
	threshold: number;
	window_minutes?: number;
	cooldown_minutes?: number;
	severity?: 'info' | 'warning' | 'critical';
	contract_ids?: number[];
}

export async function createAlert(params: CreateAlertParams) {
	return fetchApi<any>('/alerts', {
		method: 'POST',
		body: JSON.stringify(params),
	});
}

export interface UpdateAlertParams {
	name?: string;
	description?: string;
	threshold?: number;
	window_minutes?: number;
	cooldown_minutes?: number;
	severity?: 'info' | 'warning' | 'critical';
	is_enabled?: boolean;
	contract_ids?: number[];
}

export async function updateAlert(alertId: number, params: UpdateAlertParams) {
	return fetchApi<any>(`/alerts/${alertId}`, {
		method: 'PATCH',
		body: JSON.stringify(params),
	});
}

export async function deleteAlert(alertId: number) {
	return fetchApi<any>(`/alerts/${alertId}`, {
		method: 'DELETE',
	});
}
