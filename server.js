import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
// import MongoStore from "connect-mongo";
// import DAOUsuarios from "./daos/UsuariosDAO.js";
import logger from "./logger.js";
import compression from "compression";



const app = express();
//app.use(compression());

/* app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
const MongoUsers = new DAOUsuarios();
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }; */



//middleware para logear cualquier llamada
app.use((req, res, next) =>{
  logger.info(`Request ${req.method} at ${req.url}`)
  next();
}

);


//endpoint para calculo de nro primos
//ingresar max
//se aplica compresión con GZip
app.get("/primes", compression(), (req, res) => {
  const primes = [];
  const max = Number(req.query.max) || 1000;

  for (let i = 1; i < max; i++){
    if (isPrime(i)) primes.push(i);
  }
  res.json(primes);
});


//verificamos todas las llamadas restantes, las que no se contemplaron arriba
//las que no existen
app.get('*', (req, res) => {
  logger.warn(`Failed Request ${req.method} at ${req.url}`);
  res.send({error: true}).status(500);
  //next();
});


app.listen(8081, () =>
  logger.info(`Servidor escuchando en puerto 8081.`)
);

//funcion para nros. primos
function isPrime(num){
  if ([2, 3].includes(num)) return true;
  else if ([2, 3].some((n) => num % n == 0)) return false;
  else {
    let i = 5,  w = 2;
    while (i ** 2 <= num) {
      if (num % i == 0) return false;
      i += w
      w = 6 - w
    }
  }
  return true
}

