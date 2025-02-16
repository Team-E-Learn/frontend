// registration.ts

export function validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

export function validateUsername(username: string): boolean {
    return username.length >= 3;
}

export function validate2FA(twoFaCode: string): boolean {
    return twoFaCode === '7890';  // Example validation
}

export function validatePassword(password: string): boolean {
    return password.length >= 6;
}
