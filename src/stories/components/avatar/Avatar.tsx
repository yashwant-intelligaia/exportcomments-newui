import { Avatar, createTheme, ThemeProvider } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const AvatarDiv = styled.div`
    .sb-avatar {
        &.sb-avatar {
            &--small {
                width: 1.5rem;
                height: 1.5rem;
            }
            &--medium {
                width: 2.5rem;
                height: 2.5rem;
            }
            &--large {
                width: 3.5rem;
                height: 3.5rem;
            }
        }
    }
    .sb-avatarGroup {
        display: inline-flex !important;
    }
`;

export const SbAvatar = ({ imageSrc, imageAlt, size, className }: any) => {
    const theme = createTheme();
    return (
        <>
            <ThemeProvider theme={theme}>
                <AvatarDiv>
                    <Avatar
                        className={["sb-avatar", `sb-avatar--${size}`, className].join(" ")}
                        alt={imageAlt}
                        src={imageSrc}
                    />
                </AvatarDiv>
            </ThemeProvider>
        </>
    );
};

SbAvatar.propTypes = {
    /**
     * Add image Avatar
     */
    imageSrc: PropTypes.string,
    /**
     * Select the size of the avatar
     */
    size: PropTypes.oneOf(["small", "medium", "large"]),
    /**
     * Add alt text for image
     */
    imageAlt: PropTypes.string,
};

SbAvatar.defaultProps = {
    imageSrc:
        "https://www.gravatar.com/avatar/09048b35f7655dcbd1ee0adc1ab51a83?size=240&default=https%3A%2F%2Fs3-alpha.figma.com%2Fstatic%2Fuser_s_v2.png",

    size: "medium",
    imageAlt: "Remy Sharp",
};
