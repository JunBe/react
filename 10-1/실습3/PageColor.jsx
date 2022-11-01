import React,{useState,useContext} from "react";
import './PageColor.css';

const ColorContext = React.createContext(null);

function PageColor(){
    const[isDark,setIsDark]=useState(false);

    return(
        <ColorContext.Provider value={{isDark,setIsDark}}>
            <Page />
        </ColorContext.Provider>
    )
}

function Page(){
    return(
        <div className="page">
            <Header />
            <Content />
            <Footer />
        </div>
    )
}

function Header(){
    const {isDark}=useContext(ColorContext);
    return(
        <header className="header"
            style={{backgroundColor:isDark?'black':'lightgray',
                    color:isDark?'white':'black'}}>
                        <h2>컨텍스트 사용강의</h2>
                    </header>  
    )
}

function Content(){
    const {isDark} = useContext(ColorContext);
    return(
        <content className="content"
            style={{backgroundColor:isDark?'black':'lightgray',
            color:isDark?'white':'black',
            }}><p>오늘은리액트 10주차 강의이며, Context를 배우고 있습니다.</p></content>
            
    )
}

function Footer(){
    const{isDark,setIsDark} =useContext(ColorContext);
    const toggleColor = () =>{setIsDark(!isDark);}
    return(
        <footer className="footer"
            style={{
                backgroundColor:isDark?'black':'lightgray',
                color:isDark?'white':'black'
            }}>
                <button className="button" onClick={toggleColor}>색상반전</button>
            </footer>
    )
}

export default PageColor;