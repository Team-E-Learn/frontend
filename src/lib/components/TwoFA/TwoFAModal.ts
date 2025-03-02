export const verify2FACode = (code: string, trustDevice: boolean): { verified: boolean; message?: string } => {
    // Hardcoded verification check (will be replace with actual 2fa logic)
    if (code === '123456') {
        if (trustDevice) {
            console.log('Device will be trusted for 30 days.');
        }
        return { verified: true };
    }
    return { verified: false, message: 'Invalid 2FA code. Please try again.' };
};
