const jsonwebtoken = require("jsonwebtoken")
const secret = "Hoshino"

const JWT = {
    generate(value, expires) {
        return jsonwebtoken.sign(value, secret, {expiresIn:expires})
    },
    verify(token) {
        try {
            return jsonwebtoken.verify(token, secret)
        } catch (e) {
            return false
        }
    }
}

// setTimeout(() => {
//     console.log(JWT.verify(token))
// }, 11000);
module.exports = JWT;