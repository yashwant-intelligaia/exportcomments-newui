"use client";

import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { PopoverOrigin } from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { ActionMenuItemType } from "../../../types";
import { uniqueKey } from "../../../utils";
import { EcTooltip } from "../EcTooltip";

interface EcActionMenuPropsType {
    open: boolean;
    onClose?: () => void;
    anchorEl?: HTMLElement;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
    items?: ActionMenuItemType[];
    closeOnClickOutside?: boolean;
}

const StyledMenu = styled((props: EcActionMenuPropsType) => <Menu {...props} />)(() => ({
    "& .MuiPaper-root": {
        padding: "8px 0",
    },
}));

const EcActionMenu = (props: EcActionMenuPropsType) => {
    const { open, anchorEl, anchorOrigin, transformOrigin, items, closeOnClickOutside, onClose } =
        props;
    return (
        <StyledMenu
            anchorEl={anchorEl}
            open={open}
            onClose={closeOnClickOutside ? onClose : undefined}
            transformOrigin={transformOrigin}
            anchorOrigin={anchorOrigin}
        >
            {items &&
                items.map(({ label, onClick, icon, disabled, tooltipTitle }, index) => {
                    if (tooltipTitle) {
                        return (
                            <EcTooltip
                                key={uniqueKey(index)}
                                title={tooltipTitle}
                                arrow
                                placement="right-start"
                                titleFontWeight="normal"
                            >
                                <MenuItem
                                    onClick={disabled ? undefined : onClick}
                                    disabled={disabled}
                                    sx={{
                                        "&.Mui-disabled": {
                                            pointerEvents: "all",
                                        },
                                    }}
                                >
                                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                    <Typography variant="body2">{label}</Typography>
                                </MenuItem>
                            </EcTooltip>
                        );
                    }
                    return (
                        <MenuItem key={uniqueKey(index)} onClick={onClick} disabled={disabled}>
                            {icon && <ListItemIcon>{icon}</ListItemIcon>}
                            <Typography variant="body2">{label}</Typography>
                        </MenuItem>
                    );
                })}
        </StyledMenu>
    );
};

EcActionMenu.defaultProps = {
    anchorEl: undefined,
    anchorOrigin: {
        vertical: "center",
        horizontal: "right",
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "left",
    },
    items: [],
    closeOnClickOutside: true,
};

export { EcActionMenu };
