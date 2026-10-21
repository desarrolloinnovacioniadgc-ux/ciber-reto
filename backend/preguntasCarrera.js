const preguntasCarrera = [
  {
    id: 1,
    pregunta: "¿Cuál es la red social más conocida?",
    opciones: ["TikTok", "Facebook", "YouTube"],
    correcta: "TikTok",
    explicacion: "Hoy TikTok es una de las plataformas más populares entre adolescentes y jóvenes."
  },
  {
    id: 2,
    pregunta: "¿Cuál es la aplicación de mensajería más utilizada?",
    opciones: ["Telegram", "Discord", "WhatsApp"],
    correcta: "WhatsApp",
    explicacion: "WhatsApp es una de las aplicaciones de mensajería más utilizadas del mundo, por eso también es un objetivo frecuente de estafas."
  },
  {
    id: 3,
    pregunta: "¿Cuál es la plataforma de videos más conocida?",
    opciones: ["YouTube", "Twitch", "Kick"],
    correcta: "YouTube",
    explicacion: "YouTube es una de las principales fuentes de información y entretenimiento, pero no todo el contenido que aparece es confiable."
  },
  {
    id: 4,
    pregunta: "¿Cuál es el videojuego más conocido?",
    opciones: ["Fortnite", "Minecraft", "Valorant"],
    correcta: "Minecraft",
    explicacion: "Los videojuegos online son espacios para divertirse, pero también es importante cuidar la privacidad y el trato con otros jugadores."
  },
  {
    id: 5,
    pregunta: "¿Cuál es la contraseña más utilizada?",
    opciones: ["123456", "qwerty", "admin"],
    correcta: "123456",
    explicacion: "Las contraseñas simples siguen siendo una de las principales causas de robo de cuentas."
  },
  {
    id: 6,
    pregunta: "¿Dónde ocurre más el ciberbullying?",
    opciones: ["Redes sociales", "Correo electrónico", "Foros"],
    correcta: "Redes sociales",
    explicacion: "El ciberbullying suele producirse donde las personas interactúan más frecuentemente."
  },
  {
    id: 7,
    pregunta: "¿Qué dato personal comparte demasiado la gente?",
    opciones: ["Su ubicación", "Su color favorito", "Su comida favorita"],
    correcta: "Su ubicación",
    explicacion: "Compartir ubicación puede exponer información sobre rutinas, lugares frecuentes y hábitos personales."
  },
  {
    id: 8,
    pregunta: "¿Qué red social usan más los adolescentes?",
    opciones: ["LinkedIn", "TikTok", "Pinterest"],
    correcta: "TikTok",
    explicacion: "Las plataformas populares entre adolescentes suelen ser utilizadas también por estafadores y perfiles falsos."
  },
  {
    id: 9,
    pregunta: "¿Qué plataforma es más conocida para hacer directos?",
    opciones: ["Twitch", "Kick", "Discord"],
    correcta: "Twitch",
    explicacion: "Los directos permiten interactuar en tiempo real, pero también requieren moderación y cuidado en los chats."
  },
  {
    id: 10,
    pregunta: "¿Qué método protege mejor una cuenta?",
    opciones: ["Contraseña simple", "Verificación en dos pasos", "Usar el mismo PIN"],
    correcta: "Verificación en dos pasos",
    explicacion: "La verificación en dos pasos agrega una capa extra de seguridad incluso si alguien descubre tu contraseña."
  },
  {
    id: 11,
    pregunta: "¿Qué suele hacer primero un estafador online?",
    opciones: ["Ganarse la confianza", "Pedir tarea escolar", "Compartir memes"],
    correcta: "Ganarse la confianza",
    explicacion: "Muchas estafas comienzan con conversaciones aparentemente normales para generar confianza."
  },
  {
    id: 12,
    pregunta: "¿Qué acción es más recomendable ante un enlace sospechoso?",
    opciones: ["Abrirlo rápido", "Ignorarlo o verificarlo", "Compartirlo"],
    correcta: "Ignorarlo o verificarlo",
    explicacion: "Antes de abrir un enlace desconocido, conviene verificar quién lo envió y a dónde dirige."
  },
  {
    id: 13,
    pregunta: "¿Qué plataforma de chat es más popular entre gamers?",
    opciones: ["Discord", "Telegram", "Skype"],
    correcta: "Discord",
    explicacion: "Discord es muy popular para comunidades y videojuegos, por lo que también requiere buenas prácticas de privacidad."
  },
  {
    id: 14,
    pregunta: "¿Qué red social es más usada para compartir fotos?",
    opciones: ["Instagram", "Reddit", "LinkedIn"],
    correcta: "Instagram",
    explicacion: "Lo que se publica en internet puede permanecer disponible mucho tiempo, incluso después de eliminarlo."
  },
  {
    id: 15,
    pregunta: "¿Qué hacen muchos usuarios cuando reciben una solicitud desconocida?",
    opciones: ["La aceptan", "La ignoran", "La reportan"],
    correcta: "La aceptan",
    explicacion: "Aceptar solicitudes de desconocidos puede facilitar engaños o intentos de obtener información personal."
  },
  {
    id: 16,
    pregunta: "¿Qué peligro se relaciona más con menores en videojuegos?",
    opciones: ["Grooming", "Lag", "Mods"],
    correcta: "Grooming",
    explicacion: "El grooming ocurre cuando un adulto intenta ganarse la confianza de un menor con fines inapropiados."
  },
  {
    id: 17,
    pregunta: "¿Qué dispositivo usa más la gente para conectarse a internet?",
    opciones: ["Computadora", "Tablet", "Celular"],
    correcta: "Celular",
    explicacion: "El celular almacena mucha información personal y merece las mismas medidas de seguridad que una computadora."
  },
  {
    id: 18,
    pregunta: "¿Qué tipo de contenido se vuelve viral más rápido?",
    opciones: ["Noticias largas", "Videos cortos", "Documentos PDF"],
    correcta: "Videos cortos",
    explicacion: "El contenido viral puede ser entretenido, pero también puede contener información falsa o engañosa."
  },
  {
    id: 19,
    pregunta: "¿Qué plataforma es más conocida por videos cortos?",
    opciones: ["TikTok", "Twitch", "Reddit"],
    correcta: "TikTok",
    explicacion: "Los videos cortos son muy atractivos y pueden influir rápidamente en tendencias y comportamientos."
  },
  {
    id: 20,
    pregunta: "¿Qué suele buscar un ciberdelincuente?",
    opciones: ["Datos personales", "Fotos de paisajes", "Horarios de TV"],
    correcta: "Datos personales",
    explicacion: "Los datos personales pueden utilizarse para fraudes, suplantación de identidad o estafas."
  },
  {
    id: 21,
    pregunta: "¿Qué método de desbloqueo usa más la gente?",
    opciones: ["Huella digital", "Contraseña larga", "Llave física"],
    correcta: "Huella digital",
    explicacion: "La biometría es cómoda, pero debe complementarse con otras medidas de seguridad."
  },
  {
    id: 22,
    pregunta: "¿Qué red social es más popular para ver influencers?",
    opciones: ["Instagram", "LinkedIn", "Pinterest"],
    correcta: "Instagram",
    explicacion: "No todo lo que recomiendan los influencers es seguro o confiable; siempre conviene verificar."
  },
  {
    id: 23,
    pregunta: "¿Qué acción ayuda más a proteger una cuenta?",
    opciones: ["Compartir la contraseña", "Activar la verificación en dos pasos", "Usar 123456"],
    correcta: "Activar la verificación en dos pasos",
    explicacion: "Una segunda capa de autenticación dificulta mucho el acceso no autorizado."
  },
  {
    id: 24,
    pregunta: "¿Qué plataforma es más conocida para subir videos propios?",
    opciones: ["YouTube", "Discord", "Telegram"],
    correcta: "YouTube",
    explicacion: "Antes de publicar contenido, es importante revisar qué información personal aparece en él."
  },
  {
    id: 25,
    pregunta: "¿Qué suelen usar los estafadores para engañar?",
    opciones: ["Premios falsos", "Recetas de cocina", "Horóscopos"],
    correcta: "Premios falsos",
    explicacion: "Las promesas de premios o regalos son una táctica clásica para captar víctimas."
  },
  {
    id: 26,
    pregunta: "¿Qué información es más riesgosa publicar?",
    opciones: ["Dirección de tu casa", "Tu película favorita", "Tu color favorito"],
    correcta: "Dirección de tu casa",
    explicacion: "La dirección personal es información sensible que no debería compartirse públicamente."
  },
  {
    id: 27,
    pregunta: "¿Qué suele hacer una persona antes de caer en una estafa?",
    opciones: ["Confiar demasiado", "Actualizar el celular", "Cambiar el fondo de pantalla"],
    correcta: "Confiar demasiado",
    explicacion: "Los ciberdelincuentes suelen aprovechar la urgencia, la confianza o la falta de verificación."
  },
  {
    id: 28,
    pregunta: "¿Qué plataforma es más conocida para contenido profesional?",
    opciones: ["LinkedIn", "TikTok", "Snapchat"],
    correcta: "LinkedIn",
    explicacion: "También en plataformas profesionales existen perfiles falsos y posibles intentos de fraude."
  },
  {
    id: 29,
    pregunta: "¿Qué tipo de cuenta suele intentar robar un ciberdelincuente?",
    opciones: ["Redes sociales", "Calculadora", "Bloc de notas"],
    correcta: "Redes sociales",
    explicacion: "Las cuentas de redes sociales pueden utilizarse para estafas, spam o robo de identidad."
  },
  {
    id: 30,
    pregunta: "¿Qué consejo de seguridad escucha más la gente?",
    opciones: ["No compartas tus contraseñas", "Usa más emojis", "Mira menos televisión"],
    correcta: "No compartas tus contraseñas",
    explicacion: "Una contraseña debe ser privada, única y difícil de adivinar."
  },
  {
  id: 31,
  pregunta: "¿Qué deberías hacer si recibís un mensaje con un enlace sospechoso?",
  opciones: [
    "Abrirlo para saber de qué se trata",
    "No abrirlo y verificar quién lo envió",
    "Reenviarlo a tus contactos"
  ],
  correcta: "No abrirlo y verificar quién lo envió",
  explicacion: "Los enlaces sospechosos pueden llevar a sitios falsos o maliciosos. Lo recomendable es verificar el mensaje antes de abrir cualquier enlace."
},

{
  id: 32,
  pregunta: "¿Qué es el phishing?",
  opciones: [
    "Una técnica para engañar y obtener información personal",
    "Un programa para acelerar Internet",
    "Un tipo de videojuego"
  ],
  correcta: "Una técnica para engañar y obtener información personal",
  explicacion: "El phishing utiliza mensajes, correos o sitios falsos para intentar obtener contraseñas, datos bancarios u otra información."
},

{
  id: 33,
  pregunta: "¿Qué deberías hacer si alguien te pide por WhatsApp el código de verificación de tu cuenta?",
  opciones: [
    "Dárselo si dice ser un amigo",
    "No compartirlo con nadie",
    "Publicarlo para pedir ayuda"
  ],
  correcta: "No compartirlo con nadie",
  explicacion: "El código de verificación es privado. Compartirlo puede permitir que otra persona intente tomar el control de tu cuenta."
},

{
  id: 34,
  pregunta: "¿Qué es el SIM Swapping?",
  opciones: [
    "Un cambio de compañía telefónica",
    "Una técnica utilizada para obtener el control de una línea telefónica",
    "Una actualización del teléfono"
  ],
  correcta: "Una técnica utilizada para obtener el control de una línea telefónica",
  explicacion: "En un SIM Swapping, un delincuente intenta transferir el número de teléfono de la víctima a otra tarjeta SIM."
},

{
  id: 35,
  pregunta: "¿Qué señal podría indicar que tu teléfono fue víctima de un SIM Swapping?",
  opciones: [
    "La batería dura más",
    "Perdés repentinamente la señal y dejás de recibir llamadas y SMS",
    "La pantalla cambia de color"
  ],
  correcta: "Perdés repentinamente la señal y dejás de recibir llamadas y SMS",
  explicacion: "La pérdida repentina e inexplicable de señal puede ser una señal de que alguien obtuvo el control de tu línea."
},

{
  id: 36,
  pregunta: "¿Qué característica debería tener una contraseña segura?",
  opciones: [
    "Ser larga y difícil de adivinar",
    "Ser igual para todas tus cuentas",
    "Contener solamente tu fecha de nacimiento"
  ],
  correcta: "Ser larga y difícil de adivinar",
  explicacion: "Una contraseña segura debe ser difícil de predecir y es recomendable utilizar contraseñas diferentes para cada cuenta."
},

{
  id: 37,
  pregunta: "¿Para qué sirve la verificación en dos pasos?",
  opciones: [
    "Para aumentar la seguridad de una cuenta",
    "Para hacer que Internet sea más rápido",
    "Para eliminar los mensajes antiguos"
  ],
  correcta: "Para aumentar la seguridad de una cuenta",
  explicacion: "La verificación en dos pasos agrega una segunda medida de seguridad además de la contraseña."
},

{
  id: 38,
  pregunta: "¿Qué deberías hacer si recibís un archivo inesperado de un desconocido?",
  opciones: [
    "Abrirlo inmediatamente",
    "No abrirlo y verificar su procedencia",
    "Descargarlo y reenviarlo"
  ],
  correcta: "No abrirlo y verificar su procedencia",
  explicacion: "Los archivos desconocidos pueden contener contenido malicioso o utilizarse para engañar a la víctima."
},

{
  id: 39,
  pregunta: "¿Qué información es mejor evitar publicar públicamente en redes sociales?",
  opciones: [
    "Tu dirección particular",
    "Tu película favorita",
    "Tu color favorito"
  ],
  correcta: "Tu dirección particular",
  explicacion: "La dirección, horarios y otros datos personales pueden ser utilizados por personas con malas intenciones."
},

{
  id: 40,
  pregunta: "¿Qué deberías hacer si una cuenta desconocida te pide fotos personales?",
  opciones: [
    "Enviar algunas para conocer a la persona",
    "No enviarlas y contarle a un adulto de confianza",
    "Enviar solamente una"
  ],
  correcta: "No enviarlas y contarle a un adulto de confianza",
  explicacion: "Nunca es necesario enviar imágenes personales a desconocidos. Ante una situación incómoda, es importante pedir ayuda."
},

{
  id: 41,
  pregunta: "¿Qué es el grooming?",
  opciones: [
    "Una técnica de engaño utilizada por un adulto para contactar a un menor con fines sexuales",
    "Un tipo de antivirus",
    "Una función de las redes sociales"
  ],
  correcta: "Una técnica de engaño utilizada por un adulto para contactar a un menor con fines sexuales",
  explicacion: "El grooming implica estrategias de engaño y manipulación para generar confianza con un niño, niña o adolescente."
},

{
  id: 42,
  pregunta: "¿Qué debería hacer un menor si alguien en Internet lo amenaza para que mantenga un secreto?",
  opciones: [
    "Guardar silencio",
    "Contárselo a un adulto de confianza",
    "Eliminar todas sus cuentas inmediatamente"
  ],
  correcta: "Contárselo a un adulto de confianza",
  explicacion: "Las amenazas y secretos impuestos son señales de alerta. Pedir ayuda permite actuar y proteger a la víctima."
},

{
  id: 43,
  pregunta: "¿Qué es la sextorsión?",
  opciones: [
    "Una amenaza para obtener algo utilizando imágenes o videos íntimos",
    "Un sistema para proteger fotografías",
    "Una función de una cámara"
  ],
  correcta: "Una amenaza para obtener algo utilizando imágenes o videos íntimos",
  explicacion: "En la sextorsión, el delincuente amenaza con difundir contenido íntimo para conseguir dinero, más imágenes u otras acciones."
},

{
  id: 44,
  pregunta: "¿Qué conviene hacer si alguien amenaza con publicar imágenes íntimas?",
  opciones: [
    "Pagar inmediatamente",
    "Guardar evidencias y pedir ayuda",
    "Enviar más imágenes para convencerlo"
  ],
  correcta: "Guardar evidencias y pedir ayuda",
  explicacion: "No se recomienda ceder ante las amenazas. Es importante conservar las evidencias y buscar ayuda de personas de confianza y autoridades."
},

{
  id: 45,
  pregunta: "¿Qué dato puede utilizar un delincuente para intentar engañarte?",
  opciones: [
    "Información que publicaste en redes sociales",
    "El color de tu pared",
    "La marca de tus zapatillas"
  ],
  correcta: "Información que publicaste en redes sociales",
  explicacion: "Los delincuentes pueden recopilar información pública para construir engaños más creíbles."
},

{
  id: 46,
  pregunta: "¿Qué deberías hacer antes de instalar una aplicación?",
  opciones: [
    "Revisar quién la desarrolló y qué permisos solicita",
    "Instalarla sin leer nada",
    "Descargarla desde cualquier enlace"
  ],
  correcta: "Revisar quién la desarrolló y qué permisos solicita",
  explicacion: "Revisar el desarrollador, los permisos y la fuente de descarga ayuda a reducir riesgos."
},

{
  id: 47,
  pregunta: "¿Qué riesgo existe al reutilizar la misma contraseña en varias cuentas?",
  opciones: [
    "Si una cuenta es comprometida, otras también podrían quedar expuestas",
    "Las cuentas funcionan más rápido",
    "La contraseña se vuelve más segura"
  ],
  correcta: "Si una cuenta es comprometida, otras también podrían quedar expuestas",
  explicacion: "Utilizar la misma contraseña en diferentes servicios aumenta el impacto de una filtración."
},

{
  id: 48,
  pregunta: "¿Qué deberías hacer si recibís un mensaje de tu supuesto banco solicitando tu contraseña?",
  opciones: [
    "Enviar la contraseña rápidamente",
    "No compartirla y contactar al banco por un canal oficial",
    "Responder preguntando qué necesitan"
  ],
  correcta: "No compartirla y contactar al banco por un canal oficial",
  explicacion: "Las entidades legítimas no deberían solicitar tus credenciales mediante mensajes sospechosos."
},

{
  id: 49,
  pregunta: "¿Cuál de estos enlaces debería generar mayor desconfianza?",
  opciones: [
    "Un enlace oficial que conocés",
    "Un enlace con una dirección extraña que promete un premio",
    "La página que utilizás habitualmente"
  ],
  correcta: "Un enlace con una dirección extraña que promete un premio",
  explicacion: "Las promesas de premios y las direcciones web extrañas son señales frecuentes de intentos de engaño."
},

{
  id: 50,
  pregunta: "¿Qué deberías hacer si recibís un mensaje diciendo que ganaste un premio que nunca participaste para obtener?",
  opciones: [
    "Enviar tus datos para reclamarlo",
    "Desconfiar y verificar la información por medios oficiales",
    "Pagar para recibir el premio"
  ],
  correcta: "Desconfiar y verificar la información por medios oficiales",
  explicacion: "Los premios inesperados pueden utilizarse como gancho para obtener datos personales o dinero."
},

{
  id: 51,
  pregunta: "¿Qué información nunca deberías compartir públicamente?",
  opciones: [
    "Códigos de verificación",
    "Tu comida favorita",
    "Tu película preferida"
  ],
  correcta: "Códigos de verificación",
  explicacion: "Los códigos de verificación son información privada que puede utilizarse para acceder a determinadas cuentas."
},

{
  id: 52,
  pregunta: "¿Qué deberías hacer si un supuesto familiar te pide dinero urgentemente por WhatsApp?",
  opciones: [
    "Enviar el dinero inmediatamente",
    "Verificar su identidad por otro medio antes de enviar dinero",
    "Publicar el mensaje en redes sociales"
  ],
  correcta: "Verificar su identidad por otro medio antes de enviar dinero",
  explicacion: "Los delincuentes pueden hacerse pasar por familiares. Una llamada telefónica puede ayudar a verificar la situación."
},

{
  id: 53,
  pregunta: "¿Qué es una estafa de suplantación de identidad?",
  opciones: [
    "Cuando alguien se hace pasar por otra persona para engañarte",
    "Cuando cambiás tu foto de perfil",
    "Cuando creás una cuenta nueva"
  ],
  correcta: "Cuando alguien se hace pasar por otra persona para engañarte",
  explicacion: "La suplantación busca generar confianza utilizando la identidad o apariencia de otra persona."
},

{
  id: 54,
  pregunta: "¿Por qué no conviene publicar que tu casa estará vacía durante varios días?",
  opciones: [
    "Porque puede revelar información útil para delincuentes",
    "Porque consume mucha batería",
    "Porque reduce la velocidad de Internet"
  ],
  correcta: "Porque puede revelar información útil para delincuentes",
  explicacion: "Publicar horarios o períodos en los que una vivienda estará vacía puede exponer información sensible."
},

{
  id: 55,
  pregunta: "¿Qué deberías hacer si alguien desconocido te pide mantener en secreto una conversación con vos?",
  opciones: [
    "Aceptar para no generar problemas",
    "Contárselo a un adulto de confianza",
    "Eliminar el chat y continuar hablando"
  ],
  correcta: "Contárselo a un adulto de confianza",
  explicacion: "Pedir que una conversación se mantenga en secreto puede ser una señal de manipulación, especialmente cuando se trata de menores."
},

{
  id: 56,
  pregunta: "¿Qué deberías hacer si perdés tu teléfono celular?",
  opciones: [
    "Esperar unos días para ver si aparece",
    "Bloquearlo y proteger tus cuentas lo antes posible",
    "Publicar todas tus contraseñas para recuperarlas"
  ],
  correcta: "Bloquearlo y proteger tus cuentas lo antes posible",
  explicacion: "Un teléfono perdido puede contener información y sesiones abiertas. Actuar rápidamente ayuda a proteger tus cuentas."
},

{
  id: 57,
  pregunta: "¿Qué significa que una cuenta esté comprometida?",
  opciones: [
    "Que otra persona pudo obtener acceso sin autorización",
    "Que cambiaste tu foto de perfil",
    "Que tenés muchos seguidores"
  ],
  correcta: "Que otra persona pudo obtener acceso sin autorización",
  explicacion: "Una cuenta comprometida puede haber sido accedida por alguien que no tiene autorización para utilizarla."
},

{
  id: 58,
  pregunta: "¿Qué deberías hacer si una página te pide información personal para entregarte un supuesto premio?",
  opciones: [
    "Completar todos los datos",
    "Verificar primero que la página sea legítima",
    "Enviar también una foto de tu documento"
  ],
  correcta: "Verificar primero que la página sea legítima",
  explicacion: "Los formularios falsos pueden utilizarse para recopilar información personal y cometer fraudes."
},

{
  id: 59,
  pregunta: "¿Qué ayuda a proteger tus cuentas si alguien descubre tu contraseña?",
  opciones: [
    "La verificación en dos pasos",
    "Usar la misma contraseña en todas partes",
    "Publicar la contraseña en un lugar visible"
  ],
  correcta: "La verificación en dos pasos",
  explicacion: "La autenticación en dos pasos agrega una capa adicional de seguridad y dificulta el acceso no autorizado."
},

{
  id: 60,
  pregunta: "¿Cuál es una buena regla antes de compartir información personal en Internet?",
  opciones: [
    "Pensar quién puede verla y para qué podría utilizarse",
    "Compartirla siempre que alguien la solicite",
    "Publicarla para conseguir más seguidores"
  ],
  correcta: "Pensar quién puede verla y para qué podría utilizarse",
  explicacion: "Antes de publicar información personal es importante evaluar quién podrá acceder a ella y los posibles riesgos."
}
];

module.exports =
  preguntasCarrera;