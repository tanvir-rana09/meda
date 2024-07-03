import apiErrorResponse from "../utils/apiErrorResponse";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    const details = err.details || null;

    // check if the error is an instance of apiErrorResponse
    if (err instanceof apiErrorResponse) {
        return res.status(statusCode).json({
            status: err.status,
            message,
            details,
        });
    }

    // log the error stack in the development mode
    if (process.env.NODE_ENV === "development") {
        console.error(err.stack);
    }

    // default to internal server error if no specefic status code is provided
    res.status(statusCode).json(
        new apiErrorResponse(statusCode, message, details)
    );
};

export default errorHandler
