import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useRef } from "react";
import styled from "styled-components";

import { UserContext } from "../../../contexts/UserContext";
import { uniqueKey } from "../../../utils";

// const LabelTxt = styled.div`
//     color: #616161;
//     font-size: 14px;
//     font-weight: 500;
//     white-space: nowrap;
//     line-height: 1.4375em;
//     @media (max-width: 640px) {
//         &.label-text {
//             display: none !important;
//         }
//     }
// `;

const CustSelectDropdown = styled.div`
    &.muicust-select {
        .MuiBox-root {
            min-width: 150px;
            .MuiOutlinedInput-root {
                .MuiSelect-select {
                    color: #2979ff;
                    font-weight: 500;
                    font-size: 14px;
                    padding-top: 0;
                    padding-bottom: 0;
                    padding-left: 5px;
                    line-height: 1.4375em;
                }
                .MuiSvgIcon-root {
                    fill: #2979ff;
                }
            }
        }
    }
`;

const LabelSelectWrap = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 640px) {
        flex-direction: column;
        gap: 0.5rem;
    }
`;

export const FilterDropdown = ({ filterOptions, handleFilterClick }: any) => {
    const { commentType = "All Comments", setCommentType, setIsDisable } = UserContext();

    const handleChange = (event: any) => {
        setCommentType(event.target.value);
    };
    const dropdownRef = useRef(null as any);

    useEffect(() => {
        let numberOfNewComments = 0;
        filterOptions.forEach((item: any) => {
            if (item.name === "Unread Comments" || item.name === "Unread Replies")
                numberOfNewComments += item.record;
        });
        if (numberOfNewComments === 0) {
            setIsDisable(true);
        }
    }, [filterOptions]);
    return (
        <>
            <LabelSelectWrap>
                {/* <LabelTxt className="label-text">I want to view</LabelTxt> */}
                <CustSelectDropdown
                    className="dropdown with-arrow mx-5px muicust-select"
                    ref={dropdownRef}
                >
                    <Box sx={{ minWidth: 180 }}>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={commentType}
                                label="Age"
                                onChange={handleChange}
                                sx={{
                                    ".MuiOutlinedInput-notchedOutline": {
                                        border: "0px",
                                    },
                                }}
                            >
                                {filterOptions.map((item: any, index: number) => (
                                    <MenuItem
                                        role="presentation"
                                        key={uniqueKey(`filter-option-${index}`)}
                                        value={item.name}
                                        className="mui-dropdown-list-item"
                                        onClick={() => {
                                            handleFilterClick(item.id);
                                        }}
                                    >
                                        {item.name} ({item.record})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </CustSelectDropdown>
                {/* <LabelTxt className="label-text">By</LabelTxt>
                <CustSelectDropdown
                    className="dropdown with-arrow mx-5px muicust-select"
                    ref={dropdownRef}
                >
                    <Box sx={{ minWidth: 180 }}>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value="all"
                                label="Age"
                                onChange={handleChange}
                                sx={{
                                    ".MuiOutlinedInput-notchedOutline": {
                                        border: "0px",
                                    },
                                }}
                            >
                                <MenuItem
                                    role="presentation"
                                    value="all"
                                    className="mui-dropdown-list-item"
                                    onClick={() => {}}
                                >
                                    All Team Members
                                </MenuItem>
                                <MenuItem
                                    role="presentation"
                                    value="yashwant"
                                    className="mui-dropdown-list-item"
                                    onClick={() => {}}
                                >
                                    John Wick
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </CustSelectDropdown> */}
            </LabelSelectWrap>
        </>
    );
};
