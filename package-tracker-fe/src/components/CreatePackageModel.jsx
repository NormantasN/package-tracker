import React, { useState } from 'react';
import { User, MapPin } from 'lucide-react';
import { api } from '../services/api';

const CreatePackageModal = ({ isOpen, onClose, onSuccess }) => {
	const [formData, setFormData] = useState({
		senderName: '',
		senderAddress: '',
		senderPhone: '',
		recipientName: '',
		recipientAddress: '',
		recipientPhone: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const resetForm = () => {
		setFormData({
			senderName: '',
			senderAddress: '',
			senderPhone: '',
			recipientName: '',
			recipientAddress: '',
			recipientPhone: '',
		});
		setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			await api.createPackage(formData);
			onSuccess();
			onClose();
			resetForm();
		} catch (err) {
			setError('Failed to create package. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleClose = () => {
		onClose();
		resetForm();
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
			<div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
				<div className='p-6'>
					<h2 className='text-2xl font-bold mb-6'>Create New Package</h2>

					{error && <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>{error}</div>}

					<form onSubmit={handleSubmit} className='space-y-6'>
						<div className='grid md:grid-cols-2 gap-6'>
							{/* Sender Information */}
							<div>
								<h3 className='text-lg font-semibold mb-4 flex items-center'>
									<User className='w-5 h-5 mr-2' />
									Sender Information
								</h3>
								<div className='space-y-4'>
									<input
										type='text'
										placeholder='Sender Name'
										value={formData.senderName}
										onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
										className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										required
									/>
									<textarea
										placeholder='Sender Address'
										value={formData.senderAddress}
										onChange={(e) => setFormData({ ...formData, senderAddress: e.target.value })}
										className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none'
										required
									/>
									<input
										type='tel'
										placeholder='Sender Phone'
										value={formData.senderPhone}
										onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
										className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										required
									/>
								</div>
							</div>

							{/* Recipient Information */}
							<div>
								<h3 className='text-lg font-semibold mb-4 flex items-center'>
									<MapPin className='w-5 h-5 mr-2' />
									Recipient Information
								</h3>
								<div className='space-y-4'>
									<input
										type='text'
										placeholder='Recipient Name'
										value={formData.recipientName}
										onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
										className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										required
									/>
									<textarea
										placeholder='Recipient Address'
										value={formData.recipientAddress}
										onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
										className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none'
										required
									/>
									<input
										type='tel'
										placeholder='Recipient Phone'
										value={formData.recipientPhone}
										onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
										className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										required
									/>
								</div>
							</div>
						</div>

						<div className='flex gap-4 pt-6'>
							<button
								type='button'
								onClick={handleClose}
								className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
								disabled={isLoading}
							>
								Cancel
							</button>
							<button
								type='submit'
								className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50'
								disabled={isLoading}
							>
								{isLoading ? 'Creating...' : 'Create Package'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreatePackageModal;
