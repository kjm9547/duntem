import styled from "styled-components"
import { DashBoardHeader } from "./DashBoardHeader"
import { DashBoardContent } from "./DashBoardContent"
import { useSelector } from "react-redux"

const Container = styled.div`
    border:1px solid red;
    height: calc(100vh - 75px);
    display: flex;
    flex-direction: column;
`

export const DashBoardContainder = () => {
    const userData = useSelector(state=>state.user)
    return (
        <Container>
            <DashBoardHeader
                userData={userData}/>
            <DashBoardContent/>
        </Container>
    )
}