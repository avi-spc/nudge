export const notificationMessage = (nType) => {
	switch (nType) {
		case 'follow':
			return 'has followed you';
		case 'like':
			return 'has liked your post';
		case 'comment':
			return 'has commented on your post';
	}
};
