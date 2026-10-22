const { protocol, hostname, port } = window.location;
export const frontendUrl =
    hostname === "localhost" ? `${protocol}//${hostname}:${port}` : `${protocol}//${hostname}`;

let baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:4000/";
let koa2BaseUrl = process.env.REACT_APP_KOA2_BASE_URL || "http://localhost:8000/";

if (hostname === "exportcomments.io") {
    /* For Production Server */
    baseUrl = "https://api.exportcomments.io/";
    koa2BaseUrl = "https://api.exportcomments.io/v2/";
} else if (hostname === "dev.exportcomments.io" || process.env.REACT_APP_USE_DEV_ENV === "true") {
    /* For Development Server */
    baseUrl = "https://dev-api.exportcomments.io/";
    koa2BaseUrl = "https://dev-api.exportcomments.io/v2/";
} else if (
    hostname === "staging.exportcomments.io" ||
    process.env.REACT_APP_USE_DEV_ENV === "true"
) {
    /* For Staging Server */
    baseUrl = "https://staging-api.exportcomments.io/";
    koa2BaseUrl = "https://staging-api.exportcomments.io/v2/";
}

export const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const APP_CONSTANT = {
    figmaApp: {
        clientId: "8lEDAPJIutL6DaFkZrVHss",
        scopes: "current_user:read,file_content:read,file_metadata:read,file_comments:read,file_comments:write,file_versions:read,projects:read,webhooks:read,webhooks:write",
        code: "code",
        redirectUri: `${frontendUrl}/callback`,
    },
    baseUrl,
    koa2BaseUrl,
    pluginLink: "https://www.figma.com/community/plugin/930702747188058634/Export-Comments",
    productHuntLink: "https://www.producthunt.com/products/export-comments",
    figmaUrl: "https://www.figma.com",
    demoUrl: "https://export-comments.s3.ap-south-1.amazonaws.com/demo.mp4",
    social: {
        twitter: "https://twitter.com/intelligaia?lang=en",
        dribble: "https://dribbble.com/intelligaia",
        instagram: "https://www.instagram.com/intelligaia/",
        linkedIn: "https://www.linkedin.com/company/intelligaia/?viewAsMember=true",
        medium: "https://medium.com/@Intelligaia",
    },
    webApi: {
        getToken: "user/login",
        getUser: "user",
        getAllUsers: "user/get-all-users",
        comments: "comment/list",
        addProject: "user/add-project",
        deleteProject: "project/delete",
        fetchProjectDetails: "user/fetch-project-details",
        addUser: "project/add-user",
        verifyUserInvite: "user/verify-user-invite",
        getUserList: "user/list",
        getFileList: "user/file-list",
        feedback: "user/feedback",
        reply: "comment/create",
        delete: "comment/delete",
        userFiles: "user/file-users",
        getReaction: "comment/get-reaction",
        addReaction: "comment/add-reaction",
        deleteReaction: "comment/delete-reaction",
        shareFileWithUser: "user/share-file",
        inviteProjectUser: "project/invite-user",
        userFavorite: "user/favorite-file",
        verifyToken: "user/verify-invite",
        createTicket: "comment/create-issue",
        pluginCount: "user/plugin-count",
        markAsRead: "comment/mark-as-read",
        acceptTermsOfUseAndPrivacyPolicy: "user/accept-terms-of-use-and-privacy-policy",
        getUserFigmaDetails: "user/user-figma-details",
        updateProjectTitle: "project/update",
        deleteProjectMember: "project/remove-user",
        userLogout: "user/logout",
        unsubscribeReleaseEmail: "user/unsubscribe-release-email",
        prototypes: "project/prototype-list",
        invitePage: "page/invite",
        inviteFlow: "flow/invite",
        inviteVersion: "flow/version-invite",
        verifyPage: "page/verify",
        verifyFlow: "flow/verify",
        verifyFeedbackVersion: "flow/feedback-verify",
        flowVersion: "flow/version",
        flowVersionList: "flow/version-list",
        feedbackRating: "flow/feedback-rating",
        fetchBranch: `project/:projectId/branch`,
        fetchProject: `project`,
        fetchFigmaImage: "figma/images",
        postFeedback: "feedback",
        privacyPolicy: "privacy-policy",
        termOfUse: "terms-of-use",
    },
    userOptions: ["Logout"],
};
