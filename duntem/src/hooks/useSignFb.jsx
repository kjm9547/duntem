import {
    addDoc,
    collection,
    query,
    where,
    getDocs} from 'firebase/firestore'
import { firebaseInitailizer } from "../firebase"

export const useSignFb = () => {
    
    const {
        db,
        auth
    } = firebaseInitailizer()

    const checkFirebaseIdExist = async (id) => {
        const q = query(
            collection(db,"users"),
            where("id", "==", id)
        );
        const querySnapshot = await getDocs(q);
        console.log("www")
        // ID가 존재하면 true, 존재하지 않으면 false 반환
        return !querySnapshot.empty
    }
    const insertFirbaseUserInfo = async (data,provider) => {
        console.log(data.user)
        const docRef = await addDoc(
            collection(db, "users"), {
                id:data.user.email,
                advantureGroup:"",
                accessToken: data.user.accessToken,
                imgUrl:data.user.photoURL,
                provider:provider
            }
            )
            console.log("Document written with ID: ", docRef.id);
    }
    return{ 
        checkFirebaseIdExist,
        insertFirbaseUserInfo
    }
}