import { Package, Plus } from 'lucide-react';

const Header = ({ onCreatePackage }) => {
	return (
		<header className='bg-white shadow-sm border-b'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center py-6'>
					<h1 className='text-3xl font-bold text-gray-900 flex items-center'>
						<Package className='w-8 h-8 mr-3 text-blue-600' />
						Package Tracker
					</h1>
					<button
						onClick={onCreatePackage}
						className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
					>
						<Plus className='w-5 h-5 mr-2' />
						Create Package
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
