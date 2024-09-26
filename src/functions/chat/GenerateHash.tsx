export const generateHash = (length: number): string => {

    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';   
    let hash = '';   
    for (let i = 0; i < length; i++) {   
    const randomIndex = Math.floor(Math.random() * characters.length);   
    hash += characters[randomIndex];   
    }   
    return hash;   
    };