import { useState, useEffect } from "react";
import { socket } from "../services/socket";

export default function Player() {

  const ROOM_CODE = "LOCAL";

  // ====================
  // ESTADOS
  // ====================

  const [turboDisponible, setTurboDisponible] =
    useState(true);

  const [bloqueoDisponible, setBloqueoDisponible] =
    useState(true);

  const [question, setQuestion] =
    useState(null);

  const [result, setResult] =
    useState(null);

  const [gameStarted, setGameStarted] =
    useState(false);

  const [answered, setAnswered] =
    useState(false);

  const [timeLeft, setTimeLeft] =
    useState(15);

  const [name, setName] =
    useState("");

  const [selectedIcon, setSelectedIcon] =
    useState("🐱");

  const [joined, setJoined] =
    useState(false);

  const [finalRanking, setFinalRanking] =
    useState(null);

  const [players, setPlayers] =
    useState([]);

  const [showBlockMenu, setShowBlockMenu] =
    useState(false);

  const [blocked, setBlocked] =
    useState(false);

  const volverInicio = () => {

  socket.emit(
    "leaveRoom",
    ROOM_CODE
  );

  setJoined(false);

  setFinalRanking(null);

  setGameStarted(false);

  setQuestion(null);

  setResult(null);

  setAnswered(false);

  setBlocked(false);

  setShowBlockMenu(false);

  setTurboDisponible(true);

  setBloqueoDisponible(true);

};  

  // ====================
  // ESTILOS
  // ====================

  const screenStyle = {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg,#020617,#0f172a)",
    color: "white",

    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "center",

    textAlign: "center",

    padding: "20px",
    boxSizing: "border-box"
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "500px",

    background:
      "rgba(255,255,255,0.05)",

    border:
      "1px solid rgba(56,189,248,0.3)",

    borderRadius: "25px",

    padding: "25px",

    boxShadow:
      "0 0 25px rgba(56,189,248,0.25)"
  };

  const answerButtonStyle = {
    width: "100%",
    maxWidth: "700px",

    minHeight: "75px",

    padding: "20px",

    border: "none",

    borderRadius: "20px",

    background:
      "linear-gradient(90deg,#1d4ed8,#38bdf8)",

    color: "white",

    fontSize: "22px",

    fontWeight: "bold",

    cursor: "pointer",

    boxShadow:
      "0 0 20px rgba(56,189,248,0.4)"
  };

  

  // ====================
  // SOCKETS
  // ====================

  useEffect(() => {

    socket.on(
  "raceReset",
  () => {

    setFinalRanking(null);

    setJoined(false);

    setGameStarted(false);

    setQuestion(null);

    setResult(null);

    setAnswered(false);

    setBlocked(false);

    setShowBlockMenu(false);

    setTurboDisponible(true);

    setBloqueoDisponible(true);

  }
);

    socket.on(
      "newQuestion",
      (data) => {

        setBlocked(false);

        setResult(null);

        setAnswered(false);

        setTimeLeft(15);

        setQuestion(null);

        setTimeout(() => {

          setQuestion(data);

          setGameStarted(true);

        }, 100);

      }
    );

    socket.on(
      "answerResult",
      (data) => {

        setResult(data);

      }
    );

    socket.on(
      "showExplanation",
      (data) => {

        setResult(prev => {

          if (prev) {
            return prev;
          }

          return {

            correcta: false,

            respuestaCorrecta:
              data.respuestaCorrecta,

            explicacion:
              data.explicacion

          };

        });

        setQuestion(null);

        setGameStarted(false);

      }
    );

    socket.on(
      "raceFinished",
      (rankingData) => {

        setTurboDisponible(true);

        setBloqueoDisponible(true);

        setFinalRanking(
          rankingData
        );

      }
    );

    socket.on(
      "raceUpdate",
      (playersList) => {

        setPlayers(
          playersList
        );

      }
    );

    socket.on(
      "blockedRound",
      () => {

        setBlocked(true);

        setQuestion(null);

        setGameStarted(false);

        setResult(null);

      }
    );

    return () => {

      socket.off("raceReset");

      socket.off("newQuestion");

      socket.off("answerResult");

      socket.off("showExplanation");

      socket.off("raceFinished");

      socket.off("raceUpdate");

      socket.off("blockedRound");

    };

  }, []);

  // ====================
  // TEMPORIZADOR
  // ====================

  useEffect(() => {

    if (
      !gameStarted ||
      result
    ) {
      return;
    }

    const timer =
      setInterval(() => {

        setTimeLeft(prev => {

          if (prev <= 1) {

            clearInterval(timer);

            return 0;

          }

          return prev - 1;

        });

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [
    gameStarted,
    result
  ]);


  // ====================
  // TIEMPO AGOTADO
  // ====================

  useEffect(() => {

    socket.on(
      "questionTimeUp",
      (data) => {

        setGameStarted(false);

        setResult({

          correcta: false,

          respuestaCorrecta:
            data.respuestaCorrecta,

          explicacion:
            data.explicacion

        });

      }
    );

    return () => {

      socket.off(
        "questionTimeUp"
      );

    };

  }, []);


  // ====================
  // AVATARES
  // ====================

  const icons = [
    "🐱",
    "👿",
    "🤖",
    "🦊",
    "🐸",
    "🦄"
  ];


  // ====================
  // UNIRSE A SALA
  // ====================

  const joinRoom = () => {

    if (!name.trim()) {

      return;

    }

    socket.emit(
      "joinRoom",
      {

        roomCode:
          ROOM_CODE,

        playerName:
          name,

        icon:
          selectedIcon

      }
    );

    setJoined(true);

  };


  // ====================
  // RESPONDER
  // ====================

  const answerQuestion = (
    answer
  ) => {

    if (answered) {

      return;

    }

    setAnswered(true);

    socket.emit(
      "answerQuestion",
      {

        roomCode:
          ROOM_CODE,

        answer

      }
    );

  };


  // ====================
  // BLOQUEAR JUGADOR
  // ====================

  const blockPlayer = (
    targetId
  ) => {

    socket.emit(
      "useBlock",
      {

        roomCode:
          ROOM_CODE,

        targetId

      }
    );

    setBloqueoDisponible(
      false
    );

    setShowBlockMenu(
      false
    );

  };


  // ====================
  // DEBUG
  // ====================

  console.log(
    "Render =>",
    {

      result,

      gameStarted,

      question

    }
  );

  // ====================
  // PANTALLA FINAL
  // ====================

  if (finalRanking) {

    return (

  <div style={screenStyle}>

    <button
      onClick={volverInicio}
      style={{
        position: "fixed",
        top: "15px",
        left: "15px",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        border: "none",
        background: "rgba(255,255,255,0.08)",
        color: "white",
        fontSize: "22px",
        cursor: "pointer",
        zIndex: 9999
      }}
    >
      ←
    </button>

    <div style={cardStyle}>

          <h1>
            🏆 Carrera Finalizada
          </h1>

          <br />

          {finalRanking.map(
            (
              player,
              index
            ) => (

              <div
                key={player.id}
                style={{
                  fontSize: "28px",
                  marginBottom: "20px"
                }}
              >

                {index === 0 && "🥇 "}
                {index === 1 && "🥈 "}
                {index === 2 && "🥉 "}

                {player.icono}

                {" "}

                {player.nombre}

              </div>

            )
          )}

        </div>

      </div>

    );

  }


  // ====================
  // HACKEADO
  // ====================

  if (blocked) {

    return (

      <div style={screenStyle}>

        <div style={cardStyle}>

          <h1
            style={{
              fontSize: "60px"
            }}
          >
            🚫
          </h1>

<br />

          <h1>

            Hackeado

          </h1>

          <p
            style={{
              fontSize: "22px"
            }}
          >
            No puedes responder
            esta ronda.
          </p>

          <br />

          <h3>

            Esperando siguiente
            pregunta...

          </h3>

        </div>

      </div>

    );

  }


  // ====================
  // RESULTADO
  // ====================

  if (result) {

    return (

      <div style={screenStyle}>

        <div style={cardStyle}>

          <h1
  style={{
    fontSize: "60px"
  }}
>
  🎯
</h1>

<br />

<h1>
  RESPUESTA ENVIADA
</h1>

<p
  style={{
    fontSize: "22px"
  }}
>
  Observa la pantalla principal
  para descubrir el resultado.
</p>

<br />

<h3>
  Esperando siguiente pregunta...
</h3>

          <hr />

          <h2>

            Habilidades

          </h2>

          <br />

          {turboDisponible && (

            <button

              style={{
                ...answerButtonStyle,
                background:
                  "linear-gradient(90deg,#ff6b00,#ffb347)"
              }}

              onClick={() => {

                socket.emit(
                  "activateTurbo",
                  "LOCAL"
                );

                setTurboDisponible(
                  false
                );

              }}

            >

              🚀 TURBO

            </button>

          )}

          <br />
          <br />

          {bloqueoDisponible && (

            <button

              style={{
                ...answerButtonStyle,
                background:
                  "linear-gradient(90deg,#991b1b,#ef4444)"
              }}

              onClick={() =>
                setShowBlockMenu(
                  !showBlockMenu
                )
              }

            >

              🚫 BLOQUEAR

            </button>

          )}

          <br />

          {showBlockMenu && (

<div
  style={{
    position: "fixed",

    top: 0,
    left: 0,

    width: "100%",
    height: "100%",

    background:
      "rgba(0,0,0,0.8)",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    zIndex: 9999
  }}
>

<div
  style={{
    width: "90%",
    maxWidth: "420px",

    background:
      "#0f172a",

    border:
      "2px solid rgba(56,189,248,.4)",

    borderRadius: "25px",

    padding: "25px",

    boxShadow:
      "0 0 30px rgba(56,189,248,.3)"
  }}
>

<h2
  style={{
    marginBottom: "20px"
  }}
>
  🎯 Selecciona un rival
</h2>

{
  players

    .filter(
      p =>
        p.id !==
        socket.id
    )

    .map(
      player => (

        <button

          key={player.id}

          style={{
            ...answerButtonStyle,

            minHeight: "60px",

            marginBottom: "12px"
          }}

          onClick={() =>
            blockPlayer(
              player.id
            )
          }

        >

          {player.icono}

          {" "}

          {player.nombre}

        </button>

      )
    )
}

<button

  onClick={() =>
    setShowBlockMenu(
      false
    )
  }

  style={{
    width: "100%",

    height: "60px",

    borderRadius: "15px",

    border: "none",

    background:
      "#334155",

    color: "white",

    fontWeight: "bold",

    marginTop: "10px",

    cursor: "pointer"
  }}
>

  Cancelar

</button>

</div>

</div>

)}

        </div>

      </div>

    );

  }

// ====================
// Pantalla pregunta
// ====================

if (
  gameStarted &&
  question
) {

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#020617,#0f172a)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px"
      }}
    >

      <h2
        style={{
          fontSize: "22px",
          marginBottom: "10px"
        }}
      >
        Pregunta
      </h2>
<br /><br />
      <div
        style={{
          fontSize: "50px",
          fontWeight: "bold",
          color:
            timeLeft <= 5
              ? "#ff5555"
              : "#38bdf8"
        }}
      >
        ⏳ {timeLeft}
      </div>
<br /><br />
      <h1
        style={{
          maxWidth: "800px",
          width: "100%",
          fontSize: "clamp(24px,5vw,42px)",
          lineHeight: "1.3",
          marginTop: "30px",
          marginBottom: "40px"
        }}
      >
        {question.pregunta}
      </h1>

      <div
        style={{
          width: "100%",
          maxWidth: "700px"
        }}
      >

        {question.opciones.map(
          (opcion) => (

            <button
              key={opcion}

              disabled={answered}

              onClick={() =>
                answerQuestion(
                  opcion
                )
              }

              style={{
                width: "100%",
                padding: "18px",
                marginBottom: "18px",
                fontSize: "clamp(18px,4vw,28px)",
                borderRadius: "20px",
                border: "none",
                background: answered
                  ? "#475569"
                  : "#2563eb",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >

              {opcion}

            </button>

          )
        )}

      </div>

    </div>

  );

}

// ====================
// Esperando inicio
// ====================

if (joined) {

  return (

    <div style={screenStyle}>

      <div style={cardStyle}>

        <h1
          style={{
            fontSize: "40px"
          }}
        >
          ⏳
        </h1>
<br />
        <h1>

          Esperando inicio...

        </h1>

        <br />

        <h2>

          Sala Local

        </h2>

      </div>

    </div>

  );

}

// ====================
// Pantalla principal
// ====================

return (

  <div style={screenStyle}>

    <div style={cardStyle}>

      <h1
        style={{
          fontSize: "55px",
          marginBottom: "10px"
        }}
      >
        CiberSeguro
      </h1>

      <br />

      <input

        placeholder="Nombre"

        value={name}

        onChange={(e) =>
          setName(
            e.target.value
          )
        }

        style={{
          width: "100%",
          padding: "15px",
          fontSize: "20px",
          borderRadius: "15px",
          border: "none",
          outline: "none",
          boxSizing: "border-box"
        }}

      />

      <br />
      <br />

      <h3>

        Elegí tu avatar

      </h3>

      <div>

        {icons.map(
          (icon) => (

            <button

              key={icon}

              onClick={() =>
                setSelectedIcon(
                  icon
                )
              }

              style={{

                fontSize: "35px",

                padding: "10px",

                margin: "5px",

                borderRadius: "15px",

                background:
                  "transparent",

                color: "white",

                border:
                  selectedIcon === icon
                    ? "3px solid #22c55e"
                    : "1px solid gray"

              }}

            >

              {icon}

            </button>

          )
        )}

      </div>

      <br />

      <button

        style={answerButtonStyle}

        onClick={joinRoom}

      >

        UNIRSE

      </button>

    </div>

  </div>

);
}
