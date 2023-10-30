const { getUsers } = require("./user.service");

async function notificationNewBenefit(benefit) {
    try {
    const users = getUsers();
    users.forEach(user => {
      if (user.roles.name === "user") {
        /* Aqui va todo lo del correo*/
      }
    });
    } catch (error) {
      handleError(error, "benefit.service -> notificationNewBenefit");
    }
  }

module.exports = {
    notificationNewBenefit,
    };