
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";
export const GoogleAuthButton = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyAAqOX_M8JutrlBNsRQ4GcT4h-gssWdv6o",
        authDomain: "duntem.firebaseapp.com",
        projectId: "duntem",
        storageBucket: "duntem.appspot.com",
        messagingSenderId: "817232218754",
        appId: "1:817232218754:web:5adca14a6f491db149429b",
        measurementId: "G-CFTRSY5P30"
      };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const handleGoogleLogin =() => {
        const provider = new GoogleAuthProvider(); // provider를 구글로 설정
        signInWithPopup(auth, provider) // popup을 이용한 signup
          .then((data) => {
            setUserData(data.user); // user data 설정
            console.log(data) // console로 들어온 데이터 표시
          })
          .catch((err) => {
            console.log(err);
          });
      }
    return(
        <button onClick={()=>{handleGoogleLogin()}}>구글을 통한 로그인</button>
    )
}