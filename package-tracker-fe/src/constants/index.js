import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';

export const statusConfig = {
	Created: {
		color: 'bg-gray-100 text-gray-800',
		icon: Package,
		bgColor: 'bg-gray-50',
	},
	Sent: {
		color: 'bg-blue-100 text-blue-800',
		icon: Truck,
		bgColor: 'bg-blue-50',
	},
	Accepted: {
		color: 'bg-green-100 text-green-800',
		icon: CheckCircle,
		bgColor: 'bg-green-50',
	},
	Returned: {
		color: 'bg-yellow-100 text-yellow-800',
		icon: Clock,
		bgColor: 'bg-yellow-50',
	},
	Canceled: {
		color: 'bg-red-100 text-red-800',
		icon: XCircle,
		bgColor: 'bg-red-50',
	},
};

export const statusOptions = [
	{ value: '', label: 'All Statuses' },
	{ value: 'Created', label: 'Created' },
	{ value: 'Sent', label: 'Sent' },
	{ value: 'Accepted', label: 'Accepted' },
	{ value: 'Returned', label: 'Returned' },
	{ value: 'Canceled', label: 'Canceled' },
];
