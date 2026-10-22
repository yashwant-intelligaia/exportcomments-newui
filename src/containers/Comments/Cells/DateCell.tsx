"use client";

import { differenceInDays, format } from "date-fns";

/* Same-day dates show the time, older dates show e.g. "Oct 22, 2026". */
const formatDate = (raw: string | number | Date) => {
    const date = new Date(raw);
    return differenceInDays(date, new Date()) === 0 ? format(date, "h:mm a") : format(date, "MMM d, yyyy");
};

export const DateCell = (props: any) => {
    const { value } = props;
    let data = "-";
    if (value.row) {
        if (value.row[value.column.key]) data = formatDate(value.row[value.column.key]);
    } else if (value.createdAt) {
        data = formatDate(value.createdAt);
    }
    return <span>{data}</span>;
};
