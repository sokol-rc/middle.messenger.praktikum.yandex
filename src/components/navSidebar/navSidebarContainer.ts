import { Component } from 'core/Block';
import connect from 'core/connectHoc';
import { doLogout } from 'reducers/authReducer';
import NavSidebar from './navSidebar';

const mstp = (state: Indexed<any>): Indexed => ({
    user: state.user,
});

const NavSidebarContainer = connect(mstp, { doLogout });

export default NavSidebarContainer(NavSidebar as Component);
