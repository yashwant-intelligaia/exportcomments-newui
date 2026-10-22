interface SurveyFeedbackPayload {
    usingDashboard: boolean;
    frequency: string;
    rating: number;
    features: string;
    comment: string;
    name: string;
    email: string;
}

export { SurveyFeedbackPayload };
