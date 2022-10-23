import connect from "core/connectHoc";
import NavSidebar from "./navSidebar";


const mstp = (state: Indexed<any>): Indexed => ({
    user: state.user,
});

const NavSidebarContainer = connect(mstp, {});

export default NavSidebarContainer(NavSidebar);
