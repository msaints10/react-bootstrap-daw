import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generarSecretKey(length = 32) {
    let clave_secreta = crypto.randomBytes(length).toString('hex');

    // Verificar si el archivo .env existe
    const envPath = path.join(__dirname, '..', '.env');
    if (!fs.existsSync(envPath)) {
        // Crear el archivo .env si no existe
        fs.writeFileSync(envPath, '');
    }
    // Leer el contenido del archivo .env
    let envContent = fs.readFileSync(envPath, 'utf8');
    // Verificar si la clave secreta ya está en el archivo .env
    if (!envContent.includes('SECRET_KEY=')) {
        // Agregar la clave secreta al archivo .env
        envContent += `SECRET_KEY=${clave_secreta}\n`;
    } else {
        // Si ya existe, reemplazarla
        envContent = envContent.replace(/SECRET_KEY=.*/g, `SECRET_KEY=${clave_secreta}`);
    }
    fs.writeFileSync(envPath, envContent);

    return clave_secreta;
}

// Solo ejecutar si es el módulo principal
if (import.meta.url === `file://${process.argv[1]}`) {
    const secretKey = generarSecretKey();
    console.log('🔒 Clave secreta generada y agregada automáticamente al archivo .env');
    console.log(secretKey);
}
