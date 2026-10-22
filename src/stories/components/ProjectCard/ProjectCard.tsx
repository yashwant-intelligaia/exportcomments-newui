"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Display";

import { ActionButtonType } from "../../../types";
import { uniqueKey } from "../../../utils";

interface ProjectCardPropsType {
    title: JSX.Element;
    children: JSX.Element;
    icon?: JSX.Element;
    action?: JSX.Element;
    actionButtons?: ActionButtonType[];
}

const ProjectCard = ({ icon, title, action, children, actionButtons }: ProjectCardPropsType) => (
    <Card className="mb-4 min-w-[300px]">
        <div className="flex items-center gap-3 px-4 pt-2 pb-4">
            {icon}
            <div className="flex-1">{title}</div>
            {action}
        </div>
        <div className="mx-3 px-1 pb-3">
            {children}
            {!!actionButtons && actionButtons.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2 sm:gap-6">
                    {actionButtons.map(({ icon: actionButtonIcon, label, onClick, disabled }, index) => (
                        <Button
                            key={uniqueKey(index)}
                            onClick={onClick}
                            variant="text"
                            disabled={disabled}
                            startIcon={actionButtonIcon}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    </Card>
);

export { ProjectCard };
