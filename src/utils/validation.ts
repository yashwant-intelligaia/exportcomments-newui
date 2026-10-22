"use client";

export const validateEmail = (value: any) => {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(value) || "Email is not valid";
};
export const validateName = (value: any) => {
    const namePattern = /^[a-zA-Z0-9][a-zA-Z0-9\s]+$/;
    return namePattern.test(value) || "Name is not valid";
};
