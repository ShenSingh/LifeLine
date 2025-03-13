import { Component } from "react";
import styled from "styled-components";


const ArtboardContainer = styled.div`
    width: 100%;
    height: 320px;
    margin-top: 20px;    background-image: url(${(props) => props.props});

    background-size: cover;
    background-position: center;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1.5rem;
    text-align: center;
`;

export default function Artboard({ props }) {
    return (
        <ArtboardContainer props={props}></ArtboardContainer>
    );
}
