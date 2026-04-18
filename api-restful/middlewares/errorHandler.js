function errorHandler(err, req, res, next) {
  console.error(err.stack); // muestra error en consola

  res.status(500).json({
    message: err.message || "Error interno del servidor"
  });
}

module.exports = errorHandler;