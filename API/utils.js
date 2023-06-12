/* Copyright 2015-2016 PayPal, Inc. */

function _random_id() {
    return Math.random().toString(36).substring(10);
}

const invoice_template_json = () => {
    console.log("Run_1")
    return {
        "name": "Hours Template_" + _random_id(),
        "default": true,
        "unit_of_measure": "HOURS",
        "template_data": {
            "items": [{
                "name": "Force Web Service",
                "quantity": 1,
                "unit_price": {
                    "currency": "USD",
                    "value": "35.00"
                }
            }],
            "merchant_info": {
                "email": "sb-4r9pm23657761@business.example.com"
            },
            "tax_calculated_after_discount": false,
            "tax_inclusive": false,
            "note": "Thank you for your business.",
            // "logo_url": "https://pics.paypal.com/v1/images/redDot.jpeg"
            "logo_url": "https://img.logoipsum.com/289.svg"
        },
        "SETTINGS": [
            {
                "FIELD_NAME": "ITEMS.DATE",
                "DISPLAY_PREFERENCE": {
                    "HIDDEN": true
                }
            },
            {
                "FIELD_NAME": "CUSTOM",
                "DISPLAY_PREFERENCE": {
                    "HIDDEN": true
                }
            }
        ]
    };
}

module.exports = { invoice_template_json }
