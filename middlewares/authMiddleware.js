const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization

    if(!authorization || !authorization.startsWith("Bearer ")){
        res.status(401).send({message: "Unauthorized"})
        return
    }

    next()
}

module.exports = authMiddleware