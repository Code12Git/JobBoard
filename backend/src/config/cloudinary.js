const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const {fromEnv} = require('../utils')
cloudinary.config({
	cloud_name: fromEnv('CLOUDINARY_CLOUD_NAME'),
	api_key: fromEnv('CLOUDINARY_API_KEY'),
	api_secret: fromEnv('CLOUDINARY_API_SECRET'),
});

const uploadOnCloudinary = async (localFilePath) => {
	try {
		if (!localFilePath) return null;
 		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: "auto",
		});
 
		fs.unlinkSync(localFilePath);
		return response;
	} catch (error) {
		fs.unlinkSync(localFilePath); 
		return null;
	}
};

module.exports = { uploadOnCloudinary };