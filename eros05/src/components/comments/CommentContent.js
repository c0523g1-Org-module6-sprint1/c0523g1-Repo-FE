import React, {useEffect, useState} from 'react';

function CommentContent(props) {
    const commentId = props;
    const [dropdownOpen, setDropdownOpen] = useState(false)



    // chỉnh sủa và xoá
    const handleDropDown = () => {
        setDropdownOpen(!dropdownOpen);
    }
    useEffect(() => {

    }, [commentId]);

    return (
        <>
            <div>
                <button
                    style={{
                        background: "none", border: "none", padding: 0,
                        position: "relative", left: 5, top: 20
                    }}
                    onClick={handleDropDown}>
                    <i className="fa-solid fa-ellipsis"></i>
                </button>
                {dropdownOpen && (
                    <ul style={{listStyleType : "none" }}>
                        <li>Chỉnh sửa</li>
                        <li>Xoá</li>
                    </ul>
                )}
            </div>
        </>
    );
}

export default CommentContent;