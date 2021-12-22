module.exports = (sequelize, Sequelize) => {
  const OrdenVenta = sequelize.define("ordenVenta", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: Sequelize.DATETIME,
    },
    cantidad: {
      type: Sequelize.INTEGER,
    },
    codigoProducto: {
      type: Sequelize.BOOLEAN,
    },
    nombreProducto: {
      type: Sequelize.STRING,
    },
  });

  return OrdenVenta;
};
