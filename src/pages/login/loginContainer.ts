import { Component } from 'core/Block';
import connect from 'core/connectHoc';
import { doLogin, doLogout } from '../../reducers/authReducer';
import LoginPage from './login';

const mstp = (state: Indexed<any>): Indexed => ({
    isLoading: state.isLoading,
    user: state.user,
    loginFormError: state.loginFormError,
});

const LoginPageContainer = connect(mstp, {
    doLogin,
    doLogout,
});

export default LoginPageContainer(LoginPage as Component);
