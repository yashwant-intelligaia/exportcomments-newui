import { Breadcrumbs, Link, Typography } from "@mui/material";

import { uniqueKey } from "../../../utils";

export interface EcBreadcrumbDataType {
    title: string;
    active?: boolean;
    onClick?: () => void;
}

interface EcBreadcrumbPropsType {
    data: EcBreadcrumbDataType[];
}

export const EcBreadcrumb = (props: EcBreadcrumbPropsType) => {
    const { data } = props;

    return (
        <Breadcrumbs
            sx={{
                ".MuiBreadcrumbs-separator": {
                    color: "#B4B4BB",
                    margin: "auto 5px",
                    fontSize: "0.875rem",
                },
            }}
            aria-label="breadcrumb"
        >
            {data.map(({ title, active, onClick }, index) =>
                active ? (
                    <Link
                        key={uniqueKey(`${title}-active-breadcrumb-${index}`)}
                        underline="hover"
                        color="#5494FF"
                        style={{
                            cursor: "pointer",
                            textDecoration: "none",
                        }}
                        onClick={onClick}
                    >
                        {title}
                    </Link>
                ) : (
                    <Typography
                        key={uniqueKey(`${title}-inactive-breadcrumb-${index}`)}
                        color="text.primary"
                    >
                        {title}
                    </Typography>
                )
            )}
        </Breadcrumbs>
    );
};
