import { Button } from "@mui/material";

import { EcTooltip } from "./EcTooltip";

export default {
    title: "Atomic/EcTooltip",
    component: EcTooltip,
};

/*
 * Example EcTooltip story with React Hooks.
 */
export const Default = () => (
    <EcTooltip
        title="Submit Button"
        description="Click this button to submit."
        placement="bottom"
        arrow
    >
        <Button>Submit</Button>
    </EcTooltip>
);
