import styled from "styled-components"
import { Header } from "../../component/Header"
import { DashBoardContainder } from "./dashboard/DashBoardContainer"

const Container = styled.div`
    display: flex;
    flex: 1;
    
    height: calc(100vh - 75px);
    flex-direction: column;
    width:97.2vw;
    padding: 25px;
`
export const MainView = () => {
    return (
        <Container>
            <Header/>
            <DashBoardContainder/>
               
           
        </Container>
    )
}