import { DialogType } from 'core/store/initial-store';
import { MessageTransferedType } from 'reducers/transferedTypes';

export const isMessageInDialog = (
    outsideMessage: MessageTransferedType,
    dialog: DialogType
) => {
    if (!Array.isArray(dialog.days)) {
        throw Error('dialog days not array');
    }

    if (dialog.days.length === 0) {
        return false;
    }

    // eslint-disable-next-line consistent-return
    dialog.days.forEach((day) => {
        if (!Array.isArray(day.messages)) {
            throw Error('day messages not array');
        }
        const foundMessage = day.messages.find(
            (message) => message.id === outsideMessage.id
        );
        if (typeof foundMessage !== 'undefined') {
            return true;
        }
    });
    return false;
};

export const getMessageDirection = (
    userIdInMessage: number,
    currentUserId: number
) => {
    if (userIdInMessage === currentUserId) {
        return 'outgoing';
    }
    return 'incoming';
};
