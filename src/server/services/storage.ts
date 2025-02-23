// ** Third-Party Imports
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// ** Custom Components, Hooks, Utils, etc.
import { storage } from "@lib/firebase";

class _StorageService {
  async uploadFile(file: Buffer, filename: string) {
    if (file.length > 5 * 1024 * 1024) {
      throw new Error("File size exceeds the limit of 5 MB.");
    }

    const storageRef = ref(storage, `avatars/${filename}`);
    const { metadata } = await uploadBytes(storageRef, file);

    if (!metadata.fullPath) {
      throw new Error("There was some error while uploading the file.");
    }

    const fileURL = await getDownloadURL(storageRef);
    return { fileURL };
  }
}

export const StorageService = new _StorageService();
