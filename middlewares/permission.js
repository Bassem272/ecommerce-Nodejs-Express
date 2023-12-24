module.exports = {
    admin: (req, res, next) => {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.status(401).json({
                error: 'Unauthorized admin'
            });
        }
        // continue to the next middleware
    },
    user: (req, res, next) => {
        if (req.user.role === 'user') {
            next();
        }else{
            res.status(401).json({
                error: 'Unauthorized user'
            });
            }
        }
}