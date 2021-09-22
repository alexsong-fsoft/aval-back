const Comentario = require('./comentario');

/**
 *  _listado:
 *      {  'uuid-123712-123123-2: { id:12, desc:asd,completadoeEN:92231 }  },
 */

class Comentarios {

    _listado = {};


    constructor() {
        this._listado = {};
    }


    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const comentario = this._listado[key];
            listado.push( comentario );
        });

        return listado;
    }


    borrarComentario( id = '' ) {

        if ( this._listado[id] ) {
            delete this._listado[id];
        }

    }

    cargarComentariosFromArray( comentarios = [] ) {
        
        comentarios.forEach( comentario => {
            this._listado[comentario.id] = comentario;
        });
    }


    crearComentario( desc ) {

        const comentario = new Comentario(desc);
        this._listado[comentario.id] = comentario;
    }


    makeTree (nodes, parentId) {
        return nodes
          .filter((node) => node.parentId === parentId)
          .reduce((tree, node) => 
            [
              ...tree,
              {
                ...node,
                children: this.makeTree(nodes, node.id),
              },
            ],
            [],
          )
      }
    

}



module.exports = Comentarios;
