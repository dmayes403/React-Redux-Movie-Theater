module.exports = (req, res, next) => {
    if (!req.user.admin && !req.user.creator) {
        return res.status(401).send({ error: 'You must log in!' })
    }

    next();
};