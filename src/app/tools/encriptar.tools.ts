export class Encriptar {

    encrypt(element: any): string {
        const ELEMENT_ENCRYPTED = Buffer.from(JSON.stringify(element)).toString('base64')
        return ELEMENT_ENCRYPTED;
    }

    desencrypt(element: string): any {
        if (element === '' || element.trim() === '') { return false; }
        try {
            const ELEMENT_DESENCRYPTED = Buffer.from(element, 'base64').toString('utf8');
            return JSON.parse(ELEMENT_DESENCRYPTED);
        } catch (err) {
            return false;
        }
    }
}