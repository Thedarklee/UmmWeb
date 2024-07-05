//Libreria de Express
const express = require('express');
//Libreria Path
const path = require('path');
//Libreria Mysql
const mysql = require('mysql');
//Liberia Multer
const multer = require('multer');
const app = express();
const port = 3000;

//que multer sepa la carpeta 

const upload = multer({ dest: 'img/' });

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
    host: '10.0.6.39',
    user: 'estudiante',
    password: 'Info-2023',
    database: 'HeladeriaJavieraAlarcon'
});
//Verificacion de errores para validar si la conexion es correcta
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');
});

//que lea las captetas extenas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'pagina_principal')));


//Envio los datos del formulario por url
app.use(express.urlencoded({ extended: true }));
//Convierto en formato json
app.use(express.json());
//Configuro para que la aplicacon inicie desde el director o carpeta pagina principal
app.use(express.static(path.join(__dirname, 'pagina_principal')));
//Recibo los valores y los envio a la tabla
app.post('/guardar_helado', upload.single('imagen'), (req, res) => {
    const imagen = req.file.filename;
    const { nombre, descripcion, sabor, tipo, cobertura, precio } = req.body;
    const sql = 'INSERT INTO Helado (nombre, descripcion, sabor, tipo, cobertura, precio, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [nombre, descripcion, sabor, tipo, cobertura, precio, imagen], (err, result) => {
        if (err) throw err;
        console.log('Helado insertada correctamente.');
        res.redirect('/listardatos.html');
    });
});

app.post('/guardar_usuario', (req, res) => {
   
    const { nombre, correo, contraseña} = req.body;
    const sql = 'INSERT INTO Usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)';
    connection.query(sql, [nombre, correo, contraseña], (err, result) => {
        if (err) throw err;
        console.log('usuario insertado correctamente.');
        res.redirect('/index.html');
    });
});


//Ruta para mostrar las películas en el listardatos.html con metodo GET
app.get('/helados', (req, res) => {
    //Realiza una consulta SQL para seleccionar todas las filas de la tabla "peliculas"
    connection.query('SELECT * FROM Helado', (err, rows) => {
        //Maneja los errores, si los hay
        if (err) throw err;
        res.send(rows); //Aquí puedes enviar la respuesta como quieras (por ejemplo, renderizar un HTML o enviar un JSON)
    });
});
// Ruta para obtener los datos de una película por su ID
app.get('/helado_especifico/:id', (req, res) => {
    // Extraer el ID de los parámetros de la solicitud
    const id = req.params.id;
    // Ejecutar una consulta SQL para obtener los datos de la película con el ID proporcionado
    connection.query('SELECT * FROM Helado WHERE id = ?', [id], (err, result) => {
        if (err) {
            // Manejar el error si ocurre durante la consulta
            console.error('Error al obtener los datos de la película:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Verificar si no se encontró ninguna película con el ID proporcionado
        if (result.length === 0) {
            res.status(404).send('Película no encontrada');
            return;
        }
        // Enviar los datos de la película como respuesta en formato JSON
        res.json(result[0]);
    });
});
//login
app.post('/submit_login', (req, res) => {

    const { correo, contraseña } = req.body;
    const sql = 'Select id from Usuarios where correo = ? and contraseña = ? ';
    connection.query(sql, [correo, contraseña], (err, result) => {

        if (result.length > 0) {
                console.log('entrar: ');
                res.redirect('/helado.html');

        } else {
            res.send('Correo o contraseña incorrecta' + result.length)

        }

    });
});





//Servidor ejecutandose en el puerto 3000
app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

