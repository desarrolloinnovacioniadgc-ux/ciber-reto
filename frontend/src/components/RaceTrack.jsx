export default function RaceTrack({

    raceStarted,

    currentQuestion,

    timeLeft,

    children

}) {

    if (!raceStarted) return null;

    return (

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
`
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
                            background: "rgba(0,80,255,0.15)",
                            border: "2px solid rgba(0,140,255,0.6)",
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

            {children}

        </>

    );

}