const {
  INVALID_REQUEST_DATA,
  CONFLICT,
  NOT_FOUND,
} = require("../utils/errors");
const { appError } = require("../utils");
const _ = require("lodash");
const prisma = require("../lib");
const { uploadOnCloudinary } = require("../config/cloudinary");

const create = async (user, body,file) => {
  const { id } = user;
  const {
    title,
    description,
    companyImg,
    employementType,
    stipend = 0,
    location,
    jobType,
    contact,
    companyName,
    url,
  } = body;
  try {
    if (
      _.isEmpty(title) ||
      _.isEmpty(description) ||
      _.isEmpty(location) ||
      _.isEmpty(jobType) ||
      _.isEmpty(contact) ||
      _.isEmpty(employementType) ||
      _.isEmpty(companyName)
    ) {
      throw new appError(
        INVALID_REQUEST_DATA.code,
        "All fields are necessary",
        INVALID_REQUEST_DATA.statusCode
      );
    }

    const existingJob = await prisma.job.findFirst({
      where: {
        companyName,
        title,
      },
    });

    if (existingJob) {
      throw new appError(
        CONFLICT.code,
        "A job with this title already exists for this company",
        CONFLICT.statusCode
      );
    }

    console.log("Exising job:",existingJob)

    let imgUrl = "";   

    if (file && file.path) {
      try {
        imgUrl = await uploadOnCloudinary(file.path);
        console.log("Uploaded Image URL:", imgUrl);
      } catch (err) {
        console.error("Cloudinary upload failed:", err);
        throw new appError(
          UPLOAD_ERROR.code,
          "Image upload failed",
          UPLOAD_ERROR.statusCode
        );
      }
    }


    
    console.log("Final Image URL:", imgUrl);  
    
    
       

    const newJob = await prisma.job.create({
      data: {
        title,
        description,
        companyImg:imgUrl || null,
        stipend,
        employementType,
        location,
        jobType,
        companyName,
        contact,
        url,
        postedBy: id,
      },
      include:{
        user:{select:{name:true}}
      }
    });

    return {
      ...newJob,
      postedBy: newJob.user.name,
    };
  } catch (err) {
    throw err;
  }
};

const update = async (params, body) => {
  const {
    title,
    description,
    companyImg,
    stipend,
    location,
    jobType,
    contact,
    companyName,
    employementType,
    url,
  } = body;
  const { id } = params;

  try {
    if (!id || isNaN(id)) {
      throw new appError(400, "Invalid job ID", 400);
    }

    const jobId = Number(id);

    if (
      _.isEmpty(title) ||
      _.isEmpty(description) ||
      _.isEmpty(location) ||
      _.isEmpty(jobType) ||
      _.isEmpty(contact) ||
      _.isEmpty(employementType) ||
      _.isEmpty(companyName)
    ) {
      throw new appError(
        INVALID_REQUEST_DATA.code,
        "All fields are necessary",
        INVALID_REQUEST_DATA.statusCode
      );
    }

    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!existingJob) {
      throw new appError(CONFLICT.code, "Job not found", CONFLICT.statusCode);
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        title,
        description,
        companyImg,
        stipend,
        location,
        jobType,
        companyName,
        employementType,
        contact,
        url,
        updatedAt: new Date(),
      },
    });

    return updatedJob;
  } catch (err) {
    throw err;
  }
};

const deleteOne = async (params) => {
  const { id } = params;
  const jobId = Number(id);

  try {
    if (!id || isNaN(jobId)) {
      throw new appError(400, "Invalid job ID", 400);
    }

    const jobExist = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!jobExist) {
      throw new appError(NOT_FOUND.code, "Job not found", NOT_FOUND.statusCode);
    }

    const deletedJob = await prisma.job.delete({
      where: { id: jobId },
    });

    return deletedJob;
  } catch (err) {
    throw err;
  }
};

const get = async (params) => {
  const { id } = params;
  const jobId = Number(id);

  try {
    if (!id || isNaN(jobId)) {
      throw new appError(
        NOT_FOUND.code,
        "Invalid job ID",
        NOT_FOUND.statusCode
      );
    }

    const jobExist = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!jobExist) {
      throw new appError(NOT_FOUND.code, "Job not found", NOT_FOUND.statusCode);
    }

    return jobExist;
  } catch (err) {
    throw err;
  }
};

const getAll = async (params) => {
  try {
    const job = await prisma.job.findMany();
    if (!job) {
      throw new appError(NOT_FOUND.code, "Job not exist", NOT_FOUND.statusCode);
    }
    return job;
  } catch (err) {
    throw err;
  }
};

const apply = async() => {
  
}

module.exports = { create, update, deleteOne, get, getAll };
