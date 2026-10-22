// TODO: check when we get value in 2nd format and are we using it anywhere?

import { CommentDataType } from "./comment";
import { UserType } from "./project";

// if not, remove it.
type PageRowType =
    | {
          type: string;
          id: number;
          name: string;
          expanded: boolean;
          link?: string;
          page_users: PageUserType[];
          flows: FlowRowType[];
      }
    | {
          type: "DETAIL";
          id: number;
          parentId: number;
          flows: FlowRowType[];
      };

interface PageUserType {
    user_id: number;
    status: number;
    name: string;
    email: string;
    avatar: string;
}

interface FlowRowType {
    node_id: string;
    id: number;
    name: string;
    flow_users: FlowUserType[];
}
interface FlowUserType {
    user_id: number;
    status: number;
    name: string;
    email: string;
    avatar: string;
}

interface FlowType {
    // TODO: keys should be in camelCase
    flow_id: string;
    name: string;
    node_id: string;
    flowLink: string;
    // TODO: update type for versions array
    versions: any[];
    // TODO: check type for flow_users remove if not in use, also it should be users from backend.
    flow_users: any[];
    comments: CommentDataType[];
}

interface PageType {
    // TODO: keys should be in camelCase
    page_id: number;
    name: string;
    node_id: string;
    pageLink: string;
    flows: FlowType[];
    page_users: UserType[];
    comments: CommentDataType[];
}

interface PrototypeUserType {
    userId: number;
    status: number;
    name: string;
    email: string;
    avatar: string;
}

interface ProcessedPrototypeDataType {
    prototypeId: number;
    prototypeTitle: string;
    nodeId: string;
    prototypeLink?: string;
    prototypeComments: CommentDataType[];
    versions: VersionDataType[];
    users: PrototypeUserType[];
}

interface ProcessedPageDataType {
    pageId: number;
    pageTitle: string;
    nodeId: string;
    link: string;
    totalVersions: VersionDataType[];
    prototypes: ProcessedPrototypeDataType[];
    comments: CommentDataType[];
    users: any[];
    expanded: boolean;
}

interface PrototypeDataType {
    prototypeId: number;
    nodeId: string;
    prototypeTitle: string;
    users: PrototypeUserType[];
    prototypeLink?: string;
    versions: VersionDataType[];
    prototypeComments: any[];
}

interface PrototypePageContextType {
    drawerContent?: JSX.Element;
    setDrawerContent: Dispatch<SetStateAction<JSX.Element>>;
    isVersionUpdated?: boolean;
    setVersionUpdated?: Dispatch<SetStateAction<boolean>>;
}

interface VersionUserDataType {
    user_id: number;
    status: number;
    name: string | null;
    email: string;
    avatar: string | null;
}

interface VersionDataType {
    version_id: number;
    name: string;
    created_at: string;
    version_users: VersionUserDataType[];
}

export {
    FlowRowType,
    FlowType,
    PageRowType,
    PageType,
    ProcessedPageDataType,
    ProcessedPrototypeDataType,
    PrototypePageContextType,
    VersionDataType,
};
