import connect from 'core/connectHoc';
import { disableLoader, doLogin, doLogout, enableLoader, setloginFormError } from '../../reducers/authReducer';
import LoginPage from './login';

const mstp = (state: Indexed<any>): Indexed => ({
    isLoading: state.isLoading,
    store: window.store,
    user: window.store.getState().user,
    loginFormError: window.store.getState().loginFormError,
});

const LoginPageContainer = connect(mstp, { doLogin, doLogout, enableLoader, disableLoader, setloginFormError });

export default LoginPageContainer(LoginPage);
