/* Tiny native replacements for the few lodash helpers the app used. */

export const get = (obj: any, path: string | string[], defaultValue?: any) => {
    const keys = Array.isArray(path)
        ? path
        : path
              .replace(/\[(\d+)\]/g, ".$1")
              .split(".")
              .filter(Boolean);
    let cur = obj;
    for (const key of keys) {
        if (cur === null || cur === undefined) return defaultValue;
        cur = cur[key];
    }
    return cur === undefined ? defaultValue : cur;
};

export const isEmpty = (value: unknown) => {
    if (value === null || value === undefined) return true;
    if (Array.isArray(value) || typeof value === "string") return value.length === 0;
    if (typeof value === "object") return Object.keys(value as object).length === 0;
    return true;
};

export const cloneDeep = <T>(value: T): T => structuredClone(value);

export const debounce = <A extends unknown[]>(fn: (...args: A) => void, wait: number) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    return (...args: A) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), wait);
    };
};

export const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
};
