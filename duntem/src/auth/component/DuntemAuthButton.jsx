
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const IconButton = styled.button`
  display:flex;
  align-items: center;
  width: 300px;
  height: 70px;
  margin-bottom: 10px;
  border: 0.2px solid #A2A2B6;
  color: white;
`
const IconLogo = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`
export const DuntemAuthButton = () => {
    const navigate = useNavigate()
    const onClickDuntemButton = () => {
        navigate("/signin")
    }
    return(
        <IconButton 
          onClick={()=>{onClickDuntemButton()}}>
          <IconLogo src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G"></IconLogo>
          <p>던템을 통한 로그인</p>
          </IconButton>
    )
}