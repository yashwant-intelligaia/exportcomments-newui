import { PageNotFound, UnsubscribeReleaseMail } from "../containers";
import { useQueryParams } from "../utils";

export const UnsubscribePage = () => {
    const query = useQueryParams();
    const type = query.get("type");
    const token = query.get("token");

    if (type === "release" && token) {
        return <UnsubscribeReleaseMail token={token} />;
    }
    return <PageNotFound />;
};
