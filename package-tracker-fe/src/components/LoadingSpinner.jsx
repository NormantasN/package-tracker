const LoadingSpinner = ({ message = 'Loading...' }) => {
	return (
		<div className='flex flex-col justify-center items-center py-12'>
			<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4'></div>
			<p className='text-gray-500'>{message}</p>
		</div>
	);
};

export default LoadingSpinner;
