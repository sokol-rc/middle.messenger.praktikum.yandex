import connect from "core/connectHoc";
import ProfilePage from "./profile";


const mstp = (state: Indexed<any>): Indexed => ({
    isLoading: () => state.isLoading,
    store: window.store,
    user: window.store.getState().user,
});

const ProfilePageContainer = connect(mstp);
console.log('mstp to profile');

export default ProfilePageContainer(ProfilePage);
