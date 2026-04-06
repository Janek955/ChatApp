


export function processUploadedFile(file) {
    if (!file) {
        throw new Error("No file uploaded");
    }

    const fileUrl = "/files/" + file.filename;

    let fileType = "other";

    if (file.mimetype.startsWith("image")) {
        fileType = "image";
    } else if (file.mimetype.startsWith("audio")) {
        fileType = "audio";
    }
    return {
        success: true,
        fileUrl,
        fileType
    };
}






