export default function  dataURItoBlob(dataURI){
    var byteString;
    if(dataURI.split(",")[0].indexOf("base64")>=0){
        byteString = atob(dataURI.split(",")[1]);
    }else{
        byteString = decodeURI(dataURI.split(",")[1]);
    }
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var ia = new Uint8Array(byteString.length);
    for(var i = 0;i<byteString.length;i++){
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia],{type:mimeString})
}

// blob not only returns the size of the file but also 
// contain the data in the binary form


/*
    the best way to upload the file in server we have to 
    use blob along with formdata
    base64 -> blob -> formdata
    in server size we need to install 
    express-fileupload
    this is the best way

    Converting base64-encoded images to Blob objects before appending them to FormData ensures compatibility, efficiency, and adherence to server-side expectations for file uploads. This process allows the images to be uploaded in a binary format, which is more efficient and suitable for file transfer.
*/