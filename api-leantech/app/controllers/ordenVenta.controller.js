const db = require('../models');
const Product = db.product;
const OrdenVenta = db.ordenVenta;
// eslint-disable-next-line import/order
const moment = require('moment');

exports.create = async (req, res) => {
  // Validate request
  if (
    !req.body.fecha ||
    !req.body.nombreProducto ||
    !req.body.cantidad ||
    !req.body.idProducto
  ) {
    res.status(400).send({
      message: 'Parámetros incompletos.',
    });
    return;
  }

  // Extraemoos los parámetros necesarios
  const { fecha, nombreProducto, cantidad, idProducto, codigoProducto } =
    req.body;

  try {
    //Buscamos si ya existe el producto que queremos comprar
    const product = await Product.findAll({
      where: {
        codigo: idProducto,
      },
    });

    if (product) {
      //Verificamos si existe y si la suma del stock con la cantidad que se va a comprar supera las 30 unidades
      if (product.stock - cantidad >= 0) {
        //Creamos la orden de venta
        const ordenVenta_result = await OrdenVenta.create({
          fecha: moment(fecha * 1000).format(),
          cantidad: parseInt(cantidad),
          codigoProducto: parseInt(codigoProducto),
          nombreProducto,
        });

        //Actualizamos el stock del producto
        const product_result = await Product.update(
          {
            stock: product.stock - cantidad,
          },
          {
            where: {
              codigo: parseInt(codigoProducto),
            },
          }
        );
        res.status(200).send({
          message: 'Orden de compra satisfactoria!.',
        });
        return;
      } else {
        res.status(400).send({
          message:
            'La cantidad supera el stock disponible o el producto no se encuentra en stock',
        });
        return;
      }
    } else {
      res.status(400).send({
        message: 'El producto no se encuentra en stock',
      });
      return;
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Ocurrió un error al guardar la orden de venta, por favor revise los parámetros.',
    });
    return;
  }
};

exports.findAll = (req, res) => {
  OrdenVenta.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Ocurrió un error.',
      });
    });
};
