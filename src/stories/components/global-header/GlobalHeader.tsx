"use client";

import { LogOut, Menu as MenuIcon, Plus } from "lucide-react";
import { useContext, useState } from "react";

import { Button, IconButton } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";
import { Avatar } from "@/components/ui/Display";
import { Drawer } from "@/components/ui/Drawer";
import { Menu, MenuItem } from "@/components/ui/Popover";

import { APP_CONSTANT } from "../../../constants/AppConstant";
import { AddButtons, AddProjectDrawer, AddUserDrawer } from "../../../containers";
import { AddProjectContext } from "../../../contexts";
import { UserContext } from "../../../contexts/UserContext";
import { useAuthMutations } from "../../../hooks/authHook";
import { AddButtonsOptionType } from "../../../types";
import { initOAuth } from "../../../utils";
import { SbLogo } from "../branding-logo/BrandingLogo";
import { EcTooltip } from "../EcTooltip";
import { Utilities } from "../utilities/Utilities";

/** Mobile-only slide-in menu with the user's details and logout. */
export default function SwipeableTemporaryDrawer({ user }: any) {
    const [open, setOpen] = useState(false);
    const { logoutUserSession } = useAuthMutations();
    const { token } = UserContext();

    if (!token) return null;
    return (
        <div className="absolute top-1 left-1 md:hidden">
            <IconButton aria-label="open menu" onClick={() => setOpen(true)}>
                <MenuIcon className="size-6" />
            </IconButton>
            <Drawer open={open} onClose={() => setOpen(false)} anchor="left" className="w-[280px]">
                <header className="border-line bg-paper flex flex-col items-center gap-1 border-b px-4 py-6 text-center">
                    <Avatar src={user.avatar} name={user.name} size={56} />
                    <span className="text-ink font-semibold">{user.name}</span>
                    <span className="text-muted text-sm">{user.email}</span>
                </header>
                <footer className="p-2">
                    <button
                        type="button"
                        onClick={() => logoutUserSession()}
                        className="text-ink hover:bg-surface-sunk flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left"
                    >
                        <LogOut className="size-5" />
                        Logout
                    </button>
                </footer>
            </Drawer>
        </div>
    );
}

interface GlobalHeaderPropsType {
    headerValue?: string;
    onDrawerToggle?: () => void;
}

export const GlobalHeader = ({ headerValue, onDrawerToggle }: GlobalHeaderPropsType) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerContent, setDrawerContent] = useState<JSX.Element>();
    const { user: userDetail, token } = UserContext();
    const { setProjectData } = useContext(AddProjectContext);
    const { userOptions } = APP_CONSTANT;
    const isResponsiveDrawer = headerValue === "responsiveDrawer";

    const handleDrawerClose = () => {
        setProjectData([]);
        setDrawerContent(undefined);
    };

    const ADD_OPTIONS: AddButtonsOptionType[] = [
        { title: "Users", component: <AddUserDrawer onClose={() => setDrawerContent(undefined)} /> },
        { title: "Projects", component: <AddProjectDrawer onClose={handleDrawerClose} /> },
    ];
    const handleButtonOptionClick = (index: number) => setDrawerContent(ADD_OPTIONS[index].component);

    const actions = token ? (
        <div className="flex items-center">
            <div className="relative mr-4 min-w-6">
                <div className="hidden sm:inline-flex">
                    <AddButtons
                        options={ADD_OPTIONS}
                        onButtonClick={() => undefined}
                        onOptionClick={handleButtonOptionClick}
                    />
                </div>
                <div className="inline-flex sm:hidden">
                    <EcTooltip
                        title="Add New Users/Projects "
                        description="New Users and Projects can be added from here."
                        placement="left-start"
                        arrow
                    >
                        <IconButton aria-label="user-menu" onClick={(e) => setAnchorEl(e.currentTarget)}>
                            <Plus className="size-5" />
                        </IconButton>
                    </EcTooltip>
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        placement="bottom-end"
                    >
                        {ADD_OPTIONS.map(({ title }, index) => (
                            <MenuItem
                                key={title}
                                onClick={() => {
                                    handleButtonOptionClick(index);
                                    setAnchorEl(null);
                                }}
                            >
                                {title}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </div>
            {Object.entries(userDetail).length > 0 && (
                <div className="max-md:hidden">
                    <Utilities user={userDetail} userOptions={userOptions} />
                </div>
            )}
        </div>
    ) : (
        <Button
            id="LI-login-with-figma"
            variant="outlined"
            size="small"
            onClick={() => initOAuth({ redirectUri: APP_CONSTANT.figmaApp.redirectUri })}
            startIcon={
                // eslint-disable-next-line @next/next/no-img-element
                <img alt="" src="/figma.svg" className="size-4" />
            }
        >
            Login With Figma
        </Button>
    );

    return (
        <>
            <header
                className={cn(
                    "border-line bg-surface fixed top-0 z-[100] flex h-[60px] w-full items-center justify-between border-b pr-5 max-sm:h-[50px]",
                    token ? "pl-[50px] md:pl-5" : "pl-5",
                )}
            >
                {isResponsiveDrawer ? (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outlined"
                            size="small"
                            aria-label="open drawer"
                            onClick={onDrawerToggle}
                            className="px-2 sm:hidden"
                        >
                            <MenuIcon className="size-5" />
                        </Button>
                        <SbLogo />
                    </div>
                ) : (
                    <>
                        <SwipeableTemporaryDrawer user={userDetail} />
                        <SbLogo />
                    </>
                )}
                {actions}
            </header>
            {drawerContent}
        </>
    );
};
