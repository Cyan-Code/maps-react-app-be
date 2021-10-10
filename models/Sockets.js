const Marcadores = require('./macadores');

class Sockets {

  constructor( io ) {
    this.io = io;
    this.marcadores = new Marcadores();
    this.socketEvents();
  }

  socketEvents () {
    // On Connection
    this.io.on('connection', (socket) => {
      socket.emit('marcadores-activos', this.marcadores.activos );
      socket.on('marcador-nuevo', (marcador) => {
        this.marcadores.agregarMarcador(marcador);
        socket.broadcast.emit('marcador-nuevo', marcador);      
      });      
      //TODO: marcador-actualizado
      socket.on('marcador-actualizado', (marcador) => {      
        this.marcadores.actualizarMarcador(marcador)
        socket.broadcast.emit('marcador-actualizado', marcador)
      })
      
    })
  }

}


module.exports = Sockets