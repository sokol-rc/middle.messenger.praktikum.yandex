export const isMessageInDialog = (outsideMessage, dialog) => { 
	if (!Array.isArray(dialog.days)) { 
		throw Error('dialog days not array');
	}

	if (dialog.days.length === 0) { 
		return false;
	}

	dialog.days.forEach((day) => { 
		if (!Array.isArray(day.messages)) { 
			throw Error('day messages not array');
		}
		const foundMessage = day.messages.find((message) => message.id === outsideMessage.id)
		if (typeof foundMessage !== 'undefined') { 
			return true;
		}
	})
	return false;
}

export const getMessageDirection = (userIdInMessage, currentUserId) => { 
	if (userIdInMessage === currentUserId) { 
		return 'outgoing';
	}
	return 'incoming';
}
