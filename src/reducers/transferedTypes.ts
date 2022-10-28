export type AllUsersTransferedType = {
    id: string;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
};

export type MessageType = {
    id: string;
    time: string;
    user_id: string;
    content: string;
    type: 'message';
};
