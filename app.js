const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  app.get('/script.js', function(req, res) {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/script.js');
  });
  

app.post('/procesar-archivo', upload.single('excelFile'), function(req, res) {
  // Aquí puedes realizar la lógica de procesamiento del archivo Excel
  // Utiliza la librería adecuada (por ejemplo, 'xlsx' o 'exceljs') para leer el archivo y realizar las operaciones necesarias.

  // Retorna una respuesta con el resultado del procesamiento
  res.json({ message: 'Archivo procesado exitosamente' });
});

app.listen(3000, function() {
  console.log('Servidor iniciado en el puerto 3000');
});
