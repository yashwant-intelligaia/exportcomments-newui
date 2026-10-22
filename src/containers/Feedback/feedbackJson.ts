"use client";

export const feedbackJson: any = {
    // title: "We Appreciate Your Feedback!",
    // description:
    //     "Your feedback helps us continuously improve the ExportComments application. All data collected through this form is securely stored within our platform, ensuring that your insights are safe, private, and used solely for enhancing user experience. We never share your feedback with third parties. By understanding your needs, we tailor our features to better serve you.",
    // logo: "https://export-comments.s3.ap-south-1.amazonaws.com/export-comment.jpg",
    // logoWidth: "200px",
    // logoHeight: "100px",
    focusFirstQuestionAutomatic: false,
    completedHtmlOnCondition: [
        {
            expression: "{rating} <= 6",
            html: "<div style='display: flex;flex-direction: column;align-items: center;'><img src='https://export-comments.s3.ap-south-1.amazonaws.com/thank-you-mail.gif' alt='Feedback Image' style='max-width: 100%; height: auto; margin-bottom: 20px;'><h1 style='font-size: 24px; margin: 0 0 10px; text-align: center;'>Thanks for the feedback</h1><p style='font-size: 16px; text-align: center; max-width: 600px; line-height: 1.5; margin: 0;'>We highly value all ideas and suggestions from our customers, whether they're positive or critical. In the future, our team might reach out to you to learn more about how we can further improve our product so that it exceeds your expectations.</p></div>",
        },
        {
            expression: "{rating} > 6 and {rating} <= 7",
            html: "<div style='display: flex;flex-direction: column;align-items: center;'><img src='https://export-comments.s3.ap-south-1.amazonaws.com/thank-you-mail.gif' alt='Feedback Image' style='max-width: 100%; height: auto; margin-bottom: 20px;'><h1 style='font-size: 24px; margin: 0 0 10px; text-align: center;'>Thanks for the feedback</h1><p style='font-size: 16px; text-align: center; max-width: 600px; line-height: 1.5; margin: 0;'>Thanks for your feedback. Our goal is to create the best possible product, and your thoughts, ideas, and suggestions play a major role in helping us identify opportunities to improve.</p></div>",
        },
        {
            expression: "{rating} >= 8",
            html: "<div style='display: flex;flex-direction: column;align-items: center;'><img src='https://export-comments.s3.ap-south-1.amazonaws.com/thank-you-mail.gif' alt='Feedback Image' style='max-width: 100%; height: auto; margin-bottom: 20px;'><h1 style='font-size: 24px; margin: 0 0 10px; text-align: center;'>Thanks for the feedback</h1><p style='font-size: 16px; text-align: center; max-width: 600px; line-height: 1.5; margin: 0;'>Thanks for your feedback. It's great to hear that you're a fan of our product. Your feedback helps us discover new opportunities to improve it and make sure you have the best possible experience.</p></div>",
        },
    ],
    pages: [
        {
            name: "page1",
            elements: [
                {
                    type: "panel",
                    name: "panel1",
                    elements: [
                        {
                            type: "boolean",
                            name: "usingDashboard",
                            title: "Are you using our Dashboard?",
                            isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            visible: false,
                            isRequired: true,
                            visibleIf: "{usingDashboard} == true",
                            name: "frequency",
                            title: "How frequently you are using it?",
                            choices: ["Daily", "Weekly", "Monthly", "Other"],
                        },
                        {
                            type: "text",
                            name: "otherFrequency",
                            title: "Please specify...",
                            isRequired: true, // Make this field required
                            visibleIf: "{frequency} = 'other'",
                            validators: [
                                {
                                    type: "regex",
                                    text: "This field can contain only English alphabets and a single space between words.",
                                    regex: /^[a-zA-Z\s]+$/, // Only allows letters
                                },
                            ],
                        },
                        {
                            type: "rating",
                            name: "rating",
                            title: "On a scale from 0 to 10, how likely are you to recommend us to a friend or colleague?",
                            defaultValue: 9,
                            isRequired: true,
                            rateMin: 0,
                            rateMax: 10,
                        },
                        {
                            type: "comment",
                            name: "comment",
                            visible: false,
                            visibleIf: "{rating} <= 5",
                            title: "How did we disappoint you and what can we do to make things right?",
                            maxLength: 300,
                        },
                        {
                            type: "comment",
                            name: "comment",
                            visible: false,
                            visibleIf: "{rating} >= 6",
                            title: "What can we do to make your experience more satisfying?",
                            maxLength: 300,
                        },
                        {
                            type: "checkbox",
                            name: "features",
                            title: "What features would you like to see in future releases?",
                            description: "Please select one or more features.",
                            isRequired: true,
                            choices: [
                                "Dashboard with Analytics",
                                "AI Feedback Analysis",
                                "Team Management",
                                "User Activities",
                                "Convert Feedback Comments into Tasks",
                                "Quality support",
                            ],
                            hasOther: true,
                        },
                    ],
                },
            ],
        },
        {
            name: "page2",
            elements: [
                {
                    type: "text",
                    name: "name",
                    visible: true,
                    isRequired: true,
                    title: "What is your name?",
                    placeholder: "Enter your name here",
                },
                {
                    type: "text",
                    name: "email",
                    visible: true,
                    isRequired: true,
                    title: "What is your email address?",
                    validators: [
                        {
                            type: "email",
                        },
                    ],
                    placeholder: "Enter your email here",
                },
            ],
        },
    ],
    showPrevButton: true,
    showQuestionNumbers: "off",
    widthMode: "static",
    width: "800",
    maxOthersLength: 300,
};
