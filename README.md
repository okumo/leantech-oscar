# Lean Tech API Oscar

This is a Node API made by Oscar for a Lean Tech Test.

## Requisitos

1. Tener instalado docker
2. Sonreir :)

## Ejecución

Ubicarse en la raíz del proyecto y correr el siguiente comando:

```bash
docker-compose up
```

## Uso

Esta API solo permite ejecutar consultas de tipo POST Y GET

Tenemos 2 rutas de tipo POST:

```bash
localhost:8080/api/ordenCompra
localhost:8080/api/ordenVenta
```

Tenemos 2 rutas de tipo GET:

```bash
localhost:8080/api/ordenCompra
localhost:8080/api/ordenVenta
```

### Parámetros para las peticiones tipo POST, ejemplo:

La fecha es en formato unix en seconds.
El nombre del producto es string.
La cantidad es de tipo numerico, y solo acepta un valores entre el 0 y el 30.
El código del producto sirve para relacionar el producto con la orden de Compra o Venta.

Esta ruta recibe los parámetros en formato json a través del body.

```
{
	 "fecha": "1640108945",
    "nombreProducto": "jabón",
    "cantidad": 2,
    "codigoProducto":1
}
```
