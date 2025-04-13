const _ = require('lodash');
const prisma = require('../lib/index')
const { appError} = require('../utils');
const { CONFLICT } = require('../utils/errors');

const create = async(body,user,params) => {
    const {name, email, phone, message,experience,resume,coverLetter,previousStipend,previousCompany,skill,workHistory,status} = body;
    const {id} = user;
    const {jobId} = params;
    try{
        if(_.isEmpty(name) || _.isEmpty(email) || _.isEmpty(phone) || _.isEmpty(message) || _.isEmpty(experience) || _.isEmpty(resume)  || _.isEmpty(previousStipend) || _.isEmpty(previousCompany) || _.isEmpty(skill) || _.isEmpty(workHistory)){
            throw new Error("Please fill all the fields");
        }

        const isExist = await prisma.application.findFirst({
            where:{
                userId: id,
                jobId: jobId
            }
        })

        if(isExist){
            throw new appError(CONFLICT.code, "You have already applied for this job", CONFLICT.statusCode);
        }
        const applyData = {
            name,
            email,
            phone,
            message,
            experience,
            resume,
            coverLetter,
            previousStipend,
            previousCompany,
            skill,
            workHistory,
            status:status || "applied"
        }
        const data = await prisma.application.create({data:applyData})        
        return data;
    }catch(err){
        throw err;
    }
}


const deleteApplication = async (params) => {
    const {id} = params;
    try{
        const data = await prisma.application.delete({
            where:{
                id
            }
        })
        return data;
    }catch(err){
        throw err;
    }
}

const getApplication = async (params) => {
    const {id} = params;
    try{
        const data = await prisma.application.findUnique({
            where:{
                id
            }
        })
        if(!data){
            throw new appError(CONFLICT.code, "No application found", CONFLICT.statusCode);
        }
        return data;
    }catch(err){
        throw err;
    }
}

const getAllApplications = async (params) => {
    const {id} = params;
    try{
        const data = await prisma.application.findMany({
            where:{
                jobId: id
            }
        })
        if(!data || data.length === 0){
            throw new appError(CONFLICT.code, "No applications found", CONFLICT.statusCode);
        }
        return data;
    }catch(err){
        throw err;
    }
}

module.exports = {create,deleteApplication,getApplication,getAllApplications}