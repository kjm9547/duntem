import { Route, Routes } from "react-router-dom"
import { GuestPage } from "../pages/render/GuestPage"
import { SignInPage } from "../pages/sign/signin/SignInPage"
import { SignUnPage } from "../pages/sign/signup/SignUpPage"
import { MainView } from "../pages/main/MainView"

export const RootRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<GuestPage/>}/>
            <Route path="/signin" element={<SignInPage/>}/>
            <Route path="/signup" element={<SignUnPage/>}/>
            <Route path="/main" element={<MainView/>}/>
        </Routes>
    )
}