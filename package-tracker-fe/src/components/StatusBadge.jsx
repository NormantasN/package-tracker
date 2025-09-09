import { statusConfig } from '../constants';

const StatusBadge = ({ status }) => {
	const config = statusConfig[status] || statusConfig.Created;
	const IconComponent = config.icon;

	return (
		<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
			<IconComponent className='w-3 h-3 mr-1' />
			{status}
		</span>
	);
};

export default StatusBadge;
