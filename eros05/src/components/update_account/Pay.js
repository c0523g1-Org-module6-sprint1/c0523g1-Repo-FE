import * as packageDetailService from "../../service/update_account/packageDetailService";
import {getIdByJwt} from "../../service/login/securityService";

export const load = () => {
    window.location.reload();
}
export const paySucces = async (accountTypesId) => {
    // let idAccount = getIdByJwt
    // console.log("id của account" + idAccount);
    let status = await packageDetailService.setAccountTypesToAccount({"account": 2, "accountTypes": accountTypesId})
    // console.log(status)
    if (status === 200) {
        console.log("Thứ hạng đã thay đổi")
    }
}
export const setMoneyToPaySuccess = async (newMoney) => {
    let status = await packageDetailService.setMoneyAccount({"idAccount": 2, "newMoney": newMoney})
    console.log(status)
    if (status === 200) {
        console.log("Tiền đã thay đổi");
    }
}
export const resetRadioButtons = async () => {
    var form = await document.getElementById("myForm");

    // Lặp qua tất cả các phần tử input trong form
    var inputs = await form.getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type === "radio") {
            // Đặt giá trị checked của radio button về false
            inputs[i].checked = false;
        }
    }
}