import {
  useState,
  useEffect,
  useRef
} from "react";

import { CARS } from "../utils/cars";

import { CAR_COLORS } from "../utils/colors";

import RaceTrack from "../components/RaceTrack";

import WinnerScreen from "../components/WinnerScreen";

import Confetti from "react-confetti";

import Fireworks from "react-canvas-confetti";

import {
  motion
} from "framer-motion";

import { socket } from "../services/socket";

export default function Admin() {

  // ====================
  // Estados
  // ====================
const lobbyMusicRef = useRef(null);
const raceMusicRef = useRef(null);
const voiceRef = useRef(null);
const numeroPreguntaRef = useRef(0);
const tipsDisponiblesRef = useRef([
  "10_tips_1.mp3",
  "11_tips_2.mp3",
  "12_tips_3.mp3",
  "13_tips_4.mp3",
  "14_tips_5.mp3",
  "15_tips_6.mp3",
  "16_tips_7.mp3",
  "17_tips_8.mp3",
  "18_tips_9.mp3",
  "19_tips_10.mp3",
  "20_tips_11.mp3",
  "21_tips_12.mp3",
  "22_tips_13.mp3",
  "23_tips_14.mp3"
]);
const humorTimeoutRef = useRef(null);

const humoresDisponiblesRef = useRef([
  "04_humor_1.mp3",
  "05_humor_2.mp3",
  "06_humor_3.mp3",
  "07_humor_4.mp3",
  "08_humor_5.mp3",
  "09_humor_6.mp3"
]);
const tipTimeoutRef = useRef(null);

const lobbyVoiceActiveRef = useRef(true);



const [musicStarted,
setMusicStarted] =
useState(false);

const volverInicio = () => {

  // Detener cualquier voz que esté reproduciéndose
  if (voiceRef.current) {
    voiceRef.current.pause();
    voiceRef.current.currentTime = 0;
  }
  
  // Cancelar tip pendiente
  if (tipTimeoutRef.current) {
    clearTimeout(tipTimeoutRef.current);
    tipTimeoutRef.current = null;
  }

  lobbyVoiceActiveRef.current = true;

  // Cancelar cualquier humor que haya quedado programado
  if (humorTimeoutRef.current) {
    clearTimeout(humorTimeoutRef.current);
    humorTimeoutRef.current = null;
  }


  tipsDisponiblesRef.current = [
  "10_tips_1.mp3",
  "11_tips_2.mp3",
  "12_tips_3.mp3",
  "13_tips_4.mp3",
  "14_tips_5.mp3",
  "15_tips_6.mp3",
  "16_tips_7.mp3",
  "17_tips_8.mp3",
  "18_tips_9.mp3",
  "19_tips_10.mp3",
  "20_tips_11.mp3",
  "21_tips_12.mp3",
  "22_tips_13.mp3",
  "23_tips_14.mp3"
];

  socket.emit(
    "resetRace",
    "LOCAL"
  );

  // Reiniciar contador de preguntas
  numeroPreguntaRef.current = 0;

  // Reiniciar pool de humores
  humoresDisponiblesRef.current = [
    "04_humor_1.mp3",
    "05_humor_2.mp3",
    "06_humor_3.mp3",
    "07_humor_4.mp3",
    "08_humor_5.mp3",
    "09_humor_6.mp3"
  ];

  setRaceStarted(false);
  setFinalRanking(null);
  setWinner(null);
  setShowWinner(false);
  setShowExplanation(false);
  setExplanationData(null);
  setCurrentQuestion("");
  setTimeLeft(0);

  setRacePlayers([]);
  setAllAnswered(false);

  if (musicStarted) {

    raceMusicRef.current.pause();

    raceMusicRef.current.currentTime = 0;

    lobbyMusicRef.current.currentTime = 0;

    lobbyMusicRef.current.play();

  }

  iniciarLobbyVoz();
};

const reproducirVoz = (archivo, alTerminar = null) => {
  if (voiceRef.current) {
    voiceRef.current.pause();
    voiceRef.current.currentTime = 0;
  }

  voiceRef.current = new Audio(`/audio/${archivo}`);
  voiceRef.current.volume = 1;

  if (alTerminar) {
    voiceRef.current.onended = alTerminar;
  }

  voiceRef.current.play().catch(err => {
    console.log("No se pudo reproducir el audio:", err);
  });
};

const reproducirHumor = () => {
  if (humoresDisponiblesRef.current.length === 0) {
    humoresDisponiblesRef.current = [
      "04_humor_1.mp3",
      "05_humor_2.mp3",
      "06_humor_3.mp3",
      "07_humor_4.mp3",
      "08_humor_5.mp3",
      "09_humor_6.mp3"
    ];
  }

  const indice = Math.floor(
    Math.random() * humoresDisponiblesRef.current.length
  );

  const audio =
    humoresDisponiblesRef.current.splice(indice, 1)[0];

  reproducirVoz(audio);
};

const reproducirTip = () => {

  if (tipsDisponiblesRef.current.length === 0) {
    tipsDisponiblesRef.current = [
      "10_tips_1.mp3",
      "11_tips_2.mp3",
      "12_tips_3.mp3",
      "13_tips_4.mp3",
      "14_tips_5.mp3",
      "15_tips_6.mp3",
      "16_tips_7.mp3",
      "17_tips_8.mp3",
      "18_tips_9.mp3",
      "19_tips_10.mp3",
      "20_tips_11.mp3",
      "21_tips_12.mp3",
      "22_tips_13.mp3",
      "23_tips_14.mp3"
    ];
  }

  const indice = Math.floor(
    Math.random() * tipsDisponiblesRef.current.length
  );

  const tip =
    tipsDisponiblesRef.current.splice(indice, 1)[0];

  reproducirVoz(tip, () => {

    tipTimeoutRef.current = setTimeout(() => {
      reproducirTip();
    }, 12000);

  });
};

const iniciarLobbyVoz = () => {

  tipTimeoutRef.current = setTimeout(() => {

    if (!lobbyVoiceActiveRef.current) return;

    reproducirVoz("00_intro.mp3", () => {

      if (!lobbyVoiceActiveRef.current) return;

      tipTimeoutRef.current = setTimeout(() => {

        if (!lobbyVoiceActiveRef.current) return;

        reproducirTip();

      }, 5000);

    });

  }, 5000);
};

  const [roomCode, setRoomCode] =
    useState("");

  const [players, setPlayers] =
    useState([]);

  const [racePlayers, setRacePlayers] =
    useState([]);

  const [allAnswered, setAllAnswered] =
    useState(false);

  const [finalRanking, setFinalRanking] =
  useState(null);

  const [currentQuestion, setCurrentQuestion] =
  useState("");

  const [timeLeft, setTimeLeft] =
  useState(0); 

  const [showExplanation, setShowExplanation] =
  useState(false);

  const [explanationData, setExplanationData] =
  useState(null);

  const [winner, setWinner] =
  useState(null);

  const [showWinner, setShowWinner] =
  useState(false);

  const TRACK_WIDTH = "100%";

  const [raceStarted, setRaceStarted] =
  useState(false);

  // ====================
  // Eventos Socket
  // ====================

  useEffect(() => {

    console.log(
      "Socket Admin:",
      socket.id
    );

    // Crear sala

    socket.emit(
      "createRoom"
    );

    socket.on(
      "roomCreated",
      (code) => {

        setRoomCode(code);

      }
    );

    // Lista jugadores

    socket.on(
  "playersUpdated",
  (playersList) => {

    console.log(
      "Jugadores:",
      playersList
    );

    setPlayers(
      playersList
    );

  }
);

    // Actualización carrera

    socket.on(
  "raceUpdate",
  (playersList) => {

    setRacePlayers(playersList);

  }
);


    // Todos respondieron

    socket.on(
      "allPlayersAnswered",
      () => {

        console.log(
          "Todos respondieron"
        );

        setAllAnswered(
          true
        );

      }
    );

socket.on(
  "raceFinished",
  (ranking) => {

    if (musicStarted) {

  raceMusicRef.current.pause();

  raceMusicRef.current.currentTime = 0;

  lobbyMusicRef.current.currentTime = 0;

  lobbyMusicRef.current.play();

}

    setRaceStarted(false);

    setShowExplanation(
      false
    );

    setExplanationData(
      null
    );

    setWinner(
  ranking[0]
);

setShowWinner(
  true
);

// Audio de victoria
reproducirVoz("30_victoria.mp3");

setTimeout(() => {

  setShowWinner(
    false
  );

  setFinalRanking(
    ranking
  );

}, 5000);

  }
);

socket.on("questionStarted", (data) => {

  // Detener definitivamente el sistema de tips del lobby
  lobbyVoiceActiveRef.current = false;

  if (tipTimeoutRef.current) {
    clearTimeout(tipTimeoutRef.current);
    tipTimeoutRef.current = null;
  }

  // Cancelar humor anterior si hubiera quedado programado
  if (humorTimeoutRef.current) {
    clearTimeout(humorTimeoutRef.current);
    humorTimeoutRef.current = null;
  }

  setRaceStarted(true);
  setCurrentQuestion(data.pregunta);
  setTimeLeft(data.tiempo);
  setAllAnswered(false);
  setShowExplanation(false);
  setExplanationData(null);

  // Contamos la pregunta actual
  numeroPreguntaRef.current += 1;

  // Primera pregunta
  if (numeroPreguntaRef.current === 1) {
    reproducirVoz("01_primera_pregunta.mp3");
  }

  // Preguntas siguientes: alternamos
  else if (numeroPreguntaRef.current % 2 === 0) {
    reproducirVoz("03_nueva_pregunta_2.mp3");
  }

  else {
    reproducirVoz("02_nueva_pregunta_1.mp3");
  }

  // Humor a los 9 segundos
  humorTimeoutRef.current = setTimeout(() => {
    reproducirHumor();
    humorTimeoutRef.current = null;
  }, 9000);

});

socket.on(
  "showExplanation",
  (data) => {

    setShowExplanation(
      true
    );

    setExplanationData(
      data
    );

  }
);

////////////////////////
    // Cleanup
    return () => {

      socket.off(
        "roomCreated"
      );

      socket.off(
        "playersUpdated"
      );

      socket.off(
        "raceUpdate"
      );

      socket.off(
        "allPlayersAnswered"
      );

      socket.off(
  "questionStarted"
);

      socket.off(
  "raceFinished"
);

      socket.off(
  "showExplanation"
);
    };

  }, []);


//////////////////////////////
// SEGUNDO UseEffect agregado
//////////////////////////////
useEffect(() => {

  if (
    !raceStarted ||
    showExplanation ||
    showWinner ||
    finalRanking ||
    timeLeft <= 0
  ) {
    return;
  }

  const timer =
    setTimeout(() => {

      setTimeLeft(
        prev => prev - 1
      );

    }, 1000);

  return () =>
    clearTimeout(timer);

}, [
  timeLeft,
  raceStarted,
  showExplanation,
  showWinner,
  finalRanking
]);

///TERCER EFECT
useEffect(() => {

  const style =
    document.createElement("style");

  style.innerHTML = `

    @keyframes float {

      0% {
        transform:
          translateY(0px);
        opacity: .2;
      }

      50% {
        opacity: 1;
      }

      100% {
        transform:
          translateY(-120px);
        opacity: .2;
      }

    }

    @keyframes scan {

      0% {
        transform:
          translateY(-100%);
      }

      100% {
        transform:
          translateY(100%);
      }

    }

    @keyframes winnerPulse {

  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.12);
  }

  100% {
    transform: scale(1);
  }

}

@keyframes loadingBar {

  from {
    width: 0%;
  }

  to {
    width: 100%;
  }

}

  `;
  

  document.head.appendChild(style);

  return () =>
    document.head.removeChild(style);

}, []);

useEffect(() => {

  lobbyMusicRef.current =
    new Audio(
      "/audio/Apex_Drift.mp3"
    );

  lobbyMusicRef.current.loop = true;
  lobbyMusicRef.current.volume = 0.48;

  raceMusicRef.current =
    new Audio(
      "/audio/Carrera.mp3"
    );

  raceMusicRef.current.loop = true;
  raceMusicRef.current.volume = 0.40;

}, []);

useEffect(() => {

  iniciarLobbyVoz();

  return () => {

    if (tipTimeoutRef.current) {
      clearTimeout(tipTimeoutRef.current);
      tipTimeoutRef.current = null;
    }

  };

}, []);

useEffect(() => {
  if (finalRanking) {
    reproducirVoz("31_cierre.mp3");
  }
}, [finalRanking]);

  // ====================
  // Render
  // ====================
if (finalRanking) {

  const groupedRanking = {};

  finalRanking.forEach(
    player => {

      const score =
        player.posicion;

      if (
        !groupedRanking[score]
      ) {

        groupedRanking[
          score
        ] = [];

      }

      groupedRanking[
        score
      ].push(player);

    }
  );

  const positions =
    Object.keys(
      groupedRanking
    )
      .map(Number)
      .sort(
        (a, b) => b - a
      );

  return (

  <div
  style={{
    minHeight: "100vh",

    background:
      "radial-gradient(circle,#0f172a,#020617)",

    color: "white",

    textAlign: "center",

    padding: "40px"
  }}
>
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

    <h1
  style={{
    fontSize: "60px",

    color: "#38bdf8",

    textShadow:
      "0 0 15px #38bdf8",

    marginBottom: "50px"
  }}
>
  🏆 RESULTADOS FINALES
</h1>

    {positions
      .slice(0, 3)
      .map(
        (score, index) => {

          const medal =
            index === 0
              ? "🥇"
              : index === 1
              ? "🥈"
              : "🥉";

          return (

            <div
  key={score}
  style={{

    maxWidth: "700px",

    margin:
      "0 auto 30px auto",

    padding: "20px",

    borderRadius: "25px",

    background:
      "rgba(255,255,255,0.05)",

    border:
      index === 0
      ? "2px solid gold"
      : index === 1
      ? "2px solid silver"
      : "1px solid #cd7f32",

    boxShadow:
      index === 0
      ? "0 0 30px rgba(255,215,0,.5)"
      : index === 1
      ? "0 0 25px rgba(200,200,200,.4)"
      : "0 0 20px rgba(205,127,50,.4)"
  }}
>

              <h2
  style={{
    fontSize: "28px",

    letterSpacing: "2px",

    marginBottom: "20px"
  }}
>

                {medal}

                {" "}

                {index + 1}° PUESTO

              </h2>

              {groupedRanking[
                score
              ].map(
                player => (

                  <div
                    key={
                      player.id
                    }
                    style={{
  fontSize: "35px",

  fontWeight: "bold",

  marginBottom: "20px",

}}
                  >


                    {player.icono}

                    {" "}

                    {player.nombre}

                  </div>

                )
              )}

            </div>

          );

        }
      )}

  </div>

);



}

/////////////////////////////7
//PANTALLA GANADOR
//////////////////////////////
if (
  showWinner &&
  winner
) {

  return (

    <WinnerScreen

      winner={winner}

    />

  );

}
///////////////////////////////////////////
//PANTALLA DE EXPLICACION
//////////////////////////
if (
  raceStarted &&
  showExplanation &&
  explanationData
) {

  return (

  <div
    style={{
      minHeight: "100vh",

      background:
        "radial-gradient(circle,#1e3a8a,#020617)",

      display: "flex",

      justifyContent: "center",
      alignItems: "center",

      padding: "30px"
    }}
  >

    <div
      style={{
        maxWidth: "900px",

        background:
          "rgba(255,255,255,0.05)",

        border:
          "2px solid #38bdf8",

        borderRadius: "30px",

        padding: "50px",

        textAlign: "center",

        color: "white",

        boxShadow:
          "0 0 40px rgba(56,189,248,.4)"
      }}
    >

      <div
        style={{
          fontSize: "80px"
        }}
      >
        🎃
      </div>

<br />

      <h1>
        REPUESTA CORRECTA
      </h1>

      <br />



<div
  style={{
    width: "100%",
    maxWidth: "760px",
    margin: "25px auto",
    padding: "22px 30px",

    background:
      "linear-gradient(135deg, rgba(56,189,248,0.12), rgba(37,99,235,0.08))",

    border: "2px solid rgba(56,189,248,0.8)",
    borderRadius: "18px",

    boxShadow:
      "0 0 20px rgba(56,189,248,0.25), inset 0 0 20px rgba(56,189,248,0.05)",

    color: "#ffffff",

    fontSize: "40px",
    fontWeight: "700",
    lineHeight: "1.35",

    textAlign: "center",

    overflowWrap: "break-word"
  }}
>
  {explanationData.respuestaCorrecta}
</div>

<br />

<p
  style={{
    fontSize: "26px",
    lineHeight: "1.6"
  }}
>
  {explanationData.explicacion}
</p>

<br />

<div
  style={{
    width: "100%",
    height: "14px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "20px",
    overflow: "hidden",
    marginTop: "25px"
  }}
>

  <div
    style={{
      width: "100%",
      height: "100%",

      background:
        "linear-gradient(90deg,#2563eb,#38bdf8)",

      animation:
        "loadingBar 6s linear"
    }}
  />

</div>

    </div>

  </div>

);

}

////div principal abajo

return (

  <div
    style={{
  padding: "10px",
  minHeight: "100vh",
  width: "100vw",
  boxSizing: "border-box",
  background:
"radial-gradient(circle at top,rgba(30,64,175,0.35),rgba(2,6,23,0.55) 35%,rgba(1,4,9,0.65) 90%)",
overflow: "hidden",
position: "relative",
isolation: "isolate",
  color: "white",
  display: "flex",
  flexDirection: "column"
}}
  >

    <video
  autoPlay
  loop
  muted
  playsInline
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -2,
    pointerEvents: "none"
  }}
