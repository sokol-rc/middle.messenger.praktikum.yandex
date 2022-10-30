import { LastMessage } from 'reducers/transferedTypes';
import { BadRequestType } from 'utils/api/apiTypes';

export function apiHasErrors(resp: any): resp is BadRequestType {
    return resp && resp.reason;
}

export function isHasLastMessage(
    lastMessage: LastMessage | unknown
): lastMessage is LastMessage {
    return (lastMessage as LastMessage).content !== undefined;
}
