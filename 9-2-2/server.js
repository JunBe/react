const express=require('express');
const app = express();
const path=require('path');
const bodyParser=require('body-parser');

app.use(express.json());
app.use(express.static(path.join(__dirname,'my-app/build')));
app.use(bodyParser.urlencoded({extended:false}));

var keyid=3;
var userList=[
    {keyid:1,name:"홍길동",id:"kdhong",passwd:"1111"},
    {keyid:2,name:"박길동",id:"kdpark",passwd:"1111"}
];
var userConfirmList=[{id:"IDisNull!",passwd:"PasswdIdNull!"}];

const mainPage = (req,res) => {
    res.sendFile(path.join(__dirname,'my-app/build/index.html'));
}

const listUsers=(req,res) => {
    console.log("회원명단 조회요청을 받았으며, 리액트에게 명단을 보냅니다.")
    res.json(userList);
}

const addUser = (req,res) => {
    const { name, id, passwd } = req.body;
userList.push({ keyid : keyid++, name, id, passwd });
console.log("회원등록요청을 완료하였으며, 이를 반영한 전체목록입니다.");
userList.map((user, i) => { // 수신되었다면 목록으로 처리
console.log(user.keyid + "." + user.name + "." + user.id + "." + user.passwd);
})
return res.send('success');
}

const listConfirmUser = (req,res) => {
    console.log("회원 id,pw 를 받았습니다.");
    res.json(userConfirmList);
}
const confirmUser = (req,res) => {
    const {id,passwd}=req.body;
    userConfirmList.shift();
    userConfirmList.push({id,passwd});
    console.log(userConfirmList);
    return res.send('success')
} 

app.get("/",mainPage);
app.get("/users",listUsers);
app.post("/users",addUser);
app.get("/users/confirm",listConfirmUser);
app.post("/users/confirm",confirmUser)

app.listen(65020,()=>{
    console.log("---------------------");
    console.log("(리액트 연동용)웹서버 실행중 ...");
    console.log("접속주소: http://localhost:65020/");
    console.log("---------------------");
})

