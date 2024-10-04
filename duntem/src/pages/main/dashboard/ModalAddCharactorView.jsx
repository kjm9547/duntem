import styled from "styled-components"

const Container = styled.div`
    display: flex;
    background-color: white;
    width: 500px;
    height: 275px;
    padding-top: 25px;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
`
const SearchBoxContainer = styled.div`
    border:1px solid black;
    display: flex;
    flex: 0.2;
    width: 100%;
    align-items: center;
    justify-content: center;
`
const SearchInputBox = styled.input`
    width: 45%;
    height: 50%;
    border-radius: 10px;
    border: 0.8px solid black;
    margin-right: 10px;
`
const SearchSubmitButton = styled.button`
    width: 15%;
    height: 60%;
    background-color: #5A5AFD;
    text-align: center;
    
`
const SearchResultContainer = styled.div`
     border:1px solid blue;
    display: flex;
    flex: 0.8;
    width: 100%;
    align-items: center;
    justify-content: center;
`
export const ModalAddCharactorView = () => {
    return(
        <Container className="ModalView">
            <SearchBoxContainer>
                <SearchInputBox/>
                <SearchSubmitButton>검색</SearchSubmitButton>
            </SearchBoxContainer>
            <SearchResultContainer>
qqq
            </SearchResultContainer>
        </Container>
    )
}