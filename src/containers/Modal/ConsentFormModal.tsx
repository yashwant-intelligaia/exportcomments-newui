"use client";

import { useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/Form";

import { useUserMutation } from "../../hooks";
import { EcModal } from "../../stories/components/EcModal/EcModal";
import { ActionButtonType } from "../../types";
import { EclogoIcon } from "../../utils";
import { ConsentPreview } from "../Common/ConsentPreview";

interface IConsentFormModal {
    onClose: () => void;
    open: boolean;
    showCloseIcon: boolean;
}

const ConsentFormModal = (props: IConsentFormModal) => {
    const { onClose, open } = props;
    const [isTermsCondition, setIsTermsCondition] = useState(false as boolean);
    const { acceptTermsOfUseAndPrivacyPolicy } = useUserMutation();
    const { mutate, isSuccess, isPending } = acceptTermsOfUseAndPrivacyPolicy;

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess]);

    const modalContent = (
        <div className="my-4">
            <div className="max-sm:overflow-scroll">
                <div>
                    Protecting your privacy and ensuring your data security are our top priorities. Review our Privacy
                    Policy and Terms of Use to understand how we handle your information and outline your rights and
                    responsibilities while using our website. Your trust and compliance are essential to us.
                </div>
                <div className="bg-paper my-4 rounded-md p-4 text-left">
                    <div className="h-[400px] overflow-y-scroll pr-1 text-left">
                        <ConsentPreview />
                    </div>
                </div>
            </div>
            <div className="border-line flex flex-col justify-center border-t-2 pt-1">
                <Checkbox
                    checked={isTermsCondition}
                    onChange={() => setIsTermsCondition(!isTermsCondition)}
                    label={
                        <span className="inline-flex flex-wrap">
                            I agree that I have read the above info and I agree to &nbsp;
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="/terms-of-use"
                                className="text-blue-ink underline"
                            >
                                Terms of Use
                            </a>
                            &nbsp; and &nbsp;
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="/privacy-policy"
                                className="text-blue-ink underline"
                            >
                                Privacy Policy
                            </a>
                        </span>
                    }
                />
            </div>
        </div>
    );
    const LetsStartActionButtons: ActionButtonType = {
        label: "Submit",
        onClick: () => mutate(),
        variant: "contained",
        disabled: !isTermsCondition || isPending,
    };
    return (
        <EcModal
            size="md"
            open={open}
            onClose={onClose}
            title={
                <h4 className="mb-3 flex items-center gap-2 font-sans text-xl font-bold tracking-normal">
                    <EclogoIcon /> Export Comments privacy policy and terms of use
                </h4>
            }
            actionButtons={LetsStartActionButtons}
            showCloseIcon={false}
        >
            {modalContent}
        </EcModal>
    );
};

export { ConsentFormModal };
