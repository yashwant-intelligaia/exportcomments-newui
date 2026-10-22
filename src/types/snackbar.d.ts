import type { Severity as AlertColor } from "../components/ui/Snackbar";
import { ITreeRowType } from ".";

interface ISnackBarMessage {
    snackbarShowMessage?(msg: string, SeverityType?: AlertColor, duration?: number): void;
}

interface IShareSheetMessageType extends ISnackBarMessage {
    projectId: string;
    users: IFileUser;
    close(): void;
}

interface ISharesheetSnackBarMessage extends ISnackBarMessage {
    projectId: string;
    users: IFileUser;
    close(): void;
}

interface ICreateGitTicketSnackBarMessage extends ISnackBarMessage {
    projectId: string;
    row: ITreeRowType;
    close(): void;
    handleAction(parameter: string, value: string): void;
}

// TODO: remove once ToasterContext implemented at all places
interface ISnackBar {
    message: string;
    severity: AlertColor | undefined;
    duration: number;
    open: boolean;
    onClose(): void;
}

interface SnackbarPropsType {
    open: boolean;
    title?: string;
    message: string;
    severity: AlertColor | undefined;
    duration?: number;
    severity?: AlertColor;
    onClose?: () => void;
}
export { ICreateGitTicketSnackBarMessage, ISharesheetSnackBarMessage, ISnackBar, ISnackBarMessage, SnackbarPropsType };
