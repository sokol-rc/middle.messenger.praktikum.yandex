type InitialStore = {
    isLoading: boolean;
    currentPage: null;
    user: Record<string, string>;
	loginFormError: string;
	isAuthSynchronized: boolean;
	isAuthLocal: boolean;
};

const initialStore: InitialStore = {
    isLoading: false,
    isAuthSynchronized: false,
    isAuthLocal: false,
    currentPage: null,
	user: {},
	loginFormError: ''
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
