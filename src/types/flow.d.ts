interface User {
    user_id: number;
    status: number;
    name: string;
    email: string;
    avatar: string;
}

interface FlowType {
    type: string;
    id: number;
    name: string;
    flow_users: User[];
    feedbackVersion: any;
    flowLink: string;
    node_id: string;
}
interface ChipType {
    name: string;
    version_id: number;
    version_user: User[];
}
type feedbackRatingType = {
    comment: string;
    rating: number | null;
    userId: number;
    versionId: number;
};
export { ChipType, feedbackRatingType };
