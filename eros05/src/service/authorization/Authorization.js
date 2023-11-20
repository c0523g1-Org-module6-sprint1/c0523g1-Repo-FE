import * as securityService from "../login/securityService";
import {Navigate, Outlet} from "react-router-dom";

const hasAuthorization = (allowedRole, userRole) => {
    for (let i = 0; i < allowedRole.length; i++) {
        let role = allowedRole[i];
        if (userRole === role) {
            return true;
        }
    }
    return false;
}

const HandleAuthor = ({allowedRole}) => {
    const isAuthenticated = securityService.getAccessToken();
    let userRole;
    if (isAuthenticated) {
        userRole = securityService.getRoleByJwt();
    }
    return userRole && hasAuthorization(allowedRole, userRole)
        ? (<Outlet/>) : <Navigate to={`/401`}/>
}
export {HandleAuthor}