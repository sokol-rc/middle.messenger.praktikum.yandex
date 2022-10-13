import connect from 'core/connectHoc';
import LoginPage from './login';

const mstp = (state: Indexed<any>): Indexed => ({
	isLoading: () => (state.isLoading),
	store: window.store,
});

const LoginPageWithLoader = connect(mstp);

export default LoginPageWithLoader(LoginPage);