>
  <source
    src="/halloween/halloween-bg.mp4"
    type="video/mp4"
  />
</video>

{raceStarted && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(2, 6, 23, 0.30)",
      backdropFilter: "blur(5px)",
      WebkitBackdropFilter: "blur(5px)",
      zIndex: -1,
      pointerEvents: "none"
    }}
  />
)}

{/* PARTICULAS */}

<div
  style={{
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: 0
  }}
>

  {[...Array(45)].map((_, i) => (

    <div
      key={i}
      style={{
        position: "absolute",

        width: "4px",
        height: "4px",

        borderRadius: "50%",

        background: "#38bdf8",

        boxShadow:
          "0 0 12px #38bdf8",

        left: `${(i * 11) % 100}%`,
        top: `${(i * 17) % 100}%`,

        animation:
          `float ${8 + (i % 5)}s linear infinite`
      }}
    />

  ))}
</div>


<div
  style={{
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg,transparent,rgba(56,189,248,.05),transparent)",
    animation:
      "scan 6s linear infinite",
    pointerEvents: "none",
    zIndex: 0
  }}
/>


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

    {/* resto de tu código */}
  
{!raceStarted && (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80vh",
      textAlign: "center",
      position: "relative",
      zIndex: 2
    }}
  >

    <motion.h1
  style={{
    fontSize: "90px",
    fontWeight: "900",
    letterSpacing: "8px",
    color: "#ff9d2e",
    textShadow: "0 0 15px rgba(198, 118, 28, 0.7)",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "center"
  }}
