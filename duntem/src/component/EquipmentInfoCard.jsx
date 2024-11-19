import { useEffect } from "react";
import styled from "styled-components";
import { SeperateLine } from "./SeperateLine";
import { Margin } from "./Margin";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 85px;
    border: 2px solid #d9d9d9;
    align-items: center;
    margin-bottom: 10px;
    border-radius: 8px;
    padding-left: 10px;
`;
const ItemImg = styled.img`
    width: 45px;
    height: 45px;
`;
const ItemInfoContainer = styled.div`
    width: 100%;
    border: 1px solid black;
`;
const ItemText = styled.span`
    width: ${(props) => `${props.width}px`};
    text-align: center;
    margin-right: 10px;
`;
export const EquipmentInfoCard = ({ data }) => {
    useEffect(() => {
        console.log(data);
    }, []);
    const ItemMargin = () => {
        return (
            <>
                <SeperateLine
                    color={"#d9d9d9"}
                    height={50}
                    len={1}
                    width={0.5}
                />
                <Margin mr={10} />
            </>
        );
    };
    //reinforce 강화/증폭  refine 재련 reinforce amplificationName 증폭 여부
    return (
        <Container>
            <ItemText width={65}>{data.slotName}</ItemText>
            <ItemMargin />
            <ItemImg
                src={`https://img-api.neople.co.kr/df/items/${data.itemId}`}
            />
            <Margin mr={10} />
            <ItemMargin />
            <ItemText width={50}>{"+ " + data.reinforce}</ItemText>
            <ItemMargin />
            <ItemText width={300}>{data.itemName}</ItemText>
            <ItemMargin />
            <ItemInfoContainer>1</ItemInfoContainer>
        </Container>
    );
};
