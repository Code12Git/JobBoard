const prisma = require('../lib')
const appError = require('../utils')
const { NOT_FOUND } = require('../utils/errors')

const getAll = async() => {
    try{
        const user = await prisma.user.findMany()
         if(!user) throw new appError({...NOT_FOUND,message:'No user exists'})
         return user;   
    }catch(err){
        throw err;
    }
}


module.exports = {getAll}