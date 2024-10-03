export const useLocalStore = () => {
    const addUserDataToStorage = (id,provider) => {
        localStorage.setItem("userId",id);
        localStorage.setItem("isLoigined",true);
        localStorage.setItem("provider",provider);
    }
    const isLoginedUserToStorage = () => {
        return localStorage.getItem("isLoigined")?1:0
    }
    
    const getLoginedUserID = () => {
        return localStorage.getItem("userId");
    }
    const getLoginedUserProvider = () => {
        return localStorage.getItem("provider")
    }
    const clearUserDataInStorage = () => {
        localStorage.clear()
    }
    return {
        addUserDataToStorage,
        isLoginedUserToStorage,
        getLoginedUserID,
        clearUserDataInStorage,
        getLoginedUserProvider
    }
}