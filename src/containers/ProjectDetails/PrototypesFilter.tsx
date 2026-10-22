import { SearchRounded as SearchRoundedIcon } from "@mui/icons-material";
import { Box, Input, InputAdornment } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { ProjectDetailsContext } from "../../contexts";
import { useDebounce } from "../../utils";

export const PrototypesFilter = () => {
    const [value, setValue] = useState("");
    const { setSearchInput } = useContext(ProjectDetailsContext);
    const searchInputValue = useDebounce(value, 1000);

    useEffect(() => {
        setSearchInput(searchInputValue);
    }, [searchInputValue]);

    const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <>
            <Box>
                <Box
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        justifyContent: "end",
                        minWidth: "55%",
                        maxWidth: "100%",
                        gap: "0.5rem",
                    }}
                    sx={{
                        marginTop: {
                            xs: "15px",
                            sm: "0px",
                            md: "0px",
                            lg: "0px",
                            xl: "-10px",
                        },
                        marginBottom: {
                            xs: "5px",
                            sm: "0px",
                            md: "0px",
                            lg: "0px",
                            xl: "0px",
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: {
                                xs: "100%", // 0px - 600px
                                sm: "320px", // 600px - 960px
                                md: "330px", // 960px - 1280px
                            },
                        }}
                        display={{
                            xs: "none",
                            sm: "block",
                        }}
                    >
                        <Input
                            value={value}
                            style={{ width: "100%" }}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchRoundedIcon />
                                </InputAdornment>
                            }
                            autoComplete="off"
                            placeholder="Search"
                            onChange={handleInputOnChange}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Search Box for Mobile Screens */}
            <Box
                sx={{
                    width: {
                        xs: "100%", // 0px - 600px
                    },
                }}
                display={{
                    xs: "block",
                    sm: "none",
                }}
            >
                <Input
                    value={value}
                    style={{ width: "100%" }}
                    id="mobile-input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchRoundedIcon />
                        </InputAdornment>
                    }
                    placeholder="Search"
                    autoComplete="off"
                    onChange={handleInputOnChange}
                />
            </Box>
            {/* Search Box for Mobile Screens Ends */}
        </>
    );
};
