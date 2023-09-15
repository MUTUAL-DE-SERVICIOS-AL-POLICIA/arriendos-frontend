
export const isFile = (accept: string, file: File | null): boolean => {
    if (!file) {
        return false;
    }

    return accept.split(', ').includes(file.type);
}
