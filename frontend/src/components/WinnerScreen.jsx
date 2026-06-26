import { motion } from "framer-motion";

export default function WinnerScreen({ winner }) {

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

        textAlign: "center",

        overflow: "hidden",

        position: "relative"
      }}
    >

      <motion.div

        initial={{
          scale:0,
          rotate:-180
        }}

        animate={{
          scale:1,
          rotate:0
        }}

        transition={{
          duration:0.8
        }}

        style={{
          fontSize:"140px",

          textShadow:
            "0 0 40px gold"
        }}

      >

        🏆

      </motion.div>

      <motion.div

        initial={{
          y:120,
          opacity:0
        }}

        animate={{
          y:0,
          opacity:1
        }}

        transition={{
          delay:0.4,
          duration:0.7
        }}

        style={{
          fontSize:"100px",

          animation:
            "winnerPulse 1.2s infinite"
        }}

      >

        {winner.icono}

      </motion.div>

      <motion.h1

        initial={{
          opacity:0,
          scale:0.5
        }}

        animate={{
          opacity:1,
          scale:1
        }}

        transition={{
          delay:0.8
        }}

        style={{
          fontSize:"72px",

          color:"#38bdf8",

          textShadow:
            "0 0 25px #38bdf8"
        }}

      >

        {winner.nombre}

      </motion.h1>

      <motion.h2

        initial={{
          opacity:0
        }}

        animate={{
          opacity:1
        }}

        transition={{
          delay:1.1
        }}

        style={{
          fontSize:"34px",

          letterSpacing:"4px",

          color:"#e2e8f0"
        }}

      >

        HA GANADO LA CARRERA

      </motion.h2>

    </div>

  );

}