>
  {"CIBER RETO".split("").map((letra, index) => (
    <motion.span
      key={index}
      animate={{
        y: [0, -5, 0, 4, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.18
      }}
      style={{
        display: "inline-block",
        whiteSpace: "pre"
      }}
    >
      {letra}
    </motion.span>
  ))}
</motion.h1>
<br />
<h2
  style={{
    color: "#94a3b8",
    letterSpacing: "3px",
    marginBottom: "40px"
  }}
>
  DESAFÍO DE CIBERSEGURIDAD
</h2>

    <div
  style={{
    background:
      "rgba(255,255,255,0.05)",

    border:
      "1px solid rgba(56,189,248,0.4)",

    borderRadius: "30px",

    padding: "35px",

    width: "500px",

    backdropFilter: "blur(10px)",

    boxShadow:
      "0 0 40px rgba(56,189,248,0.2)"
  }}
>

  <h2>
    Sala: {roomCode}
  </h2>

  <h3>
    👥 {players.length}/6 jugadores
  </h3>

<div
  style={{
    width: "100%",
    height: "14px",
    background: "#0f172a",
    borderRadius: "20px",
    overflow: "hidden",
    marginTop: "20px"
  }}
>

  <div
    style={{
      width: `${players.length * 16.66}%`,
      height: "100%",

      background:
        "linear-gradient(90deg,#38bdf8,#22c55e)",

      transition:
        "width .5s ease"
    }}
  />

</div>

<div
  style={{
    marginTop: "25px"
  }}
>

  <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "20px"
  }}
