import styled from "styled-components";

const Container = styled.div`
    height: ${(props) => props.height + "px"};
    border: ${(props) => `${props.len}px solid ${props.color}`};
    width: ${(props) => props.width + "px"};
`;
export const SeperateLine = ({ color, len, height, width }) => {
    return <Container len={len} color={color} height={height} width={width} />;
};
