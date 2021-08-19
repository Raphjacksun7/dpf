const dataURItoBlob = (dataurl) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  let arr = dataurl.split(","),
    bstr = atob(arr[1]),
    // separate out the mime component
    mime = arr[0].match(/:(.*?);/)[1],
    // write the bytes of the string to an ArrayBuffer
    n = bstr.length,
    // create a view into the buffer
    u8arr = new Uint8Array(n);
  // set the bytes of the buffer to the correct values
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  // write the ArrayBuffer to a blob
  return new Blob([u8arr], { type: mime });
};

export default dataURItoBlob;
