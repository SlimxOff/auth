const ApiErrors = require('../exception/api-error')
const tokenService = require('../service/token-service')

module.exports = function (req,res,next){
    try {
        const authorisationHeader = req.headers.authorization
        if(!authorisationHeader){
            return next(ApiErrors.UnauthorizedError())
        }

        const accessToken = authorisationHeader.split(' ')[1]
        if(!accessToken){
            return next(ApiErrors.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData){
            return next(ApiErrors.UnauthorizedError())
        }

        req.user = userData
        next()
    }
    catch (e){
        return next(ApiErrors.UnauthorizedError())
    }
}