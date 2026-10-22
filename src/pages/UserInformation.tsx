import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import DataGrid, { Column, FormatterProps, HeaderRendererProps } from "react-data-grid";

import { useFocusRef } from "../hooks/useFocusRef";
import { useFetchUsers } from "../hooks/usersHook";
import { SbAvatar } from "../stories/components/avatar/Avatar";
import { CommonActionsCell } from "../stories/components/grid-cells/actions/CommonActionsCell";
import { Loader } from "../stories/components/Loader/Loader";
import { ISnackBarMessage, IUserInformation } from "../types";
import { getLoadingImage, getLoadingMessage, snackbar } from "../utils";

function rowKeyGetter(row: IUserInformation) {
    return parseInt(row.figmaUserId, 10);
}
interface Filter extends Omit<IUserInformation, "figmaUserId"> {
    enabled: boolean;
}

const FilterContext = createContext<Filter | undefined>(undefined);

export const UserInformation = snackbar((props: ISnackBarMessage) => {
    const { data, isLoading } = useFetchUsers(props);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        if (data) {
            data.data.data = data.data.data.filter(
                (value, index, array) =>
                    array.findIndex((user) => user.figmaUserId === value.figmaUserId) === index
            );
            setUsers(data.data.data);
            setfilteredUser(data.data.data);
        }
    }, [data]);

    const [users, setUsers] = useState([] as IUserInformation[]);
    const [filterValue, setFilterValue] = useState("");
    const [filtereduser, setfilteredUser] = useState([] as IUserInformation[]);

    const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value);
        if (event.target.value) {
            setfilteredUser(
                users.filter((r) =>
                    r.name.toLowerCase().startsWith(event.target.value.toLowerCase())
                )
            );
        } else {
            setfilteredUser(users);
        }
    };
    function inputStopPropagation(event: React.KeyboardEvent<HTMLInputElement>) {
        if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
            event.stopPropagation();
        }
    }
    const columns: readonly Column<any>[] = [
        {
            key: "avatar",
            name: "Avatar",
            formatter: (row: React.PropsWithChildren<FormatterProps<any, unknown>>) => (
                <SbAvatar imageSrc={row.row.avatar} size="small" imageAlt="profile" />
            ),
            width: 80,
            frozen: true,
        },

        {
            key: "name",
            name: "Name",
            headerCellClass: "filter-cell",
            headerRenderer: (headerProps) => (
                <FilterRenderer<IUserInformation, unknown, HTMLInputElement> {...headerProps}>
                    {({ ...rest }) => (
                        <input
                            {...rest}
                            className="filterText"
                            placeholder="Enter  Name"
                            value={filterValue}
                            onChange={(e) => onFilterChange(e)}
                            onKeyDown={inputStopPropagation}
                        />
                    )}
                </FilterRenderer>
            ),
        },

        {
            key: "email",
            name: "Email",
        },
        {
            key: "figmaUserId",
            name: "Action",
            formatter: (row: React.PropsWithChildren<FormatterProps<any, unknown>>) => (
                <CommonActionsCell
                    value={row}
                    from="all-user"
                    defaultLabel="Go to My Files"
                    defaultActions="naviagte-file"
                />
            ),
        },
    ];

    function FilterRenderer<R, SR, T extends HTMLOrSVGElement>({
        isCellSelected,
        column,
        children,
    }: HeaderRendererProps<R, SR> & {
        children: (args: {
            ref: React.RefObject<T>;
            tabIndex: number;
            filters: Filter;
        }) => React.ReactElement;
    }) {
        const filters = useContext(FilterContext)!;
        const { ref, tabIndex } = useFocusRef<T>(isCellSelected);

        return (
            <>
                <div>{column.name}</div>
                <div>{children({ ref, tabIndex, filters })}</div>
            </>
        );
    }

    useLayoutEffect(() => {
        function updateSize() {
            setHeight(window.innerHeight);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
        <>
            {isLoading && <Loader message={getLoadingMessage("")} image={getLoadingImage("")} />}

            {filtereduser && (
                <DataGrid
                    style={{
                        height: `${height - 60}px`,
                    }}
                    columns={columns}
                    rows={filtereduser}
                    headerRowHeight={70}
                    rowKeyGetter={rowKeyGetter}
                    defaultColumnOptions={{ resizable: true }}
                />
            )}
        </>
    );
});
