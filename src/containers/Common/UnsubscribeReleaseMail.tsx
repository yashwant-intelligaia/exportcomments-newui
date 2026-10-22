"use client";

import { useEffect, useState } from "react";

import { useHistory } from "@/utils/navigation";

import { useUnsubscribeMutation } from "../../hooks";
import { EcDialog } from "../../stories/components/EcDialog/EcDialog";

interface UnsubscribeReleaseMailPropsType {
    token: string;
}

export const UnsubscribeReleaseMail = (props: UnsubscribeReleaseMailPropsType) => {
    const [confirmDialog, setConfirmDialog] = useState<JSX.Element>();
    const history = useHistory();
    const { token } = props;
    const { releaseEmail } = useUnsubscribeMutation();
    const { mutate: mutateUnsubscribeReleaseMail, isSuccess, isError } = releaseEmail;

    useEffect(() => {
        if (token) {
            setConfirmDialog(
                <EcDialog
                    title="Unsubscribe Mail"
                    description="Are you sure you want to unsubscribe and stop receiving future release emails."
                    open
                    actionButtons={[
                        {
                            label: "Cancel",
                            onClick: () => {
                                setConfirmDialog(undefined);
                                history.push("/");
                            },
                            variant: "outlined",
                        },
                        {
                            label: "Yes, I'm Sure",
                            onClick: () => {
                                mutateUnsubscribeReleaseMail({ token });
                                setConfirmDialog(undefined);
                            },
                            variant: "contained",
                        },
                    ]}
                    onClose={() => {
                        setConfirmDialog(undefined);
                    }}
                />,
            );
        }
    }, [token]);

    useEffect(() => {
        if (isSuccess || isError) {
            history.push("/");
        }
    }, [isSuccess, isError]);
    return confirmDialog || <></>;
};
