import path from 'path';
import fs from 'fs';
import config from 'config'


export const deleteFile = (pathFile: string) => {
    try {     
        pathFile = pathFile.split(`${config.get('server.public_url')}/`)[1]
        
        const imagePath = path.join(__dirname, '../../public/', pathFile);
        fs.unlinkSync(imagePath); // Eliminar la imagen del archivo
    } catch (error) {
        console.log("🚀 ~ file: deleteFile.ts:8 ~ deleteFile ~ error:", error)
    }
}