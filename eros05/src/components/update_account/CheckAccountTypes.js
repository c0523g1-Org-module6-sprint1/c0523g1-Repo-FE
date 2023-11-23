import * as securityService from "../../service/login/securityService";
import * as packageTypesService from "../../service/update_account/packageTypesService";

export const CheckAccountTypes = async () => {
    const id = await securityService.getIdByJwt();
    console.log(id)

    await packageTypesService.findPackageAccount(id).then(res => {
        if (res !== null){
            console.log(res[0].name)
            return res[0].name;
        }
    })
}
