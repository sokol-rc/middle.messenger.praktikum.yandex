import { ChatsStoreType, DialogType } from 'core/store/initial-store';

export const selectOpenedDialogById = (state: Indexed): DialogType | null => {
	
    const chats = state?.chats as ChatsStoreType;
    const found = chats.dialogs.find(
        (o: DialogType) => o.chatId === chats.openedDialogId
    );
    if (typeof found !== 'undefined') {
        return found;
	}
	return null;
};
