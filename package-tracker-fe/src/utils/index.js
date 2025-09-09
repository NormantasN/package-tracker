/**
 * Format date to a readable string
 * @param {string | Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
	if (!date) return 'N/A';

	const dateObj = date instanceof Date ? date : new Date(date);

	if (isNaN(dateObj.getTime())) return 'Invalid Date';

	return dateObj.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};

/**
 * Format date and time to a readable string
 * @param {string | Date} date - The date to format
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date) => {
	if (!date) return 'N/A';

	const dateObj = date instanceof Date ? date : new Date(date);

	if (isNaN(dateObj.getTime())) return 'Invalid Date';

	return dateObj.toLocaleString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidPhone = (phone) => {
	const phoneRegex = /^[\+]?[\s\-\(\)]*([0-9][\s\-\(\)]*){10,}$/;
	return phoneRegex.test(phone);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
	if (!text || text.length <= maxLength) return text;
	return text.substring(0, maxLength) + '...';
};

/**
 * Generate a random ID
 * @returns {string} Random ID
 */
export const generateId = () => {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

/**
 * Deep clone an object
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
export const deepClone = (obj) => {
	if (obj === null || typeof obj !== 'object') return obj;
	if (obj instanceof Date) return new Date(obj.getTime());
	if (obj instanceof Array) return obj.map((item) => deepClone(item));
	if (typeof obj === 'object') {
		const clonedObj = {};
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				clonedObj[key] = deepClone(obj[key]);
			}
		}
		return clonedObj;
	}
};

/**
 * Check if string is empty or only whitespace
 * @param {string} str - String to check
 * @returns {boolean} True if empty or whitespace
 */
export const isEmpty = (str) => {
	return !str || str.trim().length === 0;
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeWords = (str) => {
	if (!str) return '';
	return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

/**
 * Format tracking number for display
 * @param {string} trackingNumber - Tracking number to format
 * @returns {string} Formatted tracking number
 */
export const formatTrackingNumber = (trackingNumber) => {
	if (!trackingNumber) return '';
	// Add spaces every 4 characters for better readability
	return trackingNumber.replace(/(.{4})/g, '$1 ').trim();
};

/**
 * Calculate time difference in human readable format
 * @param {string | Date} date - Date to compare with now
 * @returns {string} Human readable time difference
 */
export const getTimeAgo = (date) => {
	if (!date) return '';

	const now = new Date();
	const past = new Date(date);
	const diffInMs = now - past;

	const seconds = Math.floor(diffInMs / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
	if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
	if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
	return 'Just now';
};
