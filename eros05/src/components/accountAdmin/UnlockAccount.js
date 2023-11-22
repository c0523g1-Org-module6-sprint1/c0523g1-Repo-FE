import {toast} from "react-toastify";
import { unlock} from "../../service/accountAdmin/AdminAccountService";

export function UnlockAccount({ showUnlock, handleCloseUnlock, selectUnlock }) {
    const handleUnlock = async () => {
        try {
            const res = await unlock(selectUnlock.id)
            if (res.status === 200) {
                handleCloseUnlock();
                console.log()
                toast("Mở Khoá Thành Công");
            } else {
                toast.error("Mở Khoá Thất Bại");
            }
        } catch (error) {
            toast.error("Mở Khoá Thất Bại");
        }
    };

    return (
        <>
            {showUnlock && (
                <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Unlock</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleCloseUnlock}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có muốn mở tài khoản {selectUnlock.userName} này không?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={handleCloseUnlock}
                                >
                                    Tắt
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleUnlock}
                                >
                                    Mở Khoá
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}