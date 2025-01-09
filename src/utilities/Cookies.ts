export function setCookie(name: string, value: string, days?: number, path: string = '/', secure: boolean = false): void {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path};`;
    
    if (days) {
        const expires = new Date();
        expires.setDate(expires.getDate() + days);
        cookieString += ` expires=${expires.toUTCString()};`;
    }
    
    if (secure) {
        cookieString += ' Secure;';
    }
    
    document.cookie = cookieString;
}

export function getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
        
        if (cookieName === encodeURIComponent(name)) {
            return decodeURIComponent(cookieValue);
        }
    }
    
    return null;
}