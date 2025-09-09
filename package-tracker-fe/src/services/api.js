const API_BASE_URL = 'http://localhost:5136/api';

export const api = {
	async getPackages(trackingNumber = '', status = '') {
		const params = new URLSearchParams();
		if (trackingNumber) params.append('trackingNumber', trackingNumber);
		if (status) params.append('status', status);

		const response = await fetch(`${API_BASE_URL}/packages?${params}`);
		if (!response.ok) throw new Error('Failed to fetch packages');
		return response.json();
	},

	async getPackage(id) {
		const response = await fetch(`${API_BASE_URL}/packages/${id}`);
		if (!response.ok) throw new Error('Failed to fetch package');
		return response.json();
	},

	async createPackage(packageData) {
		const response = await fetch(`${API_BASE_URL}/packages`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(packageData),
		});
		if (!response.ok) throw new Error('Failed to create package');
		return response.json();
	},

	async updatePackageStatus(id, statusData) {
		const response = await fetch(`${API_BASE_URL}/packages/${id}/status`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(statusData),
		});
		if (!response.ok) throw new Error('Failed to update package status');
		return response.json();
	},
};
