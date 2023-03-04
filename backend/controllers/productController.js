const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const { query } = require("express");
// create product
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
  req.body.user = req.user.id; // koi bhi product kisne banaya isko store karwa rhe hai idhar
  // hamne user karke ek field banaya database mai wo jab req se aaya tho usko excess kia req.body.user se or usmai khudh 
  // se value dali jo ki hamne store karwa li thi login ke time req.user.id mai
  const product = await Product.create(req.body);
  res.status(201).json({
      success:true,
      product
  })
});

// get all product
exports.getAllProducts = catchAsyncErrors(async (req,res)=>{
  // call apifeatures function give 2 parameters 1st is querey 2nd is keyword
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apifeatures = new ApiFeatures(Product.find(),req.query)
  .search() // for searching
  .filter() // for filtering
  .pagination(resultPerPage); // for pagination
  const products = await apifeatures.query; 
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
    product,
    productCount
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
