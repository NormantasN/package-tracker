import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const usePackages = () => {
	const [packages, setPackages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const loadPackages = async (searchTerm = '', statusFilter = '') => {
		try {
			setLoading(true);
			setError('');
			const data = await api.getPackages(searchTerm, statusFilter);
			setPackages(data);
		} catch (err) {
			setError('Failed to load packages. Please try again.');
			console.error('Error loading packages:', err);
		} finally {
			setLoading(false);
		}
	};

	const createPackage = async (packageData) => {
		try {
			await api.createPackage(packageData);
			await loadPackages();
			return { success: true };
		} catch (err) {
			console.error('Error creating package:', err);
			return { success: false, error: 'Failed to create package. Please try again.' };
		}
	};

	const updatePackageStatus = async (packageId, statusOrData, notes = '') => {
		try {
			let statusData;
			if (typeof statusOrData === 'object') {
				statusData = statusOrData;
			} else {
				statusData = { status: statusOrData, notes };
			}

			await api.updatePackageStatus(packageId, statusData);
			await loadPackages();
			return { success: true };
		} catch (err) {
			console.error('Error updating package status:', err);
			return { success: false, error: 'Failed to update package status. Please try again.' };
		}
	};

	const getPackageDetails = async (packageId) => {
		try {
			const packageData = await api.getPackage(packageId);
			return { success: true, data: packageData };
		} catch (err) {
			console.error('Error loading package details:', err);
			return { success: false, error: 'Failed to load package details. Please try again.' };
		}
	};

	useEffect(() => {
		loadPackages();
	}, []);

	return {
		packages,
		loading,
		error,
		loadPackages,
		createPackage,
		updatePackageStatus,
		getPackageDetails,
		setError,
	};
};
