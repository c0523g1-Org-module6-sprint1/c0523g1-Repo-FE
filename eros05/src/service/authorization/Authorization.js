import {getRoleByJwt} from "../login/securityService";
import * as securityService from "../login/securityService";

const Authorization = ({roles}) => {
    const userRole = securityService.getRoleByJwt();

}