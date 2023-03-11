export const readFileAsync = async (file: File) => {
    return await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = async (e) => {
            resolve(e.target!.result);
        }
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}