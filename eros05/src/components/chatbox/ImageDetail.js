import {useEffect, useState} from "react";
import {database, onValue, refText, orderByChild, query, equalTo} from "../../service/chatbox/firebase";
import {dateFormat} from "../../service/chatbox/util";
export default function ImageDetail({path, linkImg, close}) {
    const [indexPic, setIndexPic] = useState(-1);
    const [picArray, setPicArray] = useState();
    const [timeRelease, setTimeRelease] = useState();
    const [currentImg, setCurrentImg] = useState(linkImg);

    const selectImage = (index) => {
        const e = picArray[index];
        setCurrentImg(e.context);
        setTimeRelease(e.release);
        setIndexPic(index);
    }
    const moveImg = (count) => {
        if (!((indexPic == 0 && count == -1) || (indexPic == picArray.length - 1 && count == 1))) {
            const newIndex = indexPic + count;
            setIndexPic(newIndex);
            selectImage(newIndex);
        }
    }
    const getDatabase = () => {
        const db = refText(database, path);
        const queryDb = query(db, orderByChild("type"), equalTo("image"));
        let getMessage = [];
        onValue(queryDb, data => {
            data.forEach((mess) => {
                getMessage.push(mess.val());
            });
            setPicArray(getMessage);
        });
            for (let i = 0; i < getMessage.length; i++) {
                if (linkImg == getMessage[i].context) {
                    setIndexPic(i);
                    setTimeRelease(getMessage[i].release);
                    break;
                }
        }
    }

    useEffect(() => {
        getDatabase();

    },[]);

    if (!picArray || !timeRelease) return null;
    return (
        <div className="array-image"
             style={{height: `${window.innerHeight * 0.96 - 75}px`}}>
            <div className="array-image-array borderRadius color3">
                {picArray.map((e, index) => {
                    return (
                        <div className={`array-image-array-image borderRadius 
                        ${index == indexPic ? "array-image-array-image-select" : "array-image-array-image-unselect"}`}
                        style={{backgroundImage: `url("${e.context}")`}}
                        onClick={() => {selectImage(index)}}/>
                    )
                })}
            </div>
            <div className="array-image-detail" style={{backgroundImage: `url("${currentImg}")`}}/>
            <div className="array-image-close hover-button" title="Close" onClick={close}/>
            <div className="array-image-prev hover-button" title="Previous" onClick={() => {moveImg(-1)}}/>
            <div className="array-image-next hover-button" title="Next" onClick={() => {moveImg(1)}}/>
            <p className="array-image-time">{dateFormat(timeRelease)}</p>
        </div>
    )
}