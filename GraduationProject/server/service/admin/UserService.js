const UserModel = require("../../models/UserModel")

const UserService = {
    login:async (account, password)=>{
        return UserModel.find(
            account,
            password
        )
    }
}



module.exports = UserService