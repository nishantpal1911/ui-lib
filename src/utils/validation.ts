export const isNumeric = (str: string): boolean => !isNaN(Number(str)) && !str.includes(' ');

export const isInteger = (str: string): boolean => isNumeric(str) && !str.includes('.');

export const isAlpha = (str: string): boolean => /^[A-Za-z]+$/.test(str);

export const isAlphaNumeric = (str: string): boolean => /^[a-zA-Z0-9]+$/.test(str);
