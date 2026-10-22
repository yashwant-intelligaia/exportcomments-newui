import { ScrollToTop } from "@/containers/Common";
import { ResponsiveDrawer } from "@/containers/Navigation";
import { ProjectDashboard } from "@/screens/ProjectDashboard";

export default function ProjectsPage() {
    return (
        <>
            <ResponsiveDrawer>
                <ProjectDashboard />
            </ResponsiveDrawer>
            <ScrollToTop />
        </>
    );
}
