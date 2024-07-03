class apiErrorResponse {
    constructor(statusCode, message, details = null) {
        this.status = "error";
        this.statusCode = statusCode;
        this.message = message;
        this.details = details;
    }
}

export default apiErrorResponse;