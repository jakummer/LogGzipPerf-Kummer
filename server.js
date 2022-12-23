import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import DAOUsuarios from "./daos/UsuariosDAO.js";
import logger from "./logger.js";
import compression from "compression";



const app = express();
//app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
const MongoUsers = new DAOUsuarios();
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//middleware para logear cualquier llamada
app.use((req, res, next) =>{
  logger.info(`Request ${req.method} at ${req.url}`)
  next();
}

);


// app.use(
//   session({
//     secret: "2332ee32e3232ee32",
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: "mongodb://127.0.0.1:27017/sesiones",
//       mongoOptions,
//     }),
//   })
// );
// app.use(express.static("public"));


// const { pathname: root } = new URL(".", import.meta.url);

// const authMod = (req, res, next) => {
//   req.session.rank >= 1
//     ? next()
//     : res.status(401).send({ rango: req.session.rank, error: "Sin permisos" });
// };
// const authAdmin = (req, res, next) => {
//   req.session.rank >= 2
//     ? next()
//     : res.status(401).send({ rango: req.session.rank, error: "Sin permisos" });
// };

// app.get("/admin", authAdmin, (req, res) => {
//   res.send("Hola admin!");
// });
// app.get("/mod", authMod, (req, res) => {
//   res.send("Hola mod!");
// });

// // root
// app.get("/", (req, res) => {
 
//   if (req.session.usuario) {
//     res.sendFile(root + "public/dashboard.html");
//   } else {
//     if (req.query.error) {
//       res.sendFile(root + "public/error.html");
//     } else {
//       res.sendFile("./public/login.html");
//     }
//   }
// });



// // * login de usuario
// app.post("/", async (req, res) => {
//   // * usuario
//   // * rango [admin, mod]
//   try {
//     const { username, password } = req.body;
//     const usuario = await MongoUsers.listar(username, password);
//     console.log(usuario);
//     req.session.rank = usuario.rank;
//     req.session.usuario = username;
//     res.redirect("/");
//   } catch (e) {
//     res.redirect("/?error=true");
//   }
// });


// // * registro de usuario
// app.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   await MongoUsers.guardar({ username, password });
//   req.session.usuario = username;
//   req.session.rank = 0;
//   res.redirect("/");
// });


// app.get("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     res.redirect("/");
//   });
// });



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