>

  {players.map(player => (

    <div
      key={player.id}
      style={{
        background:
          "rgba(255,255,255,0.05)",

        borderRadius: "15px",

        padding: "12px",

        fontSize: "22px",

        textAlign: "center",

        border:
          "1px solid rgba(56,189,248,0.2)"
      }}
    >

      {player.icono}

      <br />

      {player.nombre}

    </div>

  ))}

</div>

</div>

<br />

<button
  onClick={() => {

    if (!musicStarted) {

      lobbyMusicRef.current.play();

      setMusicStarted(true);

    } else {

      lobbyMusicRef.current.pause();
raceMusicRef.current.pause();

      setMusicStarted(false);

    }

  }}

  style={{
    position: "fixed",

    top: "15px",

    right: "15px",

    width: "45px",

    height: "45px",

    borderRadius: "50%",

    border: "none",

    background:
      "rgba(255,255,255,0.08)",

    color: "white",

    fontSize: "22px",

    cursor: "pointer",

    zIndex: 9999
  }}
>
  {musicStarted
    ? "🔊"
    : "🔇"}
</button>

<button
  onClick={() => {

    setFinalRanking(null);
    setWinner(null);
    setShowWinner(false);
    setShowExplanation(false);
    setExplanationData(null);

    if (musicStarted) {

  lobbyMusicRef.current.pause();

  raceMusicRef.current.currentTime = 0;

  raceMusicRef.current.play();

}

numeroPreguntaRef.current = 0;

    socket.emit(
      "startRace",
      "LOCAL"
    );

  }}
  style={{
    width: "100%",
    height: "80px",
    borderRadius: "20px",
    border: "none",
    fontSize: "28px",
    fontWeight: "bold",
    color: "white",
    cursor: "pointer",
    textShadow: "0 0 15px rgba(31, 48, 158, 0.7)",
    background:
      "linear-gradient(90deg,#2563eb,#38bdf8)",
    boxShadow:
      "0 0 25px rgba(56,189,248,.5)"
  }}
