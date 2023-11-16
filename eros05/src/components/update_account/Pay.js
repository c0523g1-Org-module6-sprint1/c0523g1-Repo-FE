import * as packageDetailService from "../../service/update_account/packageDetailService";

export const load = () => {
    window.location.reload();
}
export const paySucces = async (accountTypesId) => {
    let status = await packageDetailService.setAccountTypesToAccount({"account": 5, "accountTypes": accountTypesId})
    console.log(status)
    if (status === 200) {
        console.log("Thứ hạng đã thay đổi")
    }
}