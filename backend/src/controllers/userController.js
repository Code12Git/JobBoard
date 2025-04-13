const {responseManager,userManager} = require('../services')


const getAll = async(req,res) => {
    try{
        const result = await userManager.getAll()
        return responseManager.sendSuccessResponse(res,result,'User Fetched Successfully')
    }catch(err){
        return responseManager.sendErrorResponse(res,err,'Error Fetching users details')
    }
}

module.exports = {getAll}