>
  👻 INICIAR CARRERA
</button>

</div>


  </div>
)}


<RaceTrack

    raceStarted={raceStarted}

    currentQuestion={currentQuestion}

    timeLeft={timeLeft}

>


      {raceStarted && racePlayers.map((player) => {

  const playerIndex =
  racePlayers.findIndex(
    p => p.id === player.id
  );

const playerCar =
  CARS[playerIndex % CARS.length];

const progressColor =
  CAR_COLORS[playerIndex % CAR_COLORS.length];

  return (

    <div
  key={player.id}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "1px"
  }}
>

  <div
  style={{
    width: "225px",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  }}
>

  <div
  style={{
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "#081225",
    border: `2px solid ${progressColor}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "42px",
    boxShadow: `0 0 20px ${progressColor}`
  }}
>

    {player.icono}
  </div>

  <div>

    <div
      style={{
        fontSize: "28px",
        fontWeight: "bold"
      }}
    >
      {player.nombre}
    </div>

    <div
  style={{
    color: progressColor,
    fontSize: "16px",
    fontWeight: "bold"
  }}
>
      Posición {player.posicion}
    </div>

  </div>

</div>



<div
  style={{
    flex: 1
  }}
>
      <div
  style={{
    position: "relative",
    width: "100%",
    margin: "0 auto",
    height: "75px",
    background:
"linear-gradient(90deg,#06101f,#102b4d,#06101f)",
    borderRadius: "20px",
    marginTop: "10px",
    overflow: "hidden",
    border:
"1px solid rgba(0,140,255,0.3)",
    boxShadow:
"0 0 20px rgba(0,100,255,0.2)",
  }}
>
{
  [...Array(8)].map((_, index) => (

    <div
      key={index}
      style={{
        position: "absolute",
        left: `${(index + 1) * 12.5}%`,
        top: 0,
        bottom: 0,
        width: "2px",
        background:
          "rgba(255,255,255,0.15)"
      }}
    />

  ))
}

<div
  style={{
    position: "absolute",
    left: "0px",
right: "50px",
    top: "50%",
    borderTop:
"5px dashed rgba(255,255,255,0.35)"
  }}
/>

<div
  style={{
    position: "absolute",

    left: "0px",

    top: "50%",

    transform:
      "translateY(-50%)",

    width:
`calc(${player.posicion * 11.5}% + 20px)`,

    height: "12px",

    background:
  player.turboActivo
    ? "linear-gradient(90deg,#ff6b00,#ffb347)"
    : progressColor,

    borderRadius: "20px",

    boxShadow:
  player.turboActivo
    ? "0 0 20px #ff8800"
    : `0 0 20px ${progressColor}`,

    transition:
      "width 0.8s ease"
  }}
/>


  <div
  style={{
    position: "absolute",
    left: `calc(30px + ${player.posicion * 11.5}%)`,
    top: "50%",
    transform:
      "translate(-50%, -50%)",
    transition:
      "left 0.8s ease",
    fontSize: "42px",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  }}
>

  <img
  src={playerCar}
  style={{
    width: "70px"
  }}
/>

  {player.inmuneBloqueo && "🛡️"}

  {player.turboActivo && (
  <span
    style={{
      animation:
        "pulse 0.5s infinite"
    }}
  >
    🚀
  </span>
)}

</div>



    <div
  style={{
    position: "absolute",
    right: 0,
    top: 0,
    width: "40px",
    height: "100%",

    background:
      `repeating-linear-gradient(
        0deg,
        white 0px,
        white 12px,
        black 12px,
        black 24px
      )`,

    boxShadow:
      "0 0 25px gold"
  }}
/>


</div>

<div
  style={{
    marginTop: "5px"
  }}
>

    </div>
    </div>
    </div>

    );

    
})}
</RaceTrack>


      <br />
    </div>

  );
}