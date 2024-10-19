import styled from "styled-components"
import { IoClose } from "react-icons/io5";
const Container = styled.div`
    position: fixed;
    position: relative;
    right: -100px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #ffffff;
    :hover{
        /* border: 1px solid black ; */
        border-radius: 50%;
        background-color: #DB5F5F;
    }
`
export const CharacterDeleteButton = () => {
    return(
        <Container>
            <IoClose size={25}/>
        </Container>
    )
}