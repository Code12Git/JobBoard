const { responseManager } = require("../services")
const { applyManager } = require("../services")
const create = async(request,response) => {
    try{
        const result = await applyManager.create(request.body,request.user,request.params);
        return responseManager.sendSuccessResponse(response, result, 'Application created successfully');
    }catch(err){
        return responseManager.sendErrorResponse(response, err,'Error in creating application');
    }
}

const deleteApplication = async(request,response) => {
    try{
        const result = await applyManager.deleteApplication(request.params);
        return responseManager.sendSuccessResponse(response, result, 'Application deleted successfully');
    }catch(err){
        return responseManager.sendErrorResponse(response, err,'Error in deleting application');
    }
}

const getApplication = async(request,response) => {
    try{
        const result = await applyManager.getApplication(request.params);
        return responseManager.sendSuccessResponse(response, result, 'Application fetched successfully');
    }catch(err){
        return responseManager.sendErrorResponse(response, err,'Error in fetching application');
    }
}
const getAllApplications = async(request,response) => {
    try{
        const result = await applyManager.getAllApplications(request.params);
        return responseManager.sendSuccessResponse(response, result, 'Applications fetched successfully');
    }catch(err){
        return responseManager.sendErrorResponse(response, err,'Error in fetching applications');
    }
}

module.exports = {
    create,
    deleteApplication,
    getApplication,
    getAllApplications
}