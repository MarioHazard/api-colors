# API colors

API REST desarrollada en Node.js v10.20.1 con express v4.17.1. Se utiliza una base de datos mongoDB alojada en [mongoDB Atlas](https://www.mongodb.com/cloud/atlas). Permite obtener una lista de colores con algunas de sus propiedades, además de un detalle de cada color.

## Recursos

Existe un repositorio disponible en  [git](https://github.com/MarioHazard/api-colors).

Existe una versión [online](https://api-colors-impl.herokuapp.com/colores) en Heroku.

## Instalación

Utilizar [npm](https://www.npmjs.com/) v6.14.4 para instalar las depencias.

```bash
npm i
```
Utilizar [nodeJS](https://nodejs.org/) para levantar el servidor.
```bash
node server.js
```
## Uso
- Para obtener la lista de colores se utiliza el endpoint

`GET /colores`
Por defecto devuelve 6 elementos. 

- Para obtener los detalles de un color específico 

`GET /colores/:id`
### type XML y JSON
Se puede inrgesar el parámetro type en ambos casos, si no se especifica se considera JSON.

`GET /colores?type=xml`

`GET /colores/:id?type=xml`


## Extras
### Parámetros page y per_page
Se puede ingresar la página o cuántos colores por página se desean

`GET /colores?page=1&per_page=9`

Sirve para JSON y XML, pero en el caso de JSON devuelve estos valores además del total y total de páginas.
### Endpoint para agregar nuevos colores.

`POST /colores`

ejemplo de body:
```JSON
{"name":"example","year":2020,"color":"#FFFFFF","pantone_value":"11-0601"}
```

 
### Endpoint para editar un color.

 `PUT /colores/:id`
 
body tiene que ser uno o varios atributos ejemplo:
```JSON
{"year":2020}
```
### Endpoint para eliminar un color. 

`DELETE /colores/:id`
## Comentarios
Existe un problema con esta API en relación a la que utiliza el front desarollado, es que al entregar el grupo de colores en el endpoint general no entrega los atributos year ni pantone code, según lo solicitado.
