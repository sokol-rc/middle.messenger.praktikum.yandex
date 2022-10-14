import connect from 'core/connectHoc';
import withAuthRedirect from '../../hoc/with-auth-redirect';
import LoginPage from './login';

const mstp = (state: Indexed<any>): Indexed => ({
    isLoading: () => state.isLoading,
    store: window.store,
    user: window.store.getState().user,
    loginFormError: window.store.getState().loginFormError,
});

const LoginPageWithLoader = connect(mstp);
//const LoginPageWithAuth = withAuthRedirect(LoginPage)

export default LoginPageWithLoader(LoginPage);
