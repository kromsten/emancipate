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



export const downloadBlob = (blob : Blob, name = 'file.txt') => {
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    const blobUrl = URL.createObjectURL(blob);
  
    // Create a link element
    const link = document.createElement("a");
  
    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = name;
  
    // Append link to the body
    document.body.appendChild(link);
  
    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent('click', { 
        bubbles: true, 
        cancelable: true, 
        view: window 
      })
    );
  
    // Remove link from body
    document.body.removeChild(link);
  }