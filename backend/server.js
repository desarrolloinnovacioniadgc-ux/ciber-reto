const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const preguntasCarrera =
  require("./preguntasCarrera");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const salas = {};

// ====================
// Generar código sala
// ====================

function generarCodigoSala() {

  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let codigo = "";

  for (let i = 0; i < 4; i++) {

    codigo += caracteres.charAt(
      Math.floor(
        Math.random() *
        caracteres.length
      )
    );
  }

  return codigo;
}

// ====================
// Obtener pregunta aleatoria
// ====================

function obtenerPreguntaAleatoria(
  preguntas,
  usadas
) {

  const disponibles =
    preguntas.filter(
      p =>
        !usadas.includes(
          p.id
        )
    );

  if (
    disponibles.length === 0
  ) {
    return null;
  }

  return disponibles[
    Math.floor(
      Math.random() *
      disponibles.length
    )
  ];
}

function enviarPregunta(
  roomCode
) {

  const sala =
    salas[roomCode];

  if (!sala) {
    return;
  }

  if (
    sala.estado ===
    "finalizado"
  ) {
    return;
  }

  const pregunta =
    obtenerPreguntaAleatoria(
      preguntasCarrera,
      sala.preguntasUsadas
    );

  if (!pregunta) {

    io.to(roomCode).emit(
      "noMoreQuestions"
    );

    return;
  }

  sala.preguntaActual =
    pregunta;

  sala.preguntasUsadas.push(
    pregunta.id
  );

  sala.jugadores.forEach(
    jugador => {
      jugador.respondio = false;
    }
  );

  io.to(roomCode).emit(
    "raceUpdate",
    sala.jugadores
  );

  sala.jugadores.forEach(
    jugador => {

      if (
        jugador.inmuneBloqueo &&
        !jugador.bloqueado
      ) {

        jugador.inmuneBloqueo =
          false;

      }

    }
  );

  sala.jugadores.forEach(
    jugador => {

      const socketJugador =
        io.sockets.sockets.get(
          jugador.id
        );

      if (!socketJugador) {
        return;
      }

      // Jugador bloqueado

      if (
        jugador.bloqueado
      ) {

        // Cuenta como si ya hubiera respondido
        jugador.respondio =
          true;

        socketJugador.emit(
          "blockedRound"
        );

        jugador.bloqueado =
          false;

        return;
      }

      const opcionesMezcladas =
        [...pregunta.opciones]
          .sort(
            () =>
              Math.random() - 0.5
          );
      // Enviar pregunta

      socketJugador.emit(
        "newQuestion",
        {
          pregunta:
            pregunta.pregunta,

          opciones:
            opcionesMezcladas,

          tiempo: 15
        }
      );
    }
  );

  io.to(roomCode).emit(
    "questionStarted",
    {
      pregunta: pregunta.pregunta,
      tiempo: 15
    }
  );


  sala.timerPregunta =
    setTimeout(() => {

      io.to(roomCode).emit(
        "showExplanation",
        {
          respuestaCorrecta:
            pregunta.correcta,

          explicacion:
            pregunta.explicacion
        }
      );

      sala.timerExplicacion =
        setTimeout(() => {

          if (
            sala.estado ===
            "finalizado"
          ) {

            io.to(roomCode).emit(
              "raceFinished",
              sala.rankingFinal
            );

            return;
          }

          enviarPregunta(
            roomCode
          );

        }, 6000);  // ← Tiempo que dura la explicación

    }, 15000);  // ← Tiempo para responder la pregunta

}

// ====================
// Socket.IO
// ====================

