import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { styled } from "@mui/material/styles";

import { ActionButtonType } from "../../../types";
import { uniqueKey } from "../../../utils";

interface ProjectCardPropsType {
    title: JSX.Element;
    children: JSX.Element;
    icon?: JSX.Element;
    action?: JSX.Element;
    actionButtons?: ActionButtonType[];
}

const StyledButton = styled(Button)(`
  text-transform: none;
  justify-content: flex-start;
`);

const ProjectCard = (props: ProjectCardPropsType) => {
    const { icon, title, action, children, actionButtons } = props;
    return (
        <Card elevation={4} sx={{ minWidth: 300, mb: 2 }}>
            <CardHeader sx={{ px: 2, pt: 1, pb: 2 }} avatar={icon} action={action} title={title} />

            <CardContent sx={{ mt: -1.5, mx: { xs: 1.75, sm: 1.5, md: 1.75 }, p: 0.5 }}>
                {children}
                {!!actionButtons && actionButtons.length > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignContent: "flex-start",
                            flexWrap: "wrap",
                            mt: 1,
                            height: "auto",
                        }}
                    >
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            {actionButtons.map(
                                ({ icon: actionButtonIcon, label, onClick, disabled }, index) => (
                                    <StyledButton
                                        key={uniqueKey(index)}
                                        onClick={onClick}
                                        variant="text"
                                        disabled={disabled}
                                        startIcon={actionButtonIcon}
                                    >
                                        {label}
                                    </StyledButton>
                                )
                            )}
                        </Stack>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export { ProjectCard };
