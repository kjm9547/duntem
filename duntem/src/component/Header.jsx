import styled from "styled-components"

const Container = styled.div`
    border-bottom: 2px solid #D9D9D9;
    height: 75px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: 200px;
    margin-right:200px;
    

`
const TextTitleContainer = styled.div`
    width: 200px;
    align-content: center;
    justify-content: center;
`
const TextTitle = styled.div`
    font-size: 44px;
    font-weight: bold;
    text-align: center;
`
const ImageTitleContainer = styled.div`
    display:flex;
    width: 200px;
    align-items: center;
    justify-content: center;
`
const TempHeaderBar = styled.div`
    flex: 1;

`
const UserImageProfile = styled.div`
    border:1px solid black;
    border-radius: 50%;
    width: 50px;
    height: 50px;
`
export const Header = () => {
    return(
        <Container>
            <TextTitleContainer>
                <TextTitle>D 던템</TextTitle>
            </TextTitleContainer>
            
            {/* <ImageTitleContainer>
                <UserImageProfile/>
            </ImageTitleContainer> */}
        </Container>
    )
}