module.exports = (sequelize, Sequelize) => {
  const OrdenCompra = sequelize.define("ordenCompra", {
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

  return OrdenCompra;
};
