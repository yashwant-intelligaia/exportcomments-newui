"use client";

import styled from "styled-components";

const LoaderWrapper = styled.div`
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: calc(50% - 75px);

    .loader-wrap {
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        top: calc(50% - 10px);
        display: flex;
        justify-content: center;
        width: 100%;
        flex-wrap: wrap;
        .loadergif-wrap {
            width: 200px;
            height: 200px;
            display: block;
            border-radius: 0;
            background-color: transparent;

            img {
                width: 100%;
                position: relative;
                transform: translate(0, 0);
            }
        }

        .loading-text {
            color: #de9d46;
            font-size: 1.25rem;
            font-weight: 300;
            display: block;
            width: 100%;
            p {
                margin: 10px 0;
            }
        }
    }
`;

interface LoaderPropsType {
    image: string;
    message: string;
}

export const Loader = (props: LoaderPropsType) => {
    const { image, message } = props;
    return (
        <LoaderWrapper>
            <div className="loader-wrap">
                <div className="loadergif-wrap">
                    <img src={image} alt="Loader" />
                </div>
                <div className="loading-text">
                    <p>{message}</p>
                </div>
            </div>
        </LoaderWrapper>
    );
};
