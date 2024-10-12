import styled from "styled-components"
import { Header } from "../../component/Header"
import { DashBoardContainder } from "./dashboard/DashBoardContainer"
import { Footer } from "../../component/Footer"
import { useEffect } from "react"

const Container = styled.div`
    flex-direction: column;
    width:97.2vw;
    padding: 25px;
    padding-bottom: 0px;
`
export const MainView = () => {
    return (
        <Container>
            <Header/>
            <DashBoardContainder/>
        </Container>
    )
}