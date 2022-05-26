const { validationResult } = require('express-validator')
class HttpUtilsHandler {
    validateFields(request, response, next) {
        const errors = validationResult(request)

        if (!errors.isEmpty()) {
            return response.status(400).json({
                status: false,
                errors: errors.mapped()
            })
        }

        next()
    }

    sendBasicJsonResponse(res, status, message) {
        return res.status(status).json({
            message: message,
        })
    }
}

module.exports = HttpUtilsHandler