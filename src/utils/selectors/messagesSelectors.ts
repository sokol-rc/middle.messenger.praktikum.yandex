export const selectOpenedDialogById = (state) => {
    const found = state.chats.dialogs.find((o) => o.chatId === state.chats.openedDialogId);
    return found;
};
