import React, { useState } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import PackageTable from './components/PackageTable';
import CreatePackageModal from './components/CreatePackageModel';
import PackageDetailsModal from './components/PackageDetailsModel';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { usePackages } from './hooks/usePackages';

const App = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	type PackageType = {
		id: string;
		[key: string]: any;
	};
	const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
	const [detailsLoading, setDetailsLoading] = useState(false);

	const { packages, loading, error, loadPackages, updatePackageStatus, getPackageDetails, setError } = usePackages();

	const handleSearch = () => {
		loadPackages(searchTerm, statusFilter);
	};

	const handleCreatePackage = () => {
		setShowCreateModal(true);
	};

	const handleCreateSuccess = () => {
		loadPackages(searchTerm, statusFilter);
	};

	const handleViewDetails = async (packageId: any) => {
		setDetailsLoading(true);
		try {
			const result = await getPackageDetails(packageId);
			if (result.success) {
				setSelectedPackage(result.data);
				setShowDetailsModal(true);
			} else {
				setError(result.error ?? 'An unknown error occurred');
			}
		} catch (err) {
			setError('Failed to load package details');
		} finally {
			setDetailsLoading(false);
		}
	};

	const handleStatusUpdate = async (packageId: any, newStatus: any) => {
		const result = await updatePackageStatus(packageId, newStatus);
		if (!result.success) {
			setError(result.error ?? 'An unknown error occurred');
		}
	};

	const handleDetailsStatusUpdate = async () => {
		await loadPackages(searchTerm, statusFilter);

		if (selectedPackage) {
			const result = await getPackageDetails(selectedPackage.id);
			if (result.success) {
				setSelectedPackage(result.data);
			}
		}
	};

	const handleCloseDetails = () => {
		setShowDetailsModal(false);
		setSelectedPackage(null);
	};

	const handleDismissError = () => {
		setError('');
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header onCreatePackage={handleCreatePackage} />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<SearchFilter
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
					onSearch={handleSearch}
				/>

				<ErrorMessage message={error} onDismiss={handleDismissError} />

				{loading ? (
					<LoadingSpinner message='Loading packages...' />
				) : (
					<PackageTable packages={packages} onViewDetails={handleViewDetails} onStatusUpdate={handleStatusUpdate} />
				)}

				{detailsLoading && (
					<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
						<div className='bg-white rounded-lg p-8'>
							<LoadingSpinner message='Loading package details...' />
						</div>
					</div>
				)}
			</main>

			{/* Modals */}
			<CreatePackageModal
				isOpen={showCreateModal}
				onClose={() => setShowCreateModal(false)}
				onSuccess={handleCreateSuccess}
			/>

			<PackageDetailsModal
				packageData={selectedPackage}
				isOpen={showDetailsModal}
				onClose={handleCloseDetails}
				onStatusUpdate={handleDetailsStatusUpdate}
			/>
		</div>
	);
};

export default App;
