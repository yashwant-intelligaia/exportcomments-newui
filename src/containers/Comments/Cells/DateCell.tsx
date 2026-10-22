"use client";

import moment from "moment";

export const DateCell = (props: any) => {
    const { value } = props;
    let data = "";
    if (value.row) {
        if (value.row[value.column.key]) {
            const latest = moment(new Date());
            const datefromFile = moment(value.row[value.column.key]);
            if (datefromFile.diff(latest, "day") === 0) {
                data = moment(new Date(value.row[value.column.key])).format("h:mm a");
            } else {
                data = moment(new Date(value.row[value.column.key])).format("ll");
            }
        } else {
            data = "-";
        }
    } else if (value.createdAt) {
        const latest = moment(new Date());
        const datefromFile = moment(value.createdAt);
        if (datefromFile.diff(latest, "day") === 0) {
            data = moment(new Date(value.createdAt)).format("h:mm a");
        } else {
            data = moment(new Date(value.createdAt)).format("ll");
        }
    } else {
        data = "-";
    }
    return <span>{data}</span>;
};
