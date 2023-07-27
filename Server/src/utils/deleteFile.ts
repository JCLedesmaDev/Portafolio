import path from 'path';
import fs from 'fs';

export const deleteFile = (pathFile: string) => {
    try {        
        const imagePath = path.join(__dirname, '../../public/', pathFile);
        fs.unlinkSync(imagePath); // Eliminar la imagen del archivo
    } catch (error) {
        console.log("🚀 ~ file: deleteFile.ts:8 ~ deleteFile ~ error:", error)
    }
}