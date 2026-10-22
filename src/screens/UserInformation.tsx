"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { DataColumn, DataTable } from "@/components/ui/DataTable";

import { useFetchUsers } from "../hooks/usersHook";
import { SbAvatar } from "../stories/components/avatar/Avatar";
import { CommonActionsCell } from "../stories/components/grid-cells/actions/CommonActionsCell";
import { Loader } from "../stories/components/Loader/Loader";
import { ISnackBarMessage, IUserInformation } from "../types";
import { getLoadingImage, getLoadingMessage, snackbar } from "../utils";

export const UserInformation = snackbar((props: ISnackBarMessage) => {
    const { data, isLoading } = useFetchUsers(props);
    const [height, setHeight] = useState(800);
    const [users, setUsers] = useState([] as IUserInformation[]);
    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        if (data) {
            data.data.data = data.data.data.filter(
                (value, index, array) => array.findIndex((user) => user.figmaUserId === value.figmaUserId) === index,
            );
            setUsers(data.data.data);
        }
    }, [data]);

    useEffect(() => {
        const updateSize = () => setHeight(window.innerHeight);
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const query = filterValue.trim().toLowerCase();
    const filteredUser = query ? users.filter((r) => r.name.toLowerCase().startsWith(query)) : users;

    const columns: DataColumn<IUserInformation>[] = [
        {
            key: "avatar",
            name: "Avatar",
            width: 80,
            sortable: false,
            render: (row) => <SbAvatar imageSrc={row.avatar} size="small" imageAlt="profile" />,
        },
        { key: "name", name: "Name", minWidth: 200 },
        { key: "email", name: "Email", minWidth: 240 },
        {
            key: "figmaUserId",
            name: "Action",
            minWidth: 200,
            sortable: false,
            render: (row) => (
                <CommonActionsCell
                    value={{ row, column: { key: "figmaUserId" } }}
                    from="all-user"
                    defaultLabel="Go to My Files"
                    defaultActions="naviagte-file"
                />
            ),
        },
    ];

    return (
        <>
            {isLoading && <Loader message={getLoadingMessage("")} image={getLoadingImage("")} />}
            <div className="px-5 py-3">
                <label className="border-ink/60 focus-within:border-ink mb-3 flex max-w-xs items-center border-b">
                    <Search className="text-muted mr-2 size-5" />
                    <input
                        className="text-ink placeholder:text-muted w-full bg-transparent py-1.5 text-sm focus:outline-none"
                        placeholder="Enter  Name"
                        aria-label="Filter by name"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                    />
                </label>
                <DataTable<IUserInformation>
                    ariaLabel="Users"
                    columns={columns}
                    rows={filteredUser}
                    rowKey={(row) => row.figmaUserId}
                    height={Math.max(height - 150, 240)}
                    headerHeight={50}
                    rowHeight={56}
                />
            </div>
        </>
    );
});
