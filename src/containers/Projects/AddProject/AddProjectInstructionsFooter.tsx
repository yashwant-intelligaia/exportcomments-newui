import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useContext, useState } from "react";

import { AddProjectContext } from "../../../contexts";
import { saveDoNotShowAddProjectInstruction } from "../../../services/AuthService";

const AddProjectInstructionsFooter = () => {
    const { onChangeStep } = useContext(AddProjectContext);
    const [isChecked, setChecked] = useState(false);

    const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleContinueClick = () => {
        if (isChecked) {
            saveDoNotShowAddProjectInstruction();
        }
        onChangeStep(2);
    };
    return (
        <Box sx={{ background: "#fff", flexShrink: "1" }} width="100%">
            <Box
                sx={{ pb: 2, background: "#fff" }}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <FormControlLabel
                    control={<Checkbox checked={isChecked} onChange={handleCheckboxClick} />}
                    label="Don't show this again"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleContinueClick}
                    sx={{ textTransform: "inherit" }}
                >
                    Continue
                </Button>
            </Box>
        </Box>
    );
};

export { AddProjectInstructionsFooter };
