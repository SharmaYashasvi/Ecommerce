const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// create product
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.create(req.body);
  res.status(201).json({
      success:true,
      product
  })
});

// get all product
exports.getAllProducts = catchAsyncErrors(async (req,res)=>{
  const products = await Product.find();
  res.status(200).json({
      success:true,
      products
  });
});

// get a single productDetails
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);

  // if product not found
  // if(!product){
  //     res.status(500).json({
  //       success:false,
  //       messasge:"product not found"
  //     })
  // }

  // error handling
  if(!product){
    return next(new ErrorHandler("product not found",404));
  }
   // send respond 
   res.status(200).json({
    success:true,
    product
  })
})

// update product -- admin
exports.updateProduct = catchAsyncErrors(async (req,res,next)=>{
  let product = await Product.findById(req.params.id);
  
  // if(!product){
  //   return res.status(500).json({
  //       succes:false,
  //       messasge:"product not found"
  //   })
  // }

  // error handling
  if(!product){
    return next(new ErrorHandler("product not found",404));
  }

  product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });

  res.status(200).json({
    success:true,
    product
  })
});

// delete product
exports.deleteProduct = catchAsyncErrors(async (req,res,next)=>{
  const product = await Product.findById(req.params.id);

  // if product not found
  // if(!product){
  //     res.status(500).json({
  //       success:false,
  //       messasge:"product not found"
  //     })
  // }
  
  if(!product){
    return next(new ErrorHandler("product not found",404));
  }

  
 // remove the product
  await product.remove();

  // send respond 
  res.status(200).json({
    success:true,
    messasge:"Product delete successfully"
  })

});
