import { Component } from 'core/Block';
import connect from 'core/connectHoc';
import { doRegistrtation } from '../../reducers/authReducer';
import RegistrationPage from './registration';

const mstp = (state: Indexed<any>): Indexed => ({
    isLoading: state.isLoading,
    registrationFormError: state.registrationFormError,
});

const RegistrationPageContainer = connect(mstp, { doRegistrtation });

export default RegistrationPageContainer(RegistrationPage as Component);
