app.post('/comprar', (req, res) => {
    const { buyerName, buyerPhone, buyerEmail, items } = req.body;

    const itemDescriptions = items.map(item => `${item.quantity} x ${item.name} (Talle: ${item.talle})`).join(', ');

    const mailOptions = {
        from: 'saasari80@gmail.com',
        to: 'demabri@gmail.com', // Correo del dueño de la página
        subject: 'Nueva compra',
        text: `Se ha realizado una nueva compra por ${buyerName}.\n\nDetalles:\nTeléfono: ${buyerPhone}\nEmail: ${buyerEmail}\nProductos: ${itemDescriptions}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Correo enviado: ' + info.response);
    });
});
