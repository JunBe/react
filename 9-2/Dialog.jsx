import React from "react";
import './Dialog.css';

function DialogParents(props){
    return(
        <div className={'frame-'+ props.color}>
            {props.children}
        </div>
    )
}
function Dialog(props){
    return(
        <DialogParents color={props.color}>
            <div>
                <h1>
                    {props.title} {/* 환영컴포넌트 */}
                </h1>
                <p>
                    {props.message} {/*안녕하세요!*/}
                </p>
                {props.btn=="yes"?<button>버튼</button>:""}
            </div>
        </DialogParents>
    )

}

function WarningDialog(){
    return(
        <Dialog title="경고다이얼로그" message="경고!!!!!!" btn="yes" color="yellow"/>
    )
}
function WelcomeDialog(){
    return(
        <Dialog title="인삿말컴포넌트" message="안녕하세요!" btn="no" color="blue">
        </Dialog>
    )
}

function ErrorDialog(){
    return(
        <Dialog title="오류다이얼로그" message="에러입니다!" btn="no" color="red" />
    )

}

function NoticeDialog(){
    return(
        <Dialog title="공지사항다이얼로그" message="공지입니다!" btn="yes" color="black"/>
    )

}

function Main(){
    return(
        <div>
            <WarningDialog/>
            <WelcomeDialog/>
            <ErrorDialog/>
            <NoticeDialog/>
        </div>
    )
}
export default Main;