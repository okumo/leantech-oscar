module.exports = (sequelize, Sequelize) => {
  const OrdenVenta = sequelize.define(
    "ordenVenta",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha: {
        type: Sequelize.DATE,
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
    },
    {
      freezeTableName: true,
    }
  );

  return OrdenVenta;
};
