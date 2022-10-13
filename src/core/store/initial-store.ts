type InitialStore = {
    isLoading: boolean;
    currentPage: null;
    user: any | null;
    isAuth: boolean;
};

const initialStore: InitialStore = {
    isLoading: false,
    currentPage: null,
	user: {
		login: "sokol-rc",
		password: ""
	},
    isAuth: false,
};

export default initialStore;


// {
//   "id": 5456
// }


// {
// 	"first_name": "Evgeniy",
// 	"second_name": "Sokolovskiy",
// 	"login": "sokol-rc",
// 	"email": "cokol-rc@yandex.ru",
// 	"password": "123QWEjkl",
// 	"phone": "+79313613301"
//   }
