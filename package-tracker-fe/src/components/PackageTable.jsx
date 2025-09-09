import { Package, Calendar, Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { statusConfig } from '../constants';

const PackageTable = ({ packages, onViewDetails, onStatusUpdate }) => {
	const getQuickActions = (pkg) => {
		return pkg.availableStatusTransitions.map((status) => (
			<button
				key={status}
				onClick={() => onStatusUpdate(pkg.id, status)}
				className={`px-2 py-1 text-xs rounded ${
					statusConfig[status]?.color || 'bg-gray-100 text-gray-800'
				} hover:opacity-80 transition-opacity`}
				title={`Change to ${status}`}
			>
				{status}
			</button>
		));
	};

	if (packages.length === 0) {
		return (
			<div className='bg-white rounded-lg shadow-sm overflow-hidden'>
				<div className='text-center py-12'>
					<Package className='w-12 h-12 text-gray-400 mx-auto mb-4' />
					<p className='text-gray-500'>No packages found</p>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white rounded-lg shadow-sm overflow-hidden'>
			<div className='overflow-x-auto'>
				<table className='min-w-full'>
					<thead className='bg-gray-50'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Tracking Number
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Sender</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Recipient
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Created
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Quick Actions
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Details
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{packages.map((pkg) => (
							<tr key={pkg.id} className='hover:bg-gray-50'>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='font-mono text-sm'>{pkg.trackingNumber}</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm font-medium text-gray-900'>{pkg.senderName}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm font-medium text-gray-900'>{pkg.recipientName}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<StatusBadge status={pkg.currentStatus} />
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
									<div className='flex items-center'>
										<Calendar className='w-4 h-4 mr-1' />
										{new Date(pkg.createdAt).toLocaleDateString()}
									</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex gap-1 flex-wrap'>{getQuickActions(pkg)}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() => onViewDetails(pkg.id)}
										className='text-blue-600 hover:text-blue-800 flex items-center'
									>
										<Eye className='w-4 h-4 mr-1' />
										View
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PackageTable;
