"use client";

import { QueryObserverResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { ChevronDown, Share2, SmilePlus, X } from "lucide-react";
import * as React from "react";
import { useState } from "react";

import { Button, IconButton } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";
import { Avatar, AvatarGroup, Card } from "@/components/ui/Display";
import { TextField } from "@/components/ui/Form";
import { Menu, MenuItem } from "@/components/ui/Popover";
import { useParams } from "@/utils/navigation";

import angryFace from "../../assets/angry-face.svg";
import faceWithRollingEyes from "../../assets/face-with-rolling-eyes.svg";
import poutingFace from "../../assets/pouting-face.svg";
import smilingFaceHeart from "../../assets/smiling-face-with-hearts.svg";
import smilingEyesFace from "../../assets/smiling-face-with-smiling-eyes.svg";
import { UserContext } from "../../contexts";
import { useFlowMutations } from "../../hooks";
import { EcOverflowTooltip } from "../../stories/components";
import { UserType } from "../../types";
import { ShareFlowVersionModal } from "./ShareFlowVersionModal";

const EMOJI_DATA = [
    {
        id: 1,
        name: "pouting-face",
        src: poutingFace.src,
        alt: "Pouting Face",
        suggestions: [
            "Feeling Enraged",
            "Very Angry",
            "Infuriated about the Designs",
            "Fumed for the task done",
            "Feeling Angered",
            "Burned Up",
            "Wrathful",
            "Resentful",
        ],
    },
    {
        id: 2,
        name: "angry-face",
        src: angryFace.src,
        alt: "Angry Face",
        suggestions: [
            "Annoyed about the Designs",
            "Feeling Irritated",
            "Aggrieved",
            "Irked",
            "Displeased for Designs",
            "Provoked",
            "Resentful",
        ],
    },
    {
        id: 3,
        name: "face-with-rolling-eyes",
        src: faceWithRollingEyes.src,
        alt: "Face Rolling Eyes",
        suggestions: [
            "Dissatisfied",
            "Unimpressed",
            "Feeling Awkward",
            "Feeling Nervous",
            "Frustration about the Designs",
            "Feeling Disappointment",
        ],
    },
    {
        id: 4,
        name: "smiling-eyes-face",
        src: smilingEyesFace.src,
        alt: "Smiling Eyes Face",
        suggestions: [
            "Feeling Contentment",
            "Pleasure",
            "Satisfaction",
            "Cheerful Designs",
            "High Spirits",
            "Delighted",
            "Thankful",
            "Keep it Up",
            "Has all the Design Elements",
            "Great Job",
            "Well Done",
            "Let's Go",
        ],
    },
    {
        id: 5,
        name: "smiling-face-heart",
        src: smilingFaceHeart.src,
        alt: "Smiling Face Heart",
        suggestions: [
            "Cheerful Design",
            "Joyful Work",
            "Stunning Designs",
            "Gladsome Task Done",
            "Hopeful for this Work",
            "Optimistic Approach",
            "Promising Designs Created",
            "Encouraging",
            "Good UI",
            "Meets Design Criteria",
            "Meets Design Objectives",
            "Kudos",
            "Bravo",
            "Fascinating",
            "Design Rocks",
        ],
    },
];
interface NewFlowVersionCardPropsType {
    data: {
        // TODO: add type definition for `version`
        version: any;
        nodeId: string;
        pageId: number;
    };
    refetchCallback: () => Promise<QueryObserverResult<any, AxiosError<any>>>;
}

export const NewFlowVersionCard = (props: NewFlowVersionCardPropsType) => {
    const [shareVersionDrawer, setShareVersionDrawer] = useState<JSX.Element>();
    const {
        data: { version, nodeId, pageId },
        refetchCallback,
    } = props;
    const {
        projectId,
    }: {
        projectId: string;
    } = useParams();
    const { user } = UserContext();
    const versionNameRef = React.useRef<HTMLSpanElement>(null);
    const suggestions = [
        "Good UI",
        "Meets design criterias",
        "Good",
        "Meets design objective",
        "Kudos",
        "Design rocks",
        "Keep it up",
        "Has all the design elements",
        "As discusssed",
        "Nice",
        "Let's go",
        "Great job",
        "Well done",
    ];
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [selectedChips, setSelectedChips] = useState<string[]>([]);

    const [customText, setCustomText] = useState("");
    const [selectedEmoji, setSelectedEmoji] = useState({} as any);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [totalFeedback, setTotalFeedback] = useState(false);
    const handleChipClick = (chipLabel: string) => {
        setSelectedChips((prevSelected) => [...prevSelected, chipLabel]);
        setCustomText((prevCustomText) =>
            prevCustomText ? `${prevCustomText}, ${chipLabel}` : chipLabel
        );
    };
    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setCustomText(inputValue);
        const extractedChips = inputValue
            .split(", ")
            .map((label) => label.trim())
            .filter((label) => suggestions.includes(label));
        setSelectedChips(extractedChips);
        const hasSelectedChips = selectedChips.length > 0;
        if (hasSelectedChips && inputValue.startsWith(",") && inputValue.indexOf(", ") === 0) {
            setCustomText(inputValue.substring(1));
        }
    };
    const handleExpandClickEmoji = (versionId: string) => {
        setTotalFeedback(false);

        // setExpandedId((prevExpandedId) =>
        //     prevExpandedId === versionId ? versionId : versionId
        // );
        setExpandedId(versionId);
    };
    const handleExpandClick = (versionId: string) => {
        setTotalFeedback(false);

        setExpandedId((prevExpandedId) => (prevExpandedId === versionId ? null : versionId));
    };
    const handleExpandTotalFeedback = (versionId: string) => {
        setExpandedId((prevExpandedId) => (prevExpandedId === versionId ? null : versionId));
        setTotalFeedback(true);
    };

    const { feedbackRating } = useFlowMutations();
    const { mutate: mutateFeedbackRating } = feedbackRating;

    const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>, versionId: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedVersion(versionId);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEmojiClick = (reactionEmoji: any) => {
        if (selectedEmoji.id === reactionEmoji.id) {
            setSelectedEmoji({});
        } else {
            setSelectedEmoji(reactionEmoji);
        }
    };
    const handleCancel = () => {
        setSelectedEmoji({});
        setCustomText("");
    };

    const handlePost = () => {
        mutateFeedbackRating({
            userId: user.userId,
            versionId: version.versionId,
            rating: selectedEmoji.id,
            comment: customText,
        });
        setSelectedEmoji({});
        setCustomText("");
        // setFeedback(true);
        refetchCallback();
        setTotalFeedback(true);
    };

    // average rating logic
    const getEmojiFromRating = () => {
        const { versionRating } = version;
        let totalRatings = 0;
        let sumRatings = 0;

        if (versionRating && versionRating.length > 0) {
            versionRating.forEach((ratingObj: any) => {
                const rating = parseInt(ratingObj.rating, 10);
                if (!Number.isNaN(rating)) {
                    totalRatings += 1;
                    sumRatings += rating;
                }
            });
        }
        const averageRating = totalRatings > 0 ? Math.ceil(sumRatings / totalRatings) : 0;
        return EMOJI_DATA.find((emoji) => emoji.id === averageRating) || null;
    };

    const averageEmoji = getEmojiFromRating();

    const handleShareFlowVersion = (versionData: any, flowNodeId: string) => {
        setShareVersionDrawer(
            <ShareFlowVersionModal
                projectId={Number(projectId)}
                pageId={pageId}
                onClose={() => setShareVersionDrawer(undefined)}
                flowId={versionData.flowId}
                versionId={versionData.versionId}
                versionUsers={versionData.versionUser}
                branchName=""
                flowNodeId={flowNodeId}
            />
        );
    };
    const isExpanded = expandedId === version.versionId;
    const meta = "relative mx-2 my-px border-l border-muted pl-2.5 text-sm leading-[15px] max-sm:mx-0 max-sm:border-l-0 max-sm:pl-0";

    return (
        <div>
            <Card className="mx-2.5 my-5">
                <div className="flex items-start justify-between p-4 max-sm:flex-col">
                    <div className="min-w-0 grow">
                        <div className="flex items-center max-sm:w-full max-sm:flex-col max-sm:items-stretch max-sm:gap-4">
                            <div className="pr-1.5 text-xl">
                                <EcOverflowTooltip childRef={versionNameRef} title={version.versionName} placement="top" arrow>
                                    <span ref={versionNameRef} className="inline-block max-w-[250px] truncate pr-1.5 align-bottom text-[1.375rem]">
                                        {`${version.versionName}`}
                                    </span>
                                </EcOverflowTooltip>
                            </div>
                            <div className="flex items-center">
                                <div className={meta}>
                                    Date <strong>{format(new Date(version.versionCreatedAt), "MMMM dd, yyyy")}</strong>
                                </div>
                                <div className={cn(meta, "flex items-center max-sm:ml-auto")}>
                                    <button
                                        type="button"
                                        onClick={() => handleShareFlowVersion(version, nodeId)}
                                        className="flex items-center gap-1 text-sm font-medium text-blue-ink"
                                    >
                                        <Share2 className="size-3.5" />
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center pt-[18px] max-sm:w-full max-sm:flex-col max-sm:items-stretch max-sm:gap-4">
                            <div className="flex items-center">
                                <span className="mr-1 text-sm">{version.versionRating != null ? "Average rating" : "Add rating"}</span>
                                {averageEmoji !== null && version.versionRating != null && (
                                    <span className="mr-0.5 flex items-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={averageEmoji.src} alt={averageEmoji.alt} className="size-5" />
                                    </span>
                                )}
                                <button type="button" aria-label="Add rating" onClick={() => handleExpandClickEmoji(version.versionId)}>
                                    <SmilePlus className="size-5 cursor-pointer" />
                                </button>
                            </div>
                            {version.versionRating != null && (
                                <button type="button" className={cn(meta, "cursor-pointer text-left")} onClick={() => handleExpandTotalFeedback(version.versionId)}>
                                    Total Feedback :<span className="mx-1 text-base font-bold">{version.versionRating.length}</span>
                                </button>
                            )}
                            <div className="flex items-center">
                                <div className={cn(meta, "flex items-center")}>Contributors :</div>
                                <div>
                                    {version.versionUser != null ? (
                                        <>
                                            <AvatarGroup max={4} size={24}>
                                                {version.versionUser.map((versionuser: UserType) => (
                                                    <button key={versionuser.user_id} type="button" onClick={(event) => handleClick(event, version.versionId)}>
                                                        <Avatar src={versionuser.avatar} name={versionuser.name || versionuser.email} size={24} />
                                                    </button>
                                                ))}
                                            </AvatarGroup>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl && selectedVersion === version.versionId)}
                                                onClose={handleClose}
                                                className="max-h-[200px] w-[230px] overflow-y-auto pt-2.5"
                                            >
                                                {version.versionUser.map((versionuser: UserType) => (
                                                    <MenuItem key={versionuser.user_id}>
                                                        <Avatar src={versionuser.avatar} name={versionuser.name || versionuser.email} size={25} />
                                                        <span className="text-sm">{versionuser.name || versionuser.email}</span>
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </>
                                    ) : (
                                        <span className="text-xs font-normal text-muted">There is no contributors</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <IconButton
                        aria-label="show more"
                        aria-expanded={isExpanded}
                        onClick={() => handleExpandClick(version.versionId)}
                        className="mt-5 ml-auto max-sm:w-full max-sm:rounded-sm max-sm:bg-surface-sunk"
                    >
                        <ChevronDown className={cn("size-5 transition-transform", isExpanded && "rotate-180")} />
                    </IconButton>
                </div>
                {isExpanded &&
                    (totalFeedback && version.versionRating ? (
                        <div className="border-t border-line p-4">
                            <p className="text-base font-bold">Recent Feedback</p>
                            <div className="mt-5 max-h-[360px] overflow-auto">
                                {version.versionRating.map((rating: any, index: number) => (
                                    <React.Fragment key={`${rating.ratingCreatedAt}-${index}`}>
                                        <div className="mt-5 flex items-center justify-between">
                                            <div className="flex items-center gap-2.5">
                                                <Avatar src={rating.avatar} name={rating.name} size={25} />
                                                <span>{rating.name}</span>
                                            </div>
                                            <span className="text-xs">
                                                Date :<span>{format(new Date(rating.ratingCreatedAt), "MMMM dd, yyyy")}</span>{" "}
                                            </span>
                                        </div>
                                        <p className="mt-2.5 pl-1 text-sm">{rating.comment}</p>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="border-t border-line p-4">
                            <p className="text-center text-base font-bold">How do you find this prototype</p>
                            <p className="mt-2 text-center text-sm">Rating should be based on whether the protoype/design meets the objective or not</p>
                            <div className="mt-10 flex justify-center">
                                {EMOJI_DATA.map((emoji) => (
                                    <button
                                        type="button"
                                        key={emoji.id}
                                        aria-pressed={selectedEmoji.id === emoji.id}
                                        onClick={() => handleEmojiClick(emoji)}
                                        className="mr-2.5 inline-flex size-[50px] items-center justify-center rounded-full bg-transparent transition-colors hover:bg-surface-sunk"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={emoji.src} alt={emoji.alt} className={cn("transition-transform", selectedEmoji.id === emoji.id && "scale-[1.4]")} />
                                    </button>
                                ))}
                            </div>
                            {selectedEmoji.id !== undefined && (
                                <>
                                    <div className="mt-10 flex flex-wrap gap-x-1.5">
                                        {selectedEmoji?.suggestions?.map((suggestionsLabel: any) => (
                                            <button
                                                type="button"
                                                key={suggestionsLabel}
                                                onClick={() => handleChipClick(suggestionsLabel)}
                                                className="mb-3 rounded-pill border border-ink/60 px-3 py-1 text-sm text-ink hover:bg-surface-sunk"
                                            >
                                                {suggestionsLabel}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mb-4">
                                        <TextField
                                            id="outlined-basic"
                                            label="Leave a comments"
                                            multiline
                                            rows={6}
                                            value={customText}
                                            onChange={handleTextFieldChange as any}
                                            endAdornment={
                                                <IconButton aria-label="Clear comment" size="small" onClick={() => setCustomText("")}>
                                                    <X className="size-4" />
                                                </IconButton>
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2.5">
                                        <Button onClick={handleCancel}>Cancel</Button>
                                        <Button onClick={handlePost} disabled={selectedEmoji.id === undefined || customText.trim().length === 0}>
                                            Post
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
            </Card>
            {shareVersionDrawer}
        </div>
    );
};
