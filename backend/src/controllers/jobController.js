const {responseManager, jobManager} = require('../services')

const create = async(request,response) => {
    try{
        const result = await jobManager.create(request.user,request.body,request.file)
        return responseManager.sendSuccessResponse(response,result,'Job created successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error in creating job ')
    }
}

const update = async(request ,response ) => {
    try{
        const result = await jobManager.update(request.params,request.body,request.user)
        return responseManager.sendSuccessResponse(response,result,'Job Updated successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error updating job')
    }
}

const deleteOne = async(request ,response ) => {
    try{
        const result = await jobManager.deleteOne(request.params)
        return responseManager.sendSuccessResponse(response,result,'Job Deleted Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error deleting job')
    }
}

const get = async(request ,response ) => {
    try{
        const result = await jobManager.get(request.params)
        return responseManager.sendSuccessResponse(response,result,'Job fetched Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error fetching job')
    }
}

const getAll = async(request ,response ) => {
    try{
        const result = await jobManager.getAll()
        return responseManager.sendSuccessResponse(response,result,'Jobs fetched Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error fetching job')
    }
}

module.exports = { create,update ,deleteOne,get,getAll}