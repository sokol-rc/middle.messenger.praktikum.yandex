import { Component } from 'core/Block';
import connect from 'core/connectHoc';
import { getUserInfo, saveUserInfo } from 'reducers/authReducer';
import ProfilePage from './profile';

const mstp = (state: Indexed<any>): Indexed => ({
    isLoading: () => state.isLoading,
    user: state.user,
});

const ProfilePageContainer = connect(mstp, { saveUserInfo, getUserInfo });

export default ProfilePageContainer(ProfilePage as Component);
