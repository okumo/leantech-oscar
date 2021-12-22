module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.DATETIME,
    },
    stock: {
      type: Sequelize.INTEGER,
    },
    codigo: {
      type: Sequelize.BOOLEAN,
    },
  });

  return OrdenCompra;
};
