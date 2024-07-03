class apiSuccessResponse {
    constructor(statuCode, message = "success", data) {
        this.status = "success";
        this.statuCode = statuCode;
        this.message = message;
        this.data = data;
    }
}
export default apiSuccessResponse;