import {
    addDoc,
    collection,
    query,
    where,
    getDocs} from 'firebase/firestore'
import { firebaseInitailizer } from "../firebase"
import { useLocalStore } from './useLocalStore'

export const useSignFb = () => {
    
    const {
        db,
        auth
    } = firebaseInitailizer()
    const {
        
    } = useLocalStore()
    const checkFirebaseIdExist = async (id) => {
        
        const q = query(
            collection(db,"users"),
            where("id", "==", id)
        );
        const querySnapshot = await getDocs(q);
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
    const getFirebaseUserData = async (id) => {
        
            const q = query(
                collection(db,"users"),
                where("id", "==", id)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot
    }
    const getCurrnetAuthData = () => {
        const user = auth.currentUser;
        if (user !== null) {
        return user.providerData
        }
    }
    
    return{ 
        checkFirebaseIdExist,
        insertFirbaseUserInfo,
        getCurrnetAuthData,
        getFirebaseUserData
    }
}