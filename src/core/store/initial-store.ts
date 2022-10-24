type InitialStore = {
    isLoading: boolean;
    currentPage: null;
    user: Record<string, string>;
    chats: Record<string, any>;
	loginFormError: string;
	registrationFormError: string;

};

const initialStore: InitialStore = {
    isLoading: false,
    currentPage: null,
	user: {},
	chats: {
		chatsList: null,
		openedDialogId: 430,
		dialogs: [
			{
				chatId: null,
				socket: null,
				isSocketReady: false,
				usersDisplayName: [{
					userId: null,
					userDisplayName: null
				}],
				days: [
					{
						id: null,
						messages: []
					}
				]
			}
		]
	},
	loginFormError: '',
	registrationFormError: ''
};

export default initialStore;


// {
//   "id": 5456
// }


// {
// 	"first_name": "Evgeniy",
// 	"second_name": "Sokolovskiy",
// 	"login": "sokol-rc",
//	"display_name": "Petya Pupkin",
// 	"email": "cokol-rc@yandex.ru",
// 	"password": "123QWEjkl",
// 	"phone": "+79313613301"
//   }
