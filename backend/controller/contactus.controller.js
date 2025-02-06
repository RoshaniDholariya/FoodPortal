const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ContactUs= async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      const contactus = await prisma.contactus.create({
        data: {
          name,
          email,
          message,
        },
      });
  
      res.status(201).json({
        success:true,
        message: "form submitted successfully!",
        data : contactus
      });
    }
  
    catch(error){
  
      console.log("Error submitting form : ",error);
      res.status(500).json({
        success:false,
        message:"Internal server error"
      });
    }
  }
  
  module.exports =ContactUs;