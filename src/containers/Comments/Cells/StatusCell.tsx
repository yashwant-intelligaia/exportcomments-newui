import styled from "styled-components";

const Cell = styled.div`
    height: 26px;
    width: 85px;
    border-radius: 100px;
    padding: 5px 10px 5px 10px;
    color: #fff;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.5px;
    text-align: center;
    text-transform: capitalize;
    &.resolved {
        background-color: #4caf50;
    }
    &.unresolved {
        background-color: #ff9800;
    }
`;
export const StatusCell = (props: any) => {
    const { value } = props;

    return (
        <>
            <Cell
                className={`${
                    value.row[value.column.key] === "resolved" ? "  resolved" : "unresolved"
                }`}
            >
                <span>{value.row[value.column.key]}</span>
            </Cell>
        </>
    );
};