io.on("connection", (socket) => {

  socket.on(
    "leaveRoom",
    (roomCode) => {

      const sala = salas[roomCode];

      if (!sala) return;

      sala.jugadores =
        sala.jugadores.filter(
          p => p.id !== socket.id
        );

      console.log(
        "Jugadores después:",
        sala.jugadores.length
      );

      socket.leave(roomCode);

      io.to(roomCode).emit(
        "playersUpdated",
        sala.jugadores
      );

      io.to(roomCode).emit(
        "raceUpdate",
        sala.jugadores
      );

    }
  );

  socket.on(
    "resetRace",
    (roomCode) => {

      console.log("RESET RECIBIDO");

      const sala = salas[roomCode];

      if (!sala) return;

      console.log(
        "Jugadores antes:",
        sala.jugadores.length
      );

      clearTimeout(sala.timerPregunta);
      clearTimeout(sala.timerExplicacion);

      sala.estado = "esperando";

      sala.preguntaActual = null;

      sala.preguntasUsadas = [];

      sala.rankingFinal = null;

      // ELIMINAR TODOS LOS JUGADORES
      sala.jugadores = [];

      io.to(roomCode).emit(
        "playersUpdated",
        []
      );

      io.to(roomCode).emit(
        "raceUpdate",
        []
      );

      io.to(roomCode).emit(
        "raceReset"
      );

    }
  );

  socket.on(
    "answerQuestion",
    ({
      roomCode,
      answer
    }) => {

      console.log(
  "ENTRO A ANSWERQUESTION"
);

      const sala =
        salas[roomCode];

      if (!sala) {
        return;
      }

      const pregunta =
        sala.preguntaActual;

      if (!pregunta) {
        return;
      }

      ////////////////////////
      // Buscar jugador
      ////////////////////////

      const jugador =
        sala.jugadores.find(
          p =>
            p.id === socket.id
        );

      if (!jugador) {
        return;
      }

      // Evitar respuestas múltiples

      if (jugador.respondio) {

        console.log(
          jugador.nombre,
          "intentó responder dos veces"
        );

        return;
      }

      jugador.respondio = true;

      // Actualizar quién respondió
      io.to(roomCode).emit(
        "raceUpdate",
        sala.jugadores
      );

      const correcta =
        answer ===
        pregunta.correcta;

      ////////////////////////
      // TURBO
      ////////////////////////

      if (jugador.turboActivo) {

        jugador.turboDisponible =
          false;

        jugador.turboActivo =
          false;

        if (correcta) {

          jugador.posicion += 2;

          console.log(
            jugador.nombre,
            "usó TURBO y avanzó +2"
          );

        } else {

          jugador.posicion =
            Math.max(
              0,
              jugador.posicion - 1
            );

          console.log(
            jugador.nombre,
            "falló TURBO y retrocedió -1"
          );

        }

      } else {

        if (correcta) {

          jugador.posicion++;

        }

      }

      ////////////////////////
      // GANADOR
      ////////////////////////

      if (jugador.posicion >= 8) {

        sala.estado =
          "finalizado";

        sala.rankingFinal =
          [...sala.jugadores]
            .sort(
              (a, b) =>
                b.posicion - a.posicion
            );

      }

      ////////////////////////
      // Resultado privado
      ////////////////////////

      socket.emit(
        "answerResult",
        {
          correcta,

          respuestaCorrecta:
            pregunta.correcta,

          explicacion:
            pregunta.explicacion
        }
      );

      ////////////////////////
      // Todos respondieron
      ////////////////////////
      console.log(
        "RESPONDIERON:",
        sala.jugadores.map(
          p => ({
            nombre: p.nombre,
            respondio: p.respondio
          })
        )
      );

      const todosRespondieron =
        sala.jugadores.every(
          jugador =>
            jugador.respondio
        );

      console.log(
        "TODOS RESPONDIERON?",
        todosRespondieron
      );

      if (todosRespondieron) {

        clearTimeout(
          sala.timerPregunta
        );

        clearTimeout(
          sala.timerExplicacion
        );

        io.to(roomCode).emit(
          "allPlayersAnswered"
        );

        // Mostrar explicación

        io.to(roomCode).emit(
          "showExplanation",
          {
            respuestaCorrecta:
              pregunta.correcta,

            explicacion:
              pregunta.explicacion
          }
        );

        // 5 segundos explicación

        setTimeout(() => {

          // Avanzar autos

          console.log(
            "ENVIANDO ANIMATE RACE"
          );

          io.to(roomCode).emit(
            "animateRace",
            sala.jugadores
          );

          // 3 segundos animación

          setTimeout(() => {

            if (
              sala.estado ===
              "finalizado"
            ) {

              io.to(roomCode).emit(
                "raceFinished",
                sala.rankingFinal
              );

              return;
            }

            enviarPregunta(
              roomCode
            );

          }, 3000);

        }, 5000);

      }

    }
  );


  ////

  socket.on(
    "startRace",
    (roomCode) => {

      if (!salas[roomCode]) {
        return;
      }

      salas[roomCode].estado =
        "carrera";

      const sala = salas[roomCode];

      clearTimeout(sala.timerPregunta);
      clearTimeout(sala.timerExplicacion);

      sala.estado = "carrera";

      sala.preguntasUsadas = [];
      sala.preguntaActual = null;

      sala.jugadores.forEach(jugador => {

        jugador.posicion = 0;
        jugador.respondio = false;

        jugador.bloqueado = false;
        jugador.inmuneBloqueo = false;

        jugador.turboDisponible = true;
        jugador.turboActivo = false;

        jugador.bloqueoDisponible = true;

      });

      io.to(roomCode).emit(
        "raceUpdate",
        sala.jugadores
      );

      io.to(roomCode).emit(
        "animateRace",
        sala.jugadores
      );

      enviarPregunta(roomCode);

    }
  );

  console.log(
    "Nuevo socket:",
    socket.id
  );

  // ====================
  // Crear sala - CreateRoom
  // ====================

  socket.on(
    "createRoom",
    () => {

      const roomCode =
        "LOCAL";

      if (
        !salas[roomCode]
      ) {

        salas[roomCode] = {

          jugadores: [],
          estado:
            "esperando",

          preguntasUsadas: [],
          preguntaActual:
            null,

          timerPregunta:
            null,

          timerExplicacion:
            null

        };

      }

      socket.join(
        roomCode
      );

      socket.emit(
        "roomCreated",
        roomCode
      );

    }
  );

  // ====================
  // Obtener iconos usados
  // ====================

  socket.on(
    "getUsedIcons",
    (roomCode) => {

      const players =
        salas[roomCode]?.jugadores || [];

      const usedIcons =
        players.map(
          p => p.icono
        );

      socket.emit(
        "usedIcons",
        usedIcons
      );
    }
  );

  // ====================
  // Unirse a sala
  // ====================

  socket.on(
    "joinRoom",
    ({
      roomCode,
      playerName,
      icon
    }) => {

      if (!salas[roomCode]) {

        console.log(
          "Sala no encontrada:",
          roomCode
        );

        return;
      }

      // Evitar más de 6 jugadores

      if (
        salas[roomCode]
          .jugadores.length >= 6
      ) {

        return;
      }

      salas[roomCode]
        .jugadores.push({
          id: socket.id,
          nombre: playerName,
          icono: icon,
          posicion: 0,
          respondio: false,

          bloqueado: false,
          inmuneBloqueo: false,
          bloqueosConsecutivos: 0,

          turboDisponible: true,
          turboActivo: false,

          bloqueoDisponible: true
        });

      socket.join(roomCode);

      console.log(
        "Enviando jugadores:",
        salas[roomCode].jugadores
      );

      io.to(roomCode).emit(
        "playersUpdated",
        salas[roomCode].jugadores
      );

      console.log(
        `${playerName} se unió a ${roomCode}`
      );
    }
  );

  // ====================
  // Desconexión
  // ====================

  socket.on(
    "disconnect",
    () => {

      for (
        const room in salas
      ) {

        salas[room]
          .jugadores =
          salas[room]
            .jugadores
            .filter(
              p =>
                p.id !==
                socket.id
            );

        io.to(room).emit(
          "playersUpdated",
          salas[room].jugadores
        );
      }

      console.log(
        "Usuario desconectado"
      );
    }
  );

  /////////////////////
  //Activar turbo 
  ////////////////////
  socket.on(
    "activateTurbo",
    (roomCode) => {

      const sala =
        salas[roomCode];

      if (!sala) {
        return;
      }

      const jugador =
        sala.jugadores.find(
          p =>
            p.id === socket.id
        );

      if (!jugador) {
        return;
      }

      if (
        !jugador.turboDisponible
      ) {
        return;
      }

      jugador.turboActivo =
        true;

      io.to(roomCode).emit(
        "raceUpdate",
        sala.jugadores
      );

      console.log(
        jugador.nombre,
        "activó TURBO"
      );

    }
  );

  socket.on(
    "useBlock",
    ({
      roomCode,
      targetId
    }) => {

      const sala =
        salas[roomCode];

      if (!sala) {
        return;
      }

      const atacante =
        sala.jugadores.find(
          p =>
            p.id === socket.id
        );

      if (
        !atacante ||
        !atacante.bloqueoDisponible
      ) {
        return;
      }

      const objetivo =
        sala.jugadores.find(
          p =>
            p.id === targetId
        );

      if (!objetivo) {
        return;
      }

      if (
        objetivo.inmuneBloqueo
      ) {

        console.log(
          objetivo.nombre,
          "es inmune al bloqueo"
        );

        return;

      }

      atacante.bloqueoDisponible =
        false;

      objetivo.bloqueado =
        true;

      objetivo.inmuneBloqueo =
        true;

      console.log(
        atacante.nombre,
        "bloqueó a",
        objetivo.nombre
      );

      io.to(roomCode).emit(
        "raceUpdate",
        sala.jugadores
      );

    }
  );
});

// ====================
// Iniciar servidor
// ====================

server.listen(
  3000,
  () => {

    console.log("=== VERSION FRANCO TEST ===");

    console.log(
      "Servidor iniciado en puerto 3000"
    );
  }
);