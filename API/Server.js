const { request } = require('express');
const express = require('express')
const ejs = require('ejs')
const paypal = require('paypal-rest-sdk')
// const util = require('./utils')

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.SECRET_KEY
});

const app = express();
app.set('view engine', 'ejs')
const port = 8000

// app.get('/', (req, res) => {
//     res.send("Hello Paypal...")
// })

app.get('/', (req, res) => res.render('index'));

app.post('/pay', (req, res) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:8000/success",
            "cancel_url": "http://localhost:8000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "web service",
                    "sku": "001",
                    "price": "35.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "35.00"
            },
            "description": "World's best web services forcebolt."
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            // console.log("Create Payment Response");
            // console.log(payment);
            // res.send('Success')

            for(let i=0; i<payment?.links?.length; i++){
                if(payment.links[i]?.rel === 'approval_url'){
                    res.redirect(payment.links[i]?.href)
                }
            }
        }
    });
});

app.get('/success', (req, res) => {
    const playerId = req.query.PayerID
    const paymentId = req.query.paymentId

    const execute_payment_json = {
        "payer_id": playerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "35.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.send('Success')
        }
    });
})

app.get('/cancel', (req, res) => res.send('pay cancelled'))

// app.post('/invoice', (req, res) => {
//     paypal.invoiceTemplate.create(util.invoice_template_json(), function (error, invoice_template) {
//         if (error) {
//             throw error;
//         } else {
//             console.log("Create Invoice Template Response:");
//             console.log(invoice_template);
//             res.send("Invoice Generated...")
//         }
//     });
// })

app.listen(port, () => {
    console.log(`listening to the port ${port}`)
})