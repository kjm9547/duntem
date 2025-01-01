import { Route, Routes } from "react-router-dom";
import { GuestPage } from "../pages/render/GuestPage";
import { SignInPage } from "../pages/sign/signin/SignInPage";
import { SignUnPage } from "../pages/sign/signup/SignUpPage";
import { MainView } from "../pages/main/MainView";
import { RegistAdvantureInfoPage } from "../pages/main/RegistAdvantureInfoPage";
import { CharacterInfoView } from "../pages/characterinfo/CharaterInfoView";

export const RootRoutes = () => {
    // 들어왔을때 로그인 상태면 바로 보내는 기능 추가 필요?
    return (
        <Routes>
            <Route path="/" element={<GuestPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUnPage />} />
            <Route path="/main" element={<MainView />} />
            <Route
                path="/regist/AdvantureInfo"
                element={<RegistAdvantureInfoPage />}
            />
            <Route path="/characterInfoView" element={<CharacterInfoView />} />
        </Routes>
    );
};
