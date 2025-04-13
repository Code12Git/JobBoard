const { responseManager, authManager } = require("../services");

const get = async (request, response) => {
  try {
    const result = await authManager.getUser();
    return responseManager.sendSuccessResponse(
      response,
      result,
      "User fetched successfully"
    );
  } catch (err) {
    return responseManager.sendErrorResponse(
      response,
      err,
      "User can't be fetched"
    );
  }
};


const create = async (request, response) => {
  try {
    const result = await authManager.createUser(request.body);
    return responseManager.sendSuccessResponse(
      response,
      result,
      "User created successfully!"
    );
  } catch (err) {
    return responseManager.sendErrorResponse(
      response,
      err,
      "User not created successfully!"
    );
  }
};

const update = async (request, response) => {
  try {
    const result = await authManager.updateRole(request.body,request.user);
    return responseManager.sendSuccessResponse(
      response,
      result,
      "Role updated successfully!"
    );
  } catch (err) {
    return responseManager.sendErrorResponse(
      response,
      err,
      "Role not updated successfully!"
    );
  }
}

const adminLogin = async (request, response) => {
  try{
    const result = await authManager.adminLogin(request.body);
    return responseManager.sendSuccessResponse(response,result,'Admin Login Successful');
  }catch(err){
    return responseManager.sendErrorResponse(response,err,"Admin Details not found");
  }
}

module.exports = { get, create, update,adminLogin };
