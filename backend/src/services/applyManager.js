const _ = require('lodash');
const prisma = require('../lib/index')
const { appError} = require('../utils');
const { CONFLICT, INVALID_REQUEST_DATA } = require('../utils/errors');

const create = async (body, user, params) => {
    const { name, email, phone, message, experience, resume, coverLetter, previousStipend, previousCompany, skill, workHistory, status } = body;
    const { id } = user;
    const { jobId } = params;
    console.log(user)
    
    try {
         if (_.isEmpty(name) || _.isEmpty(email) || _.isEmpty(phone) || _.isEmpty(message) || 
            _.isEmpty(experience) || _.isEmpty(resume) || _.isEmpty(previousStipend) || 
            _.isEmpty(previousCompany) || _.isEmpty(skill) || !workHistory || workHistory.length === 0) {
            throw new Error("Please fill all the required fields");
        }

         const isExist = await prisma.application.findFirst({
            where: {
                userId: id,
                jobId: jobId
            }
        });

        if (isExist) {
            throw new appError(CONFLICT.code, "You have already applied for this job", CONFLICT.statusCode);
        }

         const setWorkData = await Promise.all(workHistory.map(async (work) => {
            const { companyName, designation, startDate, endDate, description } = work;
            
            if (_.isEmpty(companyName) || _.isEmpty(designation) || _.isEmpty(startDate) || 
                _.isEmpty(endDate) || _.isEmpty(description)) {
                throw new appError(INVALID_REQUEST_DATA.code, "Please fill all work history fields", INVALID_REQUEST_DATA.statusCode);
            }
            
            return await prisma.workHistory.create({
                data: {
                    userId: id,
                    jobId: Number(jobId),
                    companyName,
                    designation,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    description
                }
            });
        }));

        

         const applyData = {
            name,
            email,
            phone:Number(phone),
            message,
            experience:Number(experience),
            resume,
            coverLetter: coverLetter || null,  
            previousStipend: Number(previousStipend),
            previousCompany,
            skill,
            status: status || "applied",
            userId: id,
            jobId: Number(jobId),
            workHistory: {
                connect: setWorkData.map(work => ({ id: work.id }))
            }
        };

        const data = await prisma.application.create({
            data: applyData
        });
        
        return data;
    } catch (err) {
        throw err;
    }
};


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