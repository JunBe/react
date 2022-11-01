import React,{useEffect,useState} from "react";
import './App.css'

const serverURL="http://localhost:65020/users";

function App(){
    const [userData,setUserData]=useState(null);
    const [login,setLogin]=useState(false);
    const [userConfirmData,setUserConfirmdata]=useState([{id:'IDisNull',passwd:'PasswdIsNull'}]);
    const [text,setText]=useState("");
   
    const getUserData = () =>{
        fetch(serverURL)
        .then((res)=>res.json())
        .then((data)=>setUserData(data))
        .then(console.log(userData))
    }

    
    const getUserConfirmData = () => {
        fetch(serverURL+'/confirm')
        .then((res)=>res.json())
        .then((data)=>setUserConfirmdata(data))
        .then(console.log(userConfirmData))
        .then(userConfirmData===null?(console.log("널이에요!.id 못들어감")):console.log(userConfirmData[0]))
    }
    useEffect(getUserData,[]);
    useEffect(getUserConfirmData,[]);



    const onSubmitHandler = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const id = event.target.id.value;
        const passwd = event.target.passwd.value;
        console.log("Submit버튼 클릭후 서버로 POST전송");

        fetch(serverURL,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name,id,passwd})
        }).then(getUserData())
    }

    const onSubmitHandler2=(event)=>{
        // {(text==="id와 비밀번호가 맞으면")?(
        //     setText("그런 회원은 없습니다")
        //     ):(
        //         setText("회원으로 확인 되었습니다.")
        // )}
        event.preventDefault();
        const id= event.target.id.value;
        const passwd=event.target.passwd.value;
        console.log("Submit2 버튼 클릭 후 서버로 id,pw POST로 넘기기")
        
        fetch(serverURL+"/confirm",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({id,passwd}) 
        }).then(getUserConfirmData()) 
        
        {login===false&&setText("그런 회원은 없습니다")};
        {login===true&&setText("회원확인 됐습니다")};
        
    }

    return(
        <>
        <div>
            <h2>회원등록</h2>
            <form onSubmit={onSubmitHandler}>
                <input type="text" name="name" placeholder="이름" />
                <input type="text" name="id" placeholder="아이디" />
                <input type="text" name="passwd" placeholder="암호" />
                <button type="submit">등록</button>
            </form>
        </div>
        <p></p>
        <div>
            <h2>회원확인</h2>
            <form onSubmit={onSubmitHandler2}> 
                <input type="text" name="id" placeholder="아이디" />
                <input type="text" name="passwd" placeholder="암호" />
                <button type="submit">등록</button>
                {/* 여기에 로그인 여부 알려줘야함 */}
                {(userData===null)?(
                    <p>서버에서 데이터를 가져오는중...</p>
                ):(
                    userData.map((user,i)=>(
                        
                        <h1>{(login===false)?(
                            <h1>{(user.id===userConfirmData[0].id&&user.passwd===userConfirmData[0].passwd)?(
                                setLogin(true)
                            ):(
                                console.log("아이디 비번틀림")
                            )}</h1>
                        ):(
                            // <h1>{(user.id===userConfirmData[0].id&&user.passwd===userConfirmData[0].passwd)?(
                            //     console.log("회원입니다")
                            // ):(
                            //     setLogin(false)
                            // )}</h1>
                            console.log("vv")
                        )}</h1>

                            
                            
                    
                    ))
                )}
                
            </form>
                    
            <h1 className="id_yesno">{text}</h1>
            
            
            {/* 서버로 id,pw 보내기 ->  */}
        </div>
        <p></p>
        <div>
            <h2>회원 목록</h2>
            <ol>
                {(userData===null)?(
                    <p>서버에서 데이터를 가져오는중...</p>
                ):(
                    userData.map((user,i)=>(
                        <li key={user.keyid}>{user.name} {user.id} {user.passwd}</li>
                    ))
                )}
                {/* <p>----------------------</p>
                {(userConfirmData===null)?(
                    <p>서버에서 데이터를 가져오는중...</p>
                ):(
                    userConfirmData.map((user,i)=>(
                        <li>{user.id} {user.passwd}</li>
                    ))
                )} */}
            </ol>
        </div>
        </>
    )
}

export default App;