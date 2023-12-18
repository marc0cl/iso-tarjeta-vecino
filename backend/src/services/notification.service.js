const { handleError } = require("../utils/errorHandler.js");
const User = require("../models/user.model.js");
const { sendAutoMail } = require("../controllers/notification.controller.js");

async function notificationNewBenefit(benefit) {
    try {
        const users = await User.find()
        .select("-password")
        .populate("roles")
        .exec();
        users.forEach(user => {
            if (user.roles[0].name === "user") {
                const mailOptions = {
                    from: `Tarjeta Vecino`,
                    to: user.email,
                    subject: "Nuevo beneficio",
                    html:`<html>
                        <body>
                            <p>Hola ${user.firstName} ${user.lastName},<br> 
                            desde hoy tienes disponible el nuevo beneficio ${benefit.name}</p>
                        </body>
                        </html>`
                };
                sendAutoMail(mailOptions);   
            }
        });
    } catch (error) {
        handleError(error, "notification.service -> notificationNewBenefit");
    }
}

async function notificationChangeStatus(user) {
    try {
        const mailOptions = {
            from: `Tarjeta Vecino`,
            to: user.email,
            subject: "Cambio en estado de tramite",
            html:`<html>
                <body>
                    <p>Hola ${user.firstName} ${user.lastName},<br> 
                    tu solicitud de TARJETA VECINO ha cambiado al estado ${user.applicationStatus}</p>
                </body>
                </html>`
        };
        sendAutoMail(mailOptions);
    } catch (error) {
        handleError(error, "notification.service -> notificationChangeStatus");
    }
}

async function notificationNewUser(user) {
    try {
        const mailOptions = {
            from: `Tarjeta Vecino`,
            to: user.email,
            subject: "Bienvedido a Tarjeta Vecino",
            html:`<html>
                <body>
                    <p>Hola ${user.firstName} ${user.lastName}.<br> 
                    Queremos darte la bienvenida al portal TARJETA VECINO!<br> 
                    Puedes consultar los beneficios dispononibles en nuestra web.</p>
                </body>
                </html>`
        };
        sendAutoMail(mailOptions);
    } catch (error) {
        handleError(error, "notification.service -> notificationChangeStatus");
    }
}

module.exports = {
    notificationNewBenefit,
    notificationChangeStatus,
    notificationNewUser
    };