import React from 'react';

function CommentContent({content, accountName, date, avatar, postId}) {
    // function formatDate = (date) =>{
    //     let formatedDate = '';
    //     if (date){
    //         formatedDate =
    //     }
    // }



    return (
        <div>
            <div className="" style={{marginTop: 10, display: "flex", width: "100%"}}>
                <div className="" style={{marginRight: 20}}>
                    <img src={avatar}
                        alt="Avatar"
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            position: "relative",
                            left: 12
                        }}>
                        {avatar ? '' : accountName?.charAt(0)?.toUpperCase()}
                    </img>
                </div>
                <div className=" w-auto"
                    style={{
                        border: "1px solid #ccc",
                        padding: 5,
                        position: "relative",
                        borderRadius: 20}}>
                    <div>
                        <b style={{color: "black"}}>{accountName}</b>
                    </div>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
}

export default CommentContent;