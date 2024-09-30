const jwt = require('jsonwebtoken');


// role base authorisition
const verifyToken = ([...role]) => {
    try {
        return (req, res, next) => {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(403).send({
                    message: 'Token not found',
                });
            }
            let user = jwt.verify(token, process.env.SECRET)
        
            if (!role.includes(user.user.role)) {
                return res.status(403).json({
                    message: "you are unauthorised"
                })
            }

            req.user = user;
            next();
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = { verifyToken }  