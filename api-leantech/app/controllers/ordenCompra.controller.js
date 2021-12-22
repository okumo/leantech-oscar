const moment = require("moment");
const db = require("../models");
const Product = db.product;
const OrdenCompra = db.ordenCompra;

exports.create = async (req, res) => {
  // Validate request
  if (
    !req.body.fecha ||
    !req.body.nombreProducto ||
    !req.body.cantidad ||
    !req.body.codigoProducto
  ) {
    res.status(400).send({
      message: "Parámetros incompletos.",
    });
    return;
  }

  //Extraemoos los parámetros necesarios
  let { fecha, nombreProducto, cantidad, codigoProducto } = req.body;

  try {
    //Buscamos si ya existe el producto que queremos comprar
    let product = await Product.findOne({
      where: {
        codigo: codigoProducto,
      },
    });

    console.log(product);

    //Verificamos si existe y si la suma del stock con la cantidad que se va a comprar supera las 30 unidades
    if (product && product.stock + cantidad < 31) {
      //Creamos la orden de compra
      let ordenCompra_result = await OrdenCompra.create({
        fecha: moment(fecha * 1000).format(),
        cantidad: parseInt(cantidad),
        codigoProducto: parseInt(codigoProducto),
        nombreProducto,
      });

      //Actualizamos el stock del producto
      let product_result = await Product.update(
        {
          stock: product.stock + cantidad,
        },
        {
          where: {
            codigo: parseInt(codigoProducto),
          },
        }
      );

      res.status(200).send({
        message: "Orden de compra satisfactoria!.",
      });
      return;
    }

    //Validamos si el producto es nuevo y que la cantidad no sea mayor a 30
    if (product == null && cantidad < 31) {
      let ordenCompra_result = await OrdenCompra.create({
        fecha: moment(fecha * 1000).format(),
        cantidad: parseInt(cantidad),
        codigoProducto: parseInt(codigoProducto),
        nombreProducto,
      });
      let product_result = await Product.create({
        stock: cantidad,
        nombre: nombreProducto,
        codigo: codigoProducto,
      });
      res.status(200).send({
        message: "Orden de compra satisfactoria!.",
      });
      return;
    } else {
      res.status(400).send({
        message:
          "El producto no se encuentra en stock o la compra supera las 30 unidades permitidas.",
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        "Ocurrió un error al guardar la orden de compra, por favor revise los parámetros.",
    });
    return;
  }
};

exports.findAll = (req, res) => {
  OrdenCompra.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error.",
      });
    });
};
