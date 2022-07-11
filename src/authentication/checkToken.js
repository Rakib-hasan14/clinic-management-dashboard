const { verify } = require('jsonwebtoken');
const { errorHandler } = require('../helpers/apiResponse');


module.exports.checkToken = async (req, res, next) => {
    try {
        var token = req.get('authorization');

        if (!token) {
            return res.status(401).json({
                status: false,
                message: 'Access denied! unauthorized Admin',
            });
        }

        token = token.slice(7);

        const { userId } = verify(token, process.env.JWT_PRIVATE_KEY);

        if (!userId) {
            return res.status(403).json({
                status: false,
                message: 'Invalid22 token',
            });
        }

        const user = await require('../models/UserModel').findOne({
            _id: userId,
        });

        if (!user) {
            return res.status(403).json({
                status: false,
                error: 'Invalid1 token',
            });
        }

        req.userId = userId;
        req.requestId = userId;

        next();
    } catch (err) {
        return res.status(403).json({
            status: false,
            message: 'Invalid token',
        });
    }
};