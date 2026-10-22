import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Box } from "@mui/material";
import { useEffect, useLayoutEffect as useOriginalLayoutEffect, useRef } from "react";

const useLayoutEffect = typeof window === "undefined" ? useEffect : useOriginalLayoutEffect;

function useFocusRef<T extends HTMLOrSVGElement>(isSelected: boolean) {
    const ref = useRef<T>(null);

    useLayoutEffect(() => {
        if (!isSelected) return;
        ref.current?.focus({ preventScroll: true });
    }, [isSelected]);

    return {
        ref,
        tabIndex: isSelected ? 0 : -1,
    };
}

const cellExpandClassname = `
  float: right;
  display: table;
  height: 100%;
  > span {
    display: table-cell;
    vertical-align: middle;
    cursor: pointer;
  }
`;

interface CellExpanderFormatterProps {
    isCellSelected: boolean;
    expanded: boolean;
    onCellExpand: () => void;
}

export function CellExpanderFormatter({
    isCellSelected,
    expanded,
    onCellExpand,
}: CellExpanderFormatterProps) {
    const { ref, tabIndex } = useFocusRef<HTMLSpanElement>(isCellSelected);

    function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            onCellExpand();
        }
    }

    return (
        <Box className={cellExpandClassname} style={{ cursor: "pointer" }}>
            <span onClick={onCellExpand} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
                <span ref={ref} tabIndex={tabIndex}>
                    {expanded ? (
                        <ExpandLessOutlinedIcon sx={{ verticalAlign: "text-bottom" }} />
                    ) : (
                        <ExpandMoreOutlinedIcon sx={{ verticalAlign: "text-bottom" }} />
                    )}
                </span>
            </span>
        </Box>
    );
}
