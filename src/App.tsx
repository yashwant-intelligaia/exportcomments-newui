import "./App.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { PageNotFound } from "./containers";
import { ScrollToTop } from "./containers/Common";
import { ResponsiveDrawer } from "./containers/Navigation";
import {
    FeedbackFormPage,
    FigmaAuth,
    // GenerateAccessToken,
    InvitePage,
    Main,
    PrivacyPolicy,
    ProjectDashboard,
    ProjectDetailsPage,
    TermsOfUse,
    UnsubscribePage,
    UserInformation,
} from "./pages";
import { AuthRoute } from "./route/AuthRoute";
import { PrivateRoute } from "./route/PrivateRoute";
import { GlobalHeader } from "./stories/components/global-header/GlobalHeader";
import { GlobalStaticHeader } from "./stories/components/global-header/GlobalStaticHeader";

const App = () => (
    <Router>
        <Switch>
            <AuthRoute exact path="/">
                <GlobalHeader />
                <Main />
            </AuthRoute>

            <Route exact path="/terms-of-use">
                <GlobalHeader />
                <TermsOfUse />
            </Route>

            {/* TODO: uncomment below code for Generate access token functionality. */}
            {/* <Route path="/generate-access-token">
                <GenerateAccessToken />
            </Route> */}

            <Route exact path="/unsubscribe">
                <GlobalHeader />
                <UnsubscribePage />
            </Route>
            <Route exact path="/privacy-policy">
                <GlobalHeader />
                <PrivacyPolicy />
            </Route>

            <AuthRoute path="/callback">
                <FigmaAuth />
            </AuthRoute>

            <PrivateRoute path="/users">
                <GlobalHeader />
                <UserInformation />
            </PrivateRoute>

            <PrivateRoute path="/projects" exact>
                <ResponsiveDrawer>
                    <ProjectDashboard />
                </ResponsiveDrawer>
                <ScrollToTop />
            </PrivateRoute>

            <PrivateRoute path="/invite/:type">
                <GlobalHeader />
                <InvitePage />
            </PrivateRoute>

            <PrivateRoute path="/project/:projectId/details">
                <GlobalHeader />
                <ProjectDetailsPage />
            </PrivateRoute>

            <Route exact path="/feedback-form">
                <GlobalStaticHeader />
                <FeedbackFormPage />
            </Route>

            <Route path="*">
                <GlobalHeader />
                <PageNotFound />
            </Route>
        </Switch>
    </Router>
);

export { App };
