import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Button } from "@mui/material";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { useFetchProjectList } from "../../hooks";
import { AddButtonsOptionType } from "../../types";
import { uniqueKey } from "../../utils";

interface AddButtonsPropsType {
    options: AddButtonsOptionType[];
    prefix?: string;
    ariaLabel?: string;
    onOptionClick?: (index: number) => void;
    onButtonClick?: (index: number) => void;
}

const AddButtons = (props: AddButtonsPropsType) => {
    const { options, onOptionClick } = props;
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const [open, setOpen] = useState(Boolean(anchorEl));
    const id = open ? "simple-popover" : undefined;

    const { data: projectListData } = useFetchProjectList({
        key: "all",
    });

    return (
        <>
            <Button
                onClick={handleClick}
                sx={{
                    textTransform: "none",
                }}
                id="NB-add-new-button"
                variant="contained"
                endIcon={
                    open ? (
                        <ArrowDropUpIcon sx={{ fontSize: "20px" }} />
                    ) : (
                        <ArrowDropDownIcon sx={{ fontSize: "20px" }} />
                    )
                }
            >
                Add New
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <div>
                    {options.map(({ title }, index) => (
                        <Typography key={`add-option-${uniqueKey(index)}`}>
                            {title === "Users" && projectListData?.length === 0 ? (
                                <span
                                    style={{
                                        color: "gray",
                                        width: "90px",
                                        display: "block",
                                        padding: "8px",
                                        cursor: "not-allowed",
                                    }}
                                >
                                    {title}
                                </span>
                            ) : (
                                <span
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => {
                                        onOptionClick && onOptionClick(index);
                                        setOpen(false);
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            onOptionClick && onOptionClick(index);
                                            setOpen(false);
                                        }
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        color: "black",
                                        width: "115px",
                                        display: "block",
                                        padding: "8px",
                                        transition: "background-color 0.3s",
                                        backgroundColor: "transparent",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.target as HTMLElement).style.backgroundColor = "#e0e0e0";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.target as HTMLElement).style.backgroundColor =
                                            "transparent";
                                    }}
                                >
                                    {title}
                                </span>
                            )}
                        </Typography>
                    ))}
                </div>
            </Popover>
        </>
    );
};

AddButtons.defaultProps = {
    prefix: "Add New",
    ariaLabel: "option buttons",
    onOptionClick: undefined,
    onButtonClick: undefined,
};

export { AddButtons };
