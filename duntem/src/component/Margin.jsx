import styled from "styled-components";

const Container = styled.span`
    margin-right: ${(props) => `${props.mr}px`};
`;
export const Margin = ({ mr }) => {
    return <Container mr={mr}></Container>;
};
