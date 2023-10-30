const { getUsers } = require("./user.service");

async function notificationNewBenefit(benefit) {
    try {
        const users = getUsers();
        users.forEach(user => {
            if (user.roles.name === "user") {
                const mailOptions = {
                    to_name: user.firstName,
                    to_mail: user.email,
                    subject: "Nuevo beneficio",
                    message: `Hola ${user.firstName} ${user.lastName}, desde hoy tienes disponible el nuevo beneficio ${benefit.name}`,
                };
                /* Aqui va todo lo del correo*/
            }
        });
    } catch (error) {
        handleError(error, "notification.service -> notificationNewBenefit");
    }
}

async function notificationChangeStatus(user) {
    try {
        const mailOptions = {
            to_name: user.firstName,
            to_mail: user.email,
            subject: "Estado de la solicitud",
            message: `Hola ${user.firstName} ${user.lastName}, tu solicitud ha cambiado al estado ${user.applicationStatus}`,
        };
        /* Aqui va todo lo del correo*/
    } catch (error) {
        handleError(error, "notification.service -> notificationChangeStatus");
    }
}

module.exports = {
    notificationNewBenefit,
    notificationChangeStatus,
    };