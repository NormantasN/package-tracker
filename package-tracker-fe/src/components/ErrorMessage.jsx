import { AlertCircle, X } from 'lucide-react';

const ErrorMessage = ({ message, onDismiss }) => {
	if (!message) return null;

	return (
		<div className='mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center justify-between'>
			<div className='flex items-center'>
				<AlertCircle className='w-5 h-5 mr-2' />
				<span>{message}</span>
			</div>
			{onDismiss && (
				<button onClick={onDismiss} className='text-red-500 hover:text-red-700 ml-4'>
					<X className='w-4 h-4' />
				</button>
			)}
		</div>
	);
};

export default ErrorMessage;
