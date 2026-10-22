import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import ClearIcon from "@mui/icons-material/ClearOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Collapse,
    Link,
    Menu,
    MenuItem,
    Stack,
    styled as styles,
    TextField,
    Typography,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { AxiosError } from "axios";
import { format } from "date-fns";
import * as React from "react";
import { useState } from "react";
import { QueryObserverResult } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
const ExpandMore = styles((props: ExpandMoreProps) => <IconButton {...props} />)(
    ({ theme, expand }) => ({
        transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    })
);

const ShareIconStyled = styled(ShareIcon)`
    // margin-right: 2%;

    @media (max-width: 600px) {
        margin-right: 0;
        margin-bottom: 8px;
    }
`;

const FigmaLink = styled(Link)`
    margin-right: 2%;

    @media (max-width: 600px) {
        margin-right: 0;
        margin-bottom: 8px;
        margin-left-auto;
    }
`;
const CustCardContainer = styled.div`
    & .fv-row-items {
        display: flex;
        align-items: center;
        @media (max-width: 600px) {
            width: 100%;
            flex-direction: column;
            align-items: inherit;
            gap: 15px;
            .MuiBox-root {
                margin-left: 0px;
                border-left: 0px none;
                padding-left: 0px;
                &.share-link-fv {
                    margin-left: auto;
                }
            }
        }
    }
    @media (max-width: 600px) {
        .MuiCardHeader-root {
            flex-direction: column;
            align-items: inherit;
            .MuiCardHeader-action {
                width: 100%;
                text-align: center;
                padding-right: 5px;
                .MuiIconButton-root {
                    background: #f0f0f0;
                }
            }
        }
        .MuiCollapse-wrapper {
            & button:not(.MuiButton-root) {
                margin: auto;
            }
        }
    }
`;

const EmojiButton = styled.button`
    font-size: 24px;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    cursor: pointer;
    border: none;
    background: transparent;
    outline: none;
    border-radius: 50%; /* Set the border-radius to create a circular shape */
    display: inline-flex;
    align-items: center;
    transition: all 0.5s;
    img {
        transition: all 0.25s;
    }
    &:hover {
        background-color: #f0f0f0;
    }
    &.selected {
        border: 1px solid transparent;
        background-color: #transparent;
        img {
            transform: scale(1.4);
        }
    }
`;

const EMOJI_DATA = [
    {
        id: 1,
        name: "pouting-face",
        src: poutingFace,
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
        src: angryFace,
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
        src: faceWithRollingEyes,
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
        src: smilingEyesFace,
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
        src: smilingFaceHeart,
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
    const versionNameRef = React.useRef();
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
    return (
        <CustCardContainer>
            <Card sx={{ margin: "20px 10px" }}>
                <CardHeader
                    title={
                        <>
                            <Box className="fv-row-items">
                                <Box
                                    sx={{
                                        fontSize: "20px",
                                        paddingRight: "5px",
                                    }}
                                >
                                    <EcOverflowTooltip
                                        childRef={versionNameRef}
                                        title={version.versionName}
                                        placement="top"
                                        arrow
                                    >
                                        <Box
                                            ref={versionNameRef}
                                            sx={{
                                                fontSize: "1.375rem",
                                                paddingRight: "5px",
                                                display: "inline-block",
                                                maxWidth: "250px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {`${version.versionName}`}
                                        </Box>
                                    </EcOverflowTooltip>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: "relative",
                                            margin: "1px 8px",
                                            fontSize: "14px",
                                            borderLeft: "1px solid #9e9e9e",
                                            paddingLeft: "10px",
                                            lineHeight: "15px",
                                        }}
                                    >
                                        Date{" "}
                                        <strong>
                                            {format(
                                                new Date(version.versionCreatedAt),
                                                "MMMM dd, yyyy"
                                            )}
                                        </strong>
                                    </Box>
                                    <Box
                                        sx={{
                                            position: "relative",
                                            margin: "1px 8px",
                                            fontSize: "14px",
                                            borderLeft: "1px solid #9e9e9e",
                                            paddingLeft: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                            lineHeight: "15px",
                                        }}
                                        className="share-link-fv"
                                    >
                                        <ShareIconStyled
                                            style={{
                                                color: "rgb(41, 121, 255)",
                                                fontSize: "14px",
                                                marginRight: "5px",
                                                marginBottom: "0",
                                            }}
                                            onClick={() => handleShareFlowVersion(version, nodeId)}
                                            sx={{
                                                cursor: "pointer",
                                            }}
                                        />
                                        <FigmaLink
                                            onClick={() => handleShareFlowVersion(version, nodeId)}
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                cursor: "pointer",
                                                textDecoration: "none",
                                                color: "rgb(41, 121, 255)",
                                                marginTop: "2px",
                                            }}
                                        >
                                            {" "}
                                            Share
                                        </FigmaLink>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                className="fv-row-items"
                                sx={{
                                    paddingTop: "18px",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    {version.versionRating != null ? (
                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                marginRight: "5px",
                                            }}
                                        >
                                            Average rating
                                        </Typography>
                                    ) : (
                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                marginRight: "5px",
                                            }}
                                        >
                                            Add rating
                                        </Typography>
                                    )}

                                    {averageEmoji !== null && version.versionRating != null && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginRight: "2px",
                                            }}
                                        >
                                            <img
                                                src={averageEmoji.src}
                                                alt={averageEmoji.alt}
                                                className="emoji"
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                }}
                                            />
                                        </Box>
                                    )}
                                    <AddReactionOutlinedIcon
                                        onClick={() => handleExpandClickEmoji(version.versionId)}
                                        sx={{
                                            fontSize: "20px",
                                            cursor: "pointer",
                                        }}
                                    />
                                </Box>
                                {version.versionRating != null && (
                                    <Box
                                        sx={{
                                            position: "relative",
                                            margin: "1px 8px",
                                            fontSize: "14px",
                                            borderLeft: "1px solid #9e9e9e",
                                            paddingLeft: "10px",
                                            cursor: "pointer",
                                            lineHeight: "15px",
                                        }}
                                        onClick={() => handleExpandTotalFeedback(version.versionId)}
                                    >
                                        Total Feedback :
                                        <span
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                                marginRight: "5px",
                                                marginLeft: "5px",
                                            }}
                                        >
                                            {version.versionRating.length}
                                        </span>
                                    </Box>
                                )}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: "relative",
                                            margin: "1px 8px",
                                            fontSize: "14px",
                                            borderLeft: "1px solid #9e9e9e",
                                            paddingLeft: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                            lineHeight: "15px",
                                        }}
                                    >
                                        Contributors :
                                    </Box>
                                    <Box>
                                        {version.versionUser != null ? (
                                            <>
                                                <AvatarGroup
                                                    max={4}
                                                    sx={{
                                                        "& .MuiAvatar-root": {
                                                            width: 24,
                                                            height: 24,
                                                            fontSize: 12,
                                                        },
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    {version.versionUser.map(
                                                        (versionuser: UserType) => (
                                                            <Avatar
                                                                key={versionuser.user_id}
                                                                src={versionuser.avatar}
                                                                style={{
                                                                    width: 24,
                                                                    height: 24,
                                                                    border: `1px solid transparent`,
                                                                    boxSizing: "content-box",
                                                                }}
                                                                onClick={(event) =>
                                                                    handleClick(
                                                                        event,
                                                                        version.versionId
                                                                    )
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </AvatarGroup>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={Boolean(
                                                        anchorEl &&
                                                            selectedVersion === version.versionId
                                                    )}
                                                    onClose={handleClose}
                                                    PaperProps={{
                                                        style: {
                                                            width: "230px",
                                                            maxHeight: "200px",
                                                            paddingTop: "10px",
                                                        },
                                                    }}
                                                    sx={{
                                                        overflowY: "auto",
                                                    }}
                                                >
                                                    {version.versionUser.map(
                                                        (versionuser: UserType) => (
                                                            <MenuItem key={versionuser.user_id}>
                                                                <Avatar
                                                                    src={versionuser.avatar}
                                                                    alt={versionuser.name}
                                                                    sx={{
                                                                        marginRight: "10px",
                                                                        width: "25px",
                                                                        height: "25px",
                                                                    }}
                                                                />
                                                                <Typography variant="body2">
                                                                    {versionuser.name ||
                                                                        versionuser.email}
                                                                </Typography>
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Menu>
                                            </>
                                        ) : (
                                            <Typography
                                                sx={{
                                                    fontWeight: "normal",
                                                    color: "#c0c0c0",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                There is no contributors
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    }
                    action={
                        <ExpandMore
                            expand={expandedId === version.versionId}
                            onClick={() => handleExpandClick(version.versionId)}
                            aria-expanded={expandedId === version.versionId}
                            aria-label="show more"
                            sx={{ marginTop: "20px" }}
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    }
                />
                <Collapse in={expandedId === version.versionId} timeout="auto" unmountOnExit>
                    {totalFeedback && version.versionRating ? (
                        <CardContent
                            sx={{
                                borderTop: "1px solid #C0C0C0",
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Recent Feedback
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginTop: "20px",
                                    overflow: "auto",
                                    maxHeight: "360px",
                                }}
                            >
                                {version.versionRating.map((rating: any) => (
                                    <>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                marginTop: "20px",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Avatar
                                                    src={rating.avatar}
                                                    alt={rating.name}
                                                    sx={{
                                                        marginRight: "10px",
                                                        width: "25px",
                                                        height: "25px",
                                                    }}
                                                />

                                                <Typography>{rating.name}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Date :
                                                    <span>
                                                        {format(
                                                            new Date(rating.ratingCreatedAt),
                                                            "MMMM dd, yyyy"
                                                        )}
                                                    </span>{" "}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                paddingLeft: "4px",
                                                marginTop: "10px",
                                            }}
                                        >
                                            <Typography sx={{ fontSize: "14px" }}>
                                                {rating.comment}
                                            </Typography>
                                        </Box>
                                    </>
                                ))}
                            </Box>
                        </CardContent>
                    ) : (
                        <CardContent
                            sx={{
                                borderTop: "1px solid #C0C0C0",
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}
                                >
                                    How do you find this prototype
                                </Typography>
                                <Typography
                                    sx={{
                                        marginTop: "8px",
                                        fontSize: "14px",
                                        textAlign: "center",
                                    }}
                                >
                                    Rating should be based on whether the protoype/design meets the
                                    objective or not
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginTop: "40px",
                                    textAlign: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                {EMOJI_DATA.map((emoji) => (
                                    <EmojiButton
                                        key={emoji.id}
                                        className={selectedEmoji.id === emoji.id ? "selected" : ""}
                                        onClick={() => handleEmojiClick(emoji)}
                                    >
                                        <img src={emoji.src} alt={emoji.alt} className="emoji" />
                                    </EmojiButton>
                                ))}
                            </Box>
                            {selectedEmoji.id !== undefined && (
                                <>
                                    <Stack
                                        direction="row"
                                        sx={{
                                            flexWrap: "wrap",
                                            marginTop: "40px",
                                            columnGap: "5px",
                                        }}
                                    >
                                        {selectedEmoji?.suggestions?.map(
                                            (suggestionsLabel: any) => (
                                                <Chip
                                                    key={suggestionsLabel}
                                                    label={suggestionsLabel}
                                                    onClick={() =>
                                                        handleChipClick(suggestionsLabel)
                                                    }
                                                    variant="outlined"
                                                    sx={{
                                                        marginTop: "0px",
                                                        marginBottom: "12px",
                                                    }}
                                                />
                                            )
                                        )}
                                    </Stack>
                                    <Box
                                        sx={{
                                            height: "200px",
                                        }}
                                    >
                                        <TextField
                                            id="outlined-basic"
                                            label="Leave a comments"
                                            variant="outlined"
                                            sx={{
                                                height: "150px",
                                                width: "100%",
                                            }}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton
                                                        onClick={() => setCustomText("")}
                                                        edge="end"
                                                    >
                                                        <ClearIcon />
                                                    </IconButton>
                                                ),
                                            }}
                                            value={customText}
                                            onChange={handleTextFieldChange}
                                            multiline
                                            rows={6}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            flexDirection: "row",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            onClick={handleCancel}
                                            sx={{
                                                marginRight: "10px",
                                            }}
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            variant="contained"
                                            onClick={handlePost}
                                            disabled={
                                                selectedEmoji.id === undefined ||
                                                customText.trim().length === 0 ||
                                                false
                                            }
                                        >
                                            Post
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </CardContent>
                    )}
                </Collapse>
            </Card>
            {shareVersionDrawer && shareVersionDrawer}
        </CustCardContainer>
    );
};
