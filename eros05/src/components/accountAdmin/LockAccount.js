import {toast} from "react-toastify";
import {remove} from "../../service/accountAdmin/AdminAccountService";

export function LockAccount({show, handleClose, select}) {


    const handleDelete = async () => {

        const res = await remove(select)
        console.log(res)
        if (res.status === 200) {
            handleClose()
            toast("Khoá Thành Công")
        } else {
            toast.error("Khoá Thất Bại")
        }
    }
    console.log(select)
    return (
        <>
            {
                show && (
                    <div className="modal" tabIndex="-1" style={{display: 'block'}}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Khoá Tài Khoản</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                            onClick={handleClose}></button>
                                </div>
                                <div className="modal-body">
                                    {/* eslint-disable-next-line react/prop-types */}
                                    <p>Bạn Muốn Khoá Các Tài Khoản Đã Chọn Không ? </p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                            onClick={handleClose}>Huỷ
                                    </button>
                                    <button type="button" className="btn btn-danger"
                                            onClick={() => handleDelete(select)}>Khoá
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )

}