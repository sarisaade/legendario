const express = require('express');
const emailjs = require('emailjs-com'); // Importa la librería de EmailJS

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configura tu usuario y servicio de EmailJS
const USER_ID = 'z5kLRgpEiDGYL4lhx'; // Reemplaza con tu user_id
const SERVICE_ID = 'service_9olg4ok'; // Reemplaza con tu service_id
const TEMPLATE_ID = 'template_hsl3vca'; // Reemplaza con tu template_id

app.post('/comprar', (req, res) => {
    const { producto, comprador } = req.body; // Suponiendo que envías el producto y el comprador

    const templateParams = {
        from_name: comprador,
        product_name: producto,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
        .then((response) => {
            res.status(200).send('Correo enviado: ' + response.text);
        })
        .catch((error) => {
            res.status(500).send(error.text);
        });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});