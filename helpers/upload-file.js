const path = require('path');
const { v4: uuidv4 } = require('uuid');
const archivo = './db/data.json';
const fs = require('fs');

const subirArchivo = ( archivo, carpeta = '', extensionesValidas = ['png','jpg','jpeg','gif'] ) => {

    return new Promise( (resolve, reject) => {

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        // Validar la extension
        if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida - ${ extensionesValidas }`);
        }
        
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( nombreTemp );
        });

    });

}


const guardarDB = ( data ) => {
    fs.writeFileSync( archivo, JSON.stringify(data) );
}

const leerDB = () => {
    
    if( !fs.existsSync(archivo) ){
        return null;
    }
    
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse( info );

    // console.log(data);

    return data;
}




module.exports = {
    subirArchivo,
    guardarDB,
    leerDB,
}