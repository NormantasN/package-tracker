import React, { useState } from 'react';
import { XCircle, Edit2, User, MapPin, Phone } from 'lucide-react';
import { api } from '../services/api';
import { statusConfig } from '../constants';
import StatusBadge from './StatusBadge';

const PackageDetailsModal = ({ packageData, isOpen, onClose, onStatusUpdate }) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState('');
	const [notes, setNotes] = useState('');
	const [showUpdateForm, setShowUpdateForm] = useState(false);

	const handleStatusUpdate = async () => {
		if (!selectedStatus) return;

		setIsUpdating(true);
		try {
			await api.updatePackageStatus(packageData.id, {
				status: selectedStatus,
				notes: notes,
			});
			onStatusUpdate();
			setShowUpdateForm(false);
			setSelectedStatus('');
			setNotes('');
		} catch (err) {
			alert('Failed to update status');
		} finally {
			setIsUpdating(false);
		}
	};

	const handleClose = () => {
		onClose();
		setShowUpdateForm(false);
		setSelectedStatus('');
		setNotes('');
	};

	if (!isOpen || !packageData) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
			<div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
				<div className='p-6'>
					<div className='flex justify-between items-center mb-6'>
						<h2 className='text-2xl font-bold'>Package Details</h2>
						<button onClick={handleClose} className='text-gray-500 hover:text-gray-700'>
							<XCircle className='w-6 h-6' />
						</button>
					</div>

					<div className='grid md:grid-cols-2 gap-6 mb-6'>
						{/* Package Info */}
						<div className='space-y-4'>
							<div className='bg-gray-50 p-4 rounded-lg'>
								<h3 className='font-semibold mb-2'>Tracking Information</h3>
								<p className='text-sm text-gray-600'>Tracking Number</p>
								<p className='font-mono text-lg'>{packageData.trackingNumber}</p>
								<p className='text-sm text-gray-600 mt-2'>Current Status</p>
								<div className='mt-1'>
									<StatusBadge status={packageData.currentStatus} />
								</div>
							</div>

							<div className='bg-gray-50 p-4 rounded-lg'>
								<h3 className='font-semibold mb-2 flex items-center'>
									<User className='w-4 h-4 mr-2' />
									Sender
								</h3>
								<p className='font-medium'>{packageData.senderName}</p>
								<p className='text-sm text-gray-600 flex items-center mt-1'>
									<MapPin className='w-4 h-4 mr-1' />
									{packageData.senderAddress}
								</p>
								<p className='text-sm text-gray-600 flex items-center mt-1'>
									<Phone className='w-4 h-4 mr-1' />
									{packageData.senderPhone}
								</p>
							</div>

							<div className='bg-gray-50 p-4 rounded-lg'>
								<h3 className='font-semibold mb-2 flex items-center'>
									<MapPin className='w-4 h-4 mr-2' />
									Recipient
								</h3>
								<p className='font-medium'>{packageData.recipientName}</p>
								<p className='text-sm text-gray-600 flex items-center mt-1'>
									<MapPin className='w-4 h-4 mr-1' />
									{packageData.recipientAddress}
								</p>
								<p className='text-sm text-gray-600 flex items-center mt-1'>
									<Phone className='w-4 h-4 mr-1' />
									{packageData.recipientPhone}
								</p>
							</div>
						</div>

						{/* Status History */}
						<div>
							<h3 className='font-semibold mb-4'>Status History</h3>
							<div className='space-y-3 max-h-96 overflow-y-auto'>
								{packageData.statusHistory.map((history, index) => {
									const config = statusConfig[history.status] || statusConfig.Created;
									const IconComponent = config.icon;

									return (
										<div key={history.id} className={`p-3 rounded-lg ${config.bgColor} border-l-4 border-current`}>
											<div className='flex items-center justify-between'>
												<div className='flex items-center'>
													<IconComponent className='w-4 h-4 mr-2' />
													<span className='font-medium'>{history.status}</span>
												</div>
												<span className='text-xs text-gray-500'>{new Date(history.timestamp).toLocaleString()}</span>
											</div>
											{history.notes && <p className='text-sm text-gray-600 mt-1'>{history.notes}</p>}
										</div>
									);
								})}
							</div>
						</div>
					</div>

					{/* Status Update Section */}
					{packageData.availableStatusTransitions.length > 0 && (
						<div className='border-t pt-6'>
							{!showUpdateForm ? (
								<button
									onClick={() => setShowUpdateForm(true)}
									className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
								>
									<Edit2 className='w-4 h-4 mr-2' />
									Update Status
								</button>
							) : (
								<div className='space-y-4'>
									<h4 className='font-semibold'>Update Package Status</h4>
									<div className='grid md:grid-cols-2 gap-4'>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>New Status</label>
											<select
												value={selectedStatus}
												onChange={(e) => setSelectedStatus(e.target.value)}
												className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
											>
												<option value=''>Select status...</option>
												{packageData.availableStatusTransitions.map((status) => (
													<option key={status} value={status}>
														{status}
													</option>
												))}
											</select>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>Notes (Optional)</label>
											<input
												type='text'
												value={notes}
												onChange={(e) => setNotes(e.target.value)}
												className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
												placeholder='Add notes...'
											/>
										</div>
									</div>
									<div className='flex gap-2'>
										<button
											onClick={() => setShowUpdateForm(false)}
											className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
										>
											Cancel
										</button>
										<button
											onClick={handleStatusUpdate}
											disabled={!selectedStatus || isUpdating}
											className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50'
										>
											{isUpdating ? 'Updating...' : 'Update Status'}
										</button>
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PackageDetailsModal;
