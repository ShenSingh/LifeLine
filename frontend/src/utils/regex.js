// src/utils/regex.js

export const regexPatterns = {
    // ✅ Sri Lankan Mobile Number (07X-XXXXXXX) (Without country code)
    mobile: /^(?:07[01245678])\d{7}$/,

    // ✅ Sri Lankan Landline Number (0XX-XXXXXXX)
    landline: /^(?:0[1-9]{1}[0-9])\d{6}$/,

    // ✅ Sri Lankan Phone Number with Country Code (+94XX-XXXXXXX)
    phoneWithCountryCode: /^\+94(7[01245678]|[1-9]{2})\d{7}$/,

    // ✅ Sri Lankan National Identity Card (NIC) (Old & New)
    nic: /^(?:\d{9}[Vv]|[0-9]{12})$/,

    // ✅ Sri Lankan Postal Code (00000 - 99999)
    postalCode: /^\d{5}$/,

    // ✅ Sri Lankan Vehicle Number Plates
    vehicleNumber: /^[A-Z]{2,3}-\d{4}$/,  // Ex: "WP-1234", "ABC-5678"

    // ✅ Sri Lankan Address (Allows letters, numbers, commas, and spaces)
    address: /^[a-zA-Z0-9\s,.'-]{5,}$/,

    // ✅ Sri Lankan Names (Only Sinhala, Tamil & English letters)
    name: /^[A-Za-z\u0D80-\u0DFF\u0B80-\u0BFF\s'-]{2,50}$/,

    // ✅ General Email Pattern
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

    // ✅ Password (Min 6 chars, at least one letter & one number)
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,

    // ✅ Date Format (YYYY-MM-DD)
    date: /^\d{4}-\d{2}-\d{2}$/,

    // ✅ Currency (Sri Lankan Rupees Format Rs. 1234.56)
    currency: /^Rs\.\s?\d+(?:\.\d{2})?$/,

    // ✅ IP Address (IPv4)
    ipAddress: /^(?:\d{1,3}\.){3}\d{1,3}$/,

    // ✅ Website URL (General)
    url: /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:\d+)?(\/.*)?$/,

    // ✅ Only Numbers (Useful for fields like age)
    numbersOnly: /^\d+$/,

    // ✅ Only Letters (No numbers or special characters)
    lettersOnly: /^[A-Za-z\s]+$/,

    // ✅ Sinhala Characters (Supports Sinhala Unicode Range)
    sinhalaText: /^[\u0D80-\u0DFF\s]+$/,

    // ✅ Tamil Characters (Supports Tamil Unicode Range)
    tamilText: /^[\u0B80-\u0BFF\s]+$/,
};
