import {database, onValue, query, refText} from "./firebase";
import {sliceString} from "./util";

export function getLastMess(ownId, eleId) {
    let result;
    let path = `mess-${ownId < eleId ? ownId + "-" + eleId : eleId + "-" + ownId}`;
    const messQuery = query(
        refText(database, path + "/last")
    );
    onValue(messQuery, (data) => {
        let message = data.val();
        if (message) {
            if (message.type == "image") {
                result = "[Hình ảnh]";
            } else {
                result = sliceString(message.context, 15);
            }
        } else {
            result = "...";
        }
    })
    return result;
}