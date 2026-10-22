"use client";

import { Box, Button, Popover, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";

interface CustomRangeFilterProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    onApply: ({ startDate, endDate }: { startDate: string; endDate: string }) => void;
    onCancel: () => void;
    handleClosePopover: () => void;
}
export const CustomRangeFilter = (props: CustomRangeFilterProps) => {
    const { anchorEl, open, onClose, onApply, onCancel, handleClosePopover } = props;
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    const handleApply = () => {
        if (startDate && endDate) {
            handleClosePopover();
            onApply({ startDate: startDate.toISOString(), endDate: endDate.toISOString() });
            onClose();
        } else {
            // TODO: add logic to display required field message
        }
    };

    const handleCancel = () => {
        onCancel();
        onClose();
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                sx={{
                    top: "40px",
                }}
            >
                <Box p={2}>
                    <Typography variant="h6" paddingBottom={2}>
                        Select Date
                    </Typography>
                    <Typography>From</Typography>
                    {/* TODO: Disable previous date selection and display required message
                    Ref Link: https://mui.com/x/react-date-pickers/validation/#show-the-error */}
                    <DatePicker
                        value={startDate}
                        onChange={(date) => {
                            if (date) {
                                setStartDate(date);
                            }
                        }}
                        sx={{
                            paddingBottom: "20px",
                            "& input": {
                                padding: "10px",
                            },
                        }}
                        disableFuture
                    />
                    <Typography>To</Typography>
                    <DatePicker
                        value={endDate}
                        onChange={(date) => {
                            if (date) {
                                setEndDate(date);
                            }
                        }}
                        sx={{
                            "& input": {
                                padding: "10px",
                            },
                        }}
                        disableFuture
                    />
                    <Box mt={5} display="flex" justifyContent="flex-end">
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button onClick={handleApply}>Apply</Button>
                    </Box>
                </Box>
            </Popover>
        </LocalizationProvider>
    );
};
