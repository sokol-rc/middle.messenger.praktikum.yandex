export type SendMessageType = {
    message: string;
    socket: WebSocket;
};

export type LoginDataType = {
    login: string;
    password: string;
};
export type UserProfileType = {
    id?: number;
    avatar?: string;
    oldPassword: string;
    newPassword: string;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
};
export type ChangePasswordType = {
    oldPassword: string;
    newPassword: string;
};
