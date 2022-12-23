# Entrega desafío LogZipPerf-Kummer

## Para poder llegar con la entrega hice algo sencillo pero aplicando todo lo pedido.
## Trabajé con el endpoint de nros. primos
## Utilice gZip, log4js, artillery y 0x


## comandos utiles

node server.js

artillery quick --count 50 -n 40 http://localhost:8081/primes/?max=100000  --output my_artillery.json

0x -o server.js -p 8081
 
http://localhost:8081/primes/?max=100000



## archivos importantes
server.js
logger.js
my_artillery.json
/9396.0x/flamegraph.htmlflamegraph.html
/logs/error.log
/logs/warn.log
