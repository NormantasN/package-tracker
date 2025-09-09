import { Search, Filter } from 'lucide-react';
import { statusOptions } from '../constants';

const SearchFilter = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, onSearch }) => {
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			onSearch();
		}
	};

	return (
		<div className='mb-6 bg-white p-4 rounded-lg shadow-sm'>
			<div className='flex flex-wrap gap-4 items-end'>
				<div className='flex-1 min-w-64'>
					<label className='block text-sm font-medium text-gray-700 mb-2'>Search by Tracking Number</label>
					<div className='relative'>
						<Search className='absolute left-3 top-3 w-4 h-4 text-gray-400' />
						<input
							type='text'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder='Enter tracking number...'
							onKeyPress={handleKeyPress}
						/>
					</div>
				</div>

				<div className='min-w-48'>
					<label className='block text-sm font-medium text-gray-700 mb-2'>Filter by Status</label>
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
					>
						{statusOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>

				<button
					onClick={onSearch}
					className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center'
				>
					<Filter className='w-4 h-4 mr-2' />
					Search
				</button>
			</div>
		</div>
	);
};

export default SearchFilter;
