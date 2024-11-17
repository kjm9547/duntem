import { Button, ButtonGroup } from "@mui/material";
import styled from "styled-components";

const Container = styled.div``;
export const CharacterMoreItemInfo = () => {
    return (
        <Container>
            아이템 상세 정보 출력
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button>장비</Button>
                <Button>아바타</Button>
                <Button>Three</Button>
            </ButtonGroup>
        </Container>
    );
};
