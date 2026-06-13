import { useEffect, useState } from "react";
import { socket } from "../services/socket";

export default function Admin() {

  // ====================
  // Estados
  // ====================

const volverInicio = () => {

  socket.emit(
  "resetRace",
  "LOCAL"
);

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

};

  const CARS = [
  "/cars/blue.png",
  "/cars/red.png",
  "/cars/green.png",
  "/cars/yellow.png",
  "/cars/purple.png",
  "/cars/orange.png"
];

const CAR_COLORS = [
  "#38bdf8", // azul
  "#ff4444", // rojo
  "#22c55e", // verde
  "#facc15", // amarillo
  "#a855f7",  // violeta
  "#f97316" // naranja
];

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

        console.log(
          "Race update:",
          playersList
        );

        setRacePlayers(
          playersList
        );

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

    setTimeout(() => {

      setShowWinner(
        false
      );

      setFinalRanking(
        ranking
      );

    }, 3000);

  }
);

socket.on(
  "questionStarted",
  (data) => {

    setRaceStarted(true);

    setCurrentQuestion(
      data.pregunta
    );

    setTimeLeft(
      data.tiempo
    );

    setAllAnswered(false);

    setShowExplanation(false);

    setExplanationData(null);

  }
);

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

  `;
  

  document.head.appendChild(style);

  return () =>
    document.head.removeChild(style);

}, []);


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
////////
/////////////////
if (
  showWinner &&
  winner
) {

  return (

  <div
    style={{
      minHeight: "100vh",

      background:
        "radial-gradient(circle,#1e40af,#020617 70%)",

      display: "flex",
      flexDirection: "column",

      justifyContent: "center",
      alignItems: "center",

      color: "white",

      textAlign: "center"
    }}
  >

    <div
  style={{
    fontSize: "120px",
    marginBottom: "25px",

    textShadow: `
      0 0 20px gold,
      0 0 40px gold,
      0 0 80px gold
    `
  }}
>
  🏆
</div>
<br /><br /><br /><br />
<div
  style={{
    fontSize: "90px",

    marginBottom: "25px",

    animation:
      "winnerPulse 1.2s infinite"
  }}
>
  {winner.icono}
</div>
<br /><br /><br />
<h1
  style={{
    fontSize: "70px",

    marginTop: "0px",
    marginBottom: "30px",

    color: "#38bdf8",

    textShadow:
      "0 0 20px #38bdf8"
  }}
>
  {winner.nombre}
</h1>
<br /><br />
<h2
  style={{
    fontSize: "36px",

    marginTop: "0px",

    letterSpacing: "3px",

    color: "#e2e8f0"
  }}
>
  HA GANADO LA CARRERA
</h2>
<br /><br />
  </div>

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
        💡
      </div>

<br />

      <h1>
        DATO DE CIBERSEGURIDAD
      </h1>

      <br />

      <h2>
        Respuesta correcta
      </h2>

      <h1
        style={{
          color: "#38bdf8",

          textShadow:
            "0 0 15px #38bdf8"
        }}
      >
        {explanationData.respuestaCorrecta}
      </h1>

      <br />

      <p
        style={{
          fontSize: "26px",

          lineHeight: "1.6"
        }}
      >
        {explanationData.explicacion}
      </p>

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
"radial-gradient(circle at top,#1e40af,#020617 35%,#010409 90%)",
overflow: "hidden",
position: "relative",
  color: "white",
  display: "flex",
  flexDirection: "column"
}}
  >

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

    <h1
  style={{
    fontSize: "90px",
    fontWeight: "900",
    letterSpacing: "8px",
    color: "#38bdf8",

    textShadow: `
      0 0 1px #38bdf8,
      0 0 1px #38bdf8,
      0 0 60px #38bdf8
    `,

    marginBottom: "10px"
  }}
>
  CIBER RETO
</h1>
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

    setFinalRanking(null);
    setWinner(null);
    setShowWinner(false);
    setShowExplanation(false);
    setExplanationData(null);

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
    background:
      "linear-gradient(90deg,#2563eb,#38bdf8)",
    boxShadow:
      "0 0 25px rgba(56,189,248,.5)"
  }}
>
  🚀 INICIAR CARRERA
</button>

</div>


  </div>
)}


{raceStarted && (
<>
<div
  style={{
    textAlign: "center",
    marginBottom: "10px"
  }}
>

  <h2
    style={{
      fontSize: "38px",
      lineHeight: "1.2",
      fontWeight: "bold",
      color: "#ffffff",
      maxWidth: "1200px",
      margin: "0 auto"
    }}
  >
    {currentQuestion}
  </h2>

</div>

<div
  style={{
    textAlign: "center",
    marginBottom: "30px"
  }}
>

<br />
  <div
    style={{
      fontSize: "50px",
      fontWeight: "bold",
      color:

timeLeft <= 5
  ? "#ff5555"
  : "#ffffff",

      textShadow:

timeLeft <= 5

? `
0 0 10px #ff4444,
0 0 20px #ff4444,
0 0 40px #ff4444
`

: `
0 0 10px #38bdf8,
0 0 20px #38bdf8,
0 0 40px #38bdf8
`,
    }}
  >
    {timeLeft}
  </div>

</div>

<div
  style={{
    marginLeft: "240px",
    width: "calc(100% - 240px)",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}
>
  {[0,1,2,3,4,5,6,7,8].map(numero => (

    <div
      key={numero}
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background:
          "rgba(0,80,255,0.15)",
        border:
          "2px solid rgba(0,140,255,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "18px",
        boxShadow:
          "0 0 15px rgba(0,140,255,0.4)"
      }}
    >
      {numero}
    </div>

  ))}
</div>
</>
)}

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

      <br />
    </div>

  );
}