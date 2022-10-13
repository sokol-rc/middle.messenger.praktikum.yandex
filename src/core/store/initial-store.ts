type InitialStore = {
    isLoading: boolean;
    currentPage: null;
    user: null;
    isAuthorized: boolean;
};

const initialStore: InitialStore = {
    isLoading: false,
    currentPage: null,
    user: null,
    isAuthorized: false,
};

export default initialStore;
