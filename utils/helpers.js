const { User } = require("../models");

module.exports = {
    find_username: async (userId) => {
        try {
            const user = await User.findByPk(userId);
            const username = await user.toJSON().username;
            console.log(username);
            return username;
        } catch (e) {
            return e;
        }
    }
};