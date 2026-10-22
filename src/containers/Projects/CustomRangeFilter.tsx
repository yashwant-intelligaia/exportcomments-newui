"use client";

import { endOfDay, format, parse, startOfDay } from "date-fns";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Popover } from "@/components/ui/Popover";

interface CustomRangeFilterProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    onApply: ({ startDate, endDate }: { startDate: string; endDate: string }) => void;
    onCancel: () => void;
    handleClosePopover: () => void;
}

const DATE_FORMAT = "yyyy-MM-dd";

const DateField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
    <label className="mb-5 block text-sm font-semibold text-ink last:mb-0">
        {label}
        <input
            type="date"
            value={value}
            max={format(new Date(), DATE_FORMAT)}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 block h-10 w-full rounded-sm border border-ink/60 bg-surface px-2.5 text-sm font-normal text-ink focus:ring-2 focus:ring-ink focus:outline-none"
        />
    </label>
);

export const CustomRangeFilter = ({ anchorEl, open, onClose, onApply, onCancel, handleClosePopover }: CustomRangeFilterProps) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleApply = () => {
        if (startDate && endDate) {
            handleClosePopover();
            onApply({
                startDate: startOfDay(parse(startDate, DATE_FORMAT, new Date())).toISOString(),
                endDate: endOfDay(parse(endDate, DATE_FORMAT, new Date())).toISOString(),
            });
            onClose();
        }
        // TODO: add logic to display required field message
    };

    const handleCancel = () => {
        onCancel();
        onClose();
    };

    return (
        <Popover open={open} anchorEl={anchorEl} onClose={onClose} className="mt-2">
            <div className="w-72 p-4">
                <h6 className="pb-4 text-lg font-medium text-ink">Select Date</h6>
                <DateField label="From" value={startDate} onChange={setStartDate} />
                <DateField label="To" value={endDate} onChange={setEndDate} />
                <div className="mt-8 flex justify-end gap-2">
                    <Button variant="text" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="text" onClick={handleApply} disabled={!startDate || !endDate}>
                        Apply
                    </Button>
                </div>
            </div>
        </Popover>
    );
};
