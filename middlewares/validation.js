import validationModels from '../models/validationModels.js';


// for better organization (DRY)

const validateSchemaMiddleware = (schema) => (req, res, next) => {
  const validation = schema(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.error.details[0].message });
  }
  next();
};

module.exports = {
  login: validateSchemaMiddleware(validationModels.loginSchema),
  register: validateSchemaMiddleware(validationModels.registerSchema),
  reset: validateSchemaMiddleware(validationModels.resetSchema),
  address: validateSchemaMiddleware(validationModels.addressSchema),
  product: validateSchemaMiddleware(validationModels.productSchema),
  // ... other middleware
};

// module.exports = {
//   login:  (req, res, next) =>{
//     let validation = validationModels.loginSchema(req.body); 
//     if(!validation.isValid){
//       return res.status(400).json({message : validation.error.details[0].message}); 
//     }
//     next(); 
//   },
//   register : (req, res, next) => {
//    let validation = validationModels.registerSchema(req.body); 
//    if(!validation.isValid){
//     return res.status(400).json({message : validation.error.details[0].message});
//    }
//    next(); 
//   },
//   reset: (req,res,next) => {
//     //validation
//     let validation = validationModels.resetSchema(req.body);
//     if(!validation.isValid){
//       return res.status(400).json({message : validation.error.details[0].message});
//     };
//     next(); 
//   },
//   address: (req,res,next) => {
//     //validation
//     let validation = validationModels.addressSchema(req.body);
//     if(!validation.isValid){
//       return res.status(400).json({message : validation.error.details[0].message});
//     };
//     next();
//   },
//   product: (req,res,next) =>{
//     let validation = validationModels.productSchema(req.body);
//     if(!validation.isValid){
//       return res.status(400).json({message : validation.error.details[0].message});
//     }
//     next();
//   }

// }



