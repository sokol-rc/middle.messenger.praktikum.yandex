import connect from "core/connectHoc";
import { doRegistrtation } from "../../reducers/authReducer";
import RegistrationPage from "./registration";


const mstp = (state: Indexed<any>): Indexed => ({
    isLoading: state.isLoading,
    store: window.store,
    user: window.store.getState().user,
    registrationFormError: window.store.getState().registrationFormError,
});


const RegistrationPageContainer = connect(mstp, { doRegistrtation });

export default RegistrationPageContainer(RegistrationPage);
