import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import styled from "styled-components";

const NoRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    line-height: 25px;
    position: relative;
    top: 50%;
    height: calc(100vh - 145px);
    @media screen and (max-width: 767px) {
        &.mob-norow {
            height: calc(100vh - 180px);
        }
    }
    .prototypeWrap {
        display: flex;
        justify-content: center;
        height: 150px;
        width: 150px;
        border-radius: 50%;
        align-items: center;
        background-color: #e0e0e0;
        margin-bottom: 20px;
        .prototypeIcon {
            color: #b3babe;
            font-size: 100px;
        }
    }
    .smallText {
        display: block;
        color: #616161;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        margin-top: 5px;
        width: 100%;
        text-align: center;
        span {
            display: block;
        }
    }
    .noprototypedata {
        display: flex;
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
    }
`;

export const NoPrototypesFound = () => (
    <NoRow>
        <span className="prototypeWrap">
            <PlayArrowOutlinedIcon className="prototypeIcon" />
        </span>
        <div className="noprototypedata">
            No Prototypes Found
            <p className="smallText">
                There seems to be no prototypes available to show
                <span>Try in some other time.</span>
            </p>
        </div>
    </NoRow>
);
