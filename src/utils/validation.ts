"use client";

export const validateEmail = (value: any) => {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(value) || "Email is not valid";
};
export const validateName = (value: any) => {
    const namePattern = /^[a-zA-Z0-9][a-zA-Z0-9\s]+$/;
    return namePattern.test(value) || "Name is not valid";
};

/** Formats digits as "(123) 456-789-012" (up to 12 digits) while typing. */
export const formatPhoneNumber = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 12);
    if (d.length === 0) return "";
    const parts = [d.slice(0, 3), d.slice(3, 6), d.slice(6, 9), d.slice(9, 12)];
    let out = `(${parts[0]}`;
    if (d.length >= 3) out += ")";
    if (parts[1]) out += ` ${parts[1]}`;
    if (parts[2]) out += `-${parts[2]}`;
    if (parts[3]) out += `-${parts[3]}`;
    return out;
};
