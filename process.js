const mysql = require('mysql');

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario_mysql',
  password: 'tu_contraseña_mysql',
  database: 'akamai',
});

// Conecta a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');

  // Consulta los valores de la columna "consumo_percentil"
  const selectQuery = 'SELECT consumo_percentil FROM consumos_akamai';

  connection.query(selectQuery, (err, rows) => {
    if (err) {
      console.error('Error al realizar la consulta: ', err);
      connection.end();
      return;
    }

    // Recorre cada fila y realiza la multiplicación
    const results = [];
    for (let i = 0; i < rows.length; i++) {
      const consumoPercentil = rows[i].consumo_percentil;
      const facturacion = consumoPercentil * 0.09;
      results.push(facturacion);
    }

    // Crea la tabla "resultado" si no existe
    const createTableQuery = 'CREATE TABLE IF NOT EXISTS resultado (facturacion DECIMAL(10, 2))';
    connection.query(createTableQuery, (err) => {
      if (err) {
        console.error('Error al crear la tabla "resultado": ', err);
        connection.end();
        return;
      }

      // Inserta los resultados en la tabla "resultado"
      const insertQuery = 'INSERT INTO resultado (facturacion) VALUES ?';
      const values = results.map((facturacion) => [facturacion]);

      connection.query(insertQuery, [values], (err) => {
        if (err) {
          console.error('Error al insertar los resultados en la tabla "resultado": ', err);
        } else {
          console.log('Resultados insertados correctamente en la tabla "resultado".');
        }

        // Cierra la conexión a la base de datos
        connection.end();
      });
    });
  });
});
