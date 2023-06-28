document.addEventListener('DOMContentLoaded', function() {
    var excelFileInput = document.getElementById('excelFileInput');
    var processButton = document.getElementById('processButton');
  
    processButton.addEventListener('click', function() {
      var file = excelFileInput.files[0];
      if (file) {
        var formData = new FormData();
        formData.append('excelFile', file);
  
        // Enviar el archivo al servidor utilizando una solicitud AJAX
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/procesar-archivo', true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            // El archivo se procesó con éxito
            var response = JSON.parse(xhr.responseText);
            console.log(response);
          }
        };
        xhr.send(formData);
      }
    });
  });
  