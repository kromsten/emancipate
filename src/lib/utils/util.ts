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


export const JSON_POST_PARAMS = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}