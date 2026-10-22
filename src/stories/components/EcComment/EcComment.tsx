import { Avatar, Box, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";

import { getMessagesWithEmojis } from "../../../utils/common";

interface EcCommentPropsType {
    name: string;
    src: string;
    date: string;
    message: string;
}

const EcComment = ({ name, src, date, message }: EcCommentPropsType) => (
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
                    src={src}
                    alt={name}
                    sx={{
                        marginRight: "10px",
                        width: "25px",
                        height: "25px",
                    }}
                />

                <Typography>{name}</Typography>
            </Box>
            <Box>
                <span
                    style={{
                        fontSize: "12px",
                        fontWeight: 400,
                    }}
                >
                    {format(parseISO(date), "MMM d, yyyy")}
                </span>
            </Box>
        </Box>
        <Box
            sx={{
                paddingLeft: "4px",
                marginTop: "10px",
            }}
        >
            <Typography sx={{ fontSize: "14px" }}>{getMessagesWithEmojis(message)}</Typography>
        </Box>
    </>
);

export { EcComment };
