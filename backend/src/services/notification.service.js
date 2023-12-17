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
                    //text: `Hola ${user.username}, desde hoy tienes disponible el nuevo beneficio ${benefit.name}`,
                    html:`<html>
                        <body>
                            <p>Hola ${user.username},<br> 
                            desde hoy tienes disponible el nuevo beneficio ${benefit.name}</p>
                        </body>
                        </html>`
                };
                /* Aqui va todo lo del correo*/
                sendautoMail(mailOptions);   
            }
        });
    } catch (error) {
        handleError(error, "notification.service -> notificationNewBenefit");
    }
}

async function notificationBenefit(benefit) {
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
                    //text: `Hola ${user.username}, desde hoy tienes disponible el nuevo beneficio ${benefit.name}`,
                    html:`<html>
                        <body>
                            <p>Hola ${user.username},<br> 
                            desde hoy tienes disponible el nuevo beneficio ${benefit.name}</p>
                        </body>
                        </html>`
                };
                /* Aqui va todo lo del correo*/
                sendautoMail(mailOptions);   
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
            //text: `Hola ${user.username}, tu solicitud de TARJETA VECINO ha cambiado al estado ${user.applicationStatus}`,
            html:`<html>
                <body>
                    <p>Hola ${user.username},<br> 
                    tu solicitud de TARJETA VECINO ha cambiado al estado ${user.applicationStatus}</p>
                </body>
                </html>`
        };
        /* Aqui va todo lo del correo*/
        sendAutoMail(mailOptions);
    } catch (error) {
        handleError(error, "notification.service -> notificationChangeStatus");
    }
}

module.exports = {
    notificationNewBenefit,
    notificationChangeStatus,
    };