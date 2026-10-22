import "../assets/css/defaultV2.css";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Model, SurveyModel } from "survey-core";
import { Survey } from "survey-react-ui";

import { feedbackJson, themeJson } from "../containers/Feedback";
import { useFeedbackMutation } from "../hooks";

export const FeedbackFormPage = () => {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    const {
        postFeedback: { mutateAsync: postFeedbackMutation },
    } = useFeedbackMutation();

    const processSurveyData = (data: any) => {
        const newSurvey = new Model(data);
        newSurvey.applyTheme(themeJson);

        newSurvey.onValidateQuestion.add((sender, options) => {
            if (options.name === "features" && options.value.includes("other")) {
                const { comment } = sender.getQuestionByName("features");

                // Regular expression to validate only English letters and a single space
                const regex = /^[a-zA-Z\s]+$/;
                if (!regex.test(comment)) {
                    options.error =
                        "This field can contain only alphabets and a single space between words.";
                }
            }
        });

        newSurvey.onCompleting.add((sender, options) => {
            const frequency =
                sender.data.frequency === "Other"
                    ? sender.data.otherFrequency
                    : sender.data.frequency;

            const { features } = sender.data;
            const featuresComment = sender.data["features-Comment"];
            if (featuresComment) {
                const index = features.findIndex((value: string) => value === "other");
                if (index !== -1) {
                    features.splice(index, 1, featuresComment);
                }
            }

            postFeedbackMutation({
                usingDashboard: sender.data.usingDashboard,
                frequency,
                rating: sender.data.rating,
                features: features.join(","),
                comment: sender.data.comment,
                name: sender.data.name,
                email: sender.data.email,
            }).then(() => {
                options.allow = true;
            });
        });
        return newSurvey;
    };

    const [survey, setSurvey] = useState<SurveyModel>(() => processSurveyData(feedbackJson));

    useEffect(() => {
        if (email || name) {
            const newFeedbackJson = { ...feedbackJson };
            if (name) {
                newFeedbackJson.pages[1].elements[0].defaultValue = name;
            }
            if (email) {
                newFeedbackJson.pages[1].elements[1].defaultValue = email;
            }
            const newSurvey = processSurveyData(newFeedbackJson);
            setSurvey(newSurvey);
        }
    }, [email, name]);

    return (
        <Box style={{ height: "calc(100vh - 60px)" }}>
            <Survey model={survey} />
        </Box>
    );
};
