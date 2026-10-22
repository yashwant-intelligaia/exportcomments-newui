"use client";

import { useState } from "react";

import { Drawer } from "@/components/ui/Drawer";

import { GlobalHeader } from "../../stories/components/global-header/GlobalHeader";
import { ResponsiveDrawerNavigation } from "./ResponsiveDrawerNavigation";

const ResponsiveDrawer = ({ children }: { children: JSX.Element }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex">
            <GlobalHeader headerValue="responsiveDrawer" onDrawerToggle={() => setMobileOpen(!mobileOpen)} />

            {/* The navigation drawer is only used on mobile screens. */}
            <nav aria-label="navigation" className="sm:hidden">
                <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} anchor="left" className="w-60">
                    <ResponsiveDrawerNavigation />
                </Drawer>
            </nav>

            <main className="min-h-[calc(100vh-3.75rem)] w-full grow bg-paper px-4 py-8">{children}</main>
        </div>
    );
};

export { ResponsiveDrawer };
