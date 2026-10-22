interface PostType {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface PostRequestType {
    id: number;
    title: string;
    description: string;
}
export { PostRequestType, PostType };
