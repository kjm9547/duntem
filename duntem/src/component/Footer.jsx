import styled from "styled-components"

const Container = styled.div`

    width: 100%;

    height:200px;
    align-content: center;
    justify-content: center;
    text-align: center;
`
export const Footer = () => {
    return(
        <Container>
            <div>
                <a href="http://developers.neople.co.kr" target="_blank">
                <img src="/assets/img/neopleBI.png" alt="Neople 오픈 API"/> </a>
            </div>
            <div>
            문의 woals8115@naver.com
            </div>
        </Container>
    )
}