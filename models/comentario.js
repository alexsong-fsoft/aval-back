const { v4: uudiv4 } = require('uuid');

class Comentario {
    
    id = '';
    user = '';
    comentario = '';
    estrellas = 0;
    likes = 1;
    dislikes = 1;
    fechaCreacion = null;
    producto = null;
    parentId = null;

    constructor( payload ) {

        this.id = uudiv4();
        this.user = payload.user;
        this.comentario = payload.comentario;
        this.estrellas = parseInt(payload.estrellas);
        this.fechaCreacion = new Date().toISOString();
        this.producto = payload.producto;
        this.parentId = payload.parentId;

    }

}



module.exports = Comentario;
