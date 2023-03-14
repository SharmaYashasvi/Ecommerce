const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const { query } = require("express");


// create product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
//   req.body.user = req.user.id; // koi bhi product kisne banaya isko store karwa rhe hai idhar
//   // hamne user karke ek field banaya database mai wo jab req se aaya tho usko excess kia req.body.user se or usmai khudh 
//   // se value dali jo ki hamne store karwa li thi login ke time req.user.id mai
//   const product = await Product.create(req.body);
//   res.status(201).json({
//       success:true,
//       product
//   })
// });

// get all product

// exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
//   const resultPerPage = 8;
//   const productsCount = await Product.countDocuments();

//   const apiFeature = new ApiFeatures(Product.find(), req.query)
//     .search()
//     .filter();

//   let products = await apiFeature.query;

//   let filteredProductsCount = products.length;

//   apiFeature.pagination(resultPerPage);

//   products = await apiFeature.query;

//   res.status(200).json({
//     success: true,
//     products,
//     productsCount,
//     resultPerPage,
//     filteredProductsCount,
//   });
// });

exports.getAllProducts = catchAsyncErrors(async (req,res,next)=>{
  // call apifeatures function give 2 parameters 1st is querey 2nd is keyword
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  const apifeatures = new ApiFeatures(Product.find(),req.query)
  .search() // for searching
  .filter() // for filtering
  .pagination(resultPerPage);
  const products = await apifeatures.query;
  res.status(200).json({
      success:true,
      products,
      productsCount,
      resultPerPage,
      // filteredProductsCount
  });
});

//get all products for admin
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
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
    // productCount
  })
})

// update product -- admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// exports.updateProduct = catchAsyncErrors(async (req,res,next)=>{
//   let product = await Product.findById(req.params.id);
  
//   // if(!product){
//   //   return res.status(500).json({
//   //       succes:false,
//   //       messasge:"product not found"
//   //   })
//   // }

//   // error handling
//   if(!product){
//     return next(new ErrorHandler("product not found",404));
//   }

//   product = await Product.findByIdAndUpdate(req.params.id,req.body,{
//     new:true,
//     runValidators:true,
//     useFindAndModify:false
//   });

//   res.status(200).json({
//     success:true,
//     product
//   })
// });

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

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  
 // remove the product
  await product.remove();

  // send respond 
  res.status(200).json({
    success:true,
    messasge:"Product delete successfully"
  })

});

 // create product review
 exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{
  const {rating , comment , productId} = req.body;  // get values of rating comment and productId from body

  const review = {  // creating review
    user:req.user._id,  // giving id 
    name:req.user.name,  // name
    rating: Number(rating), // rating
    comment // comment
  }

  const product = await Product.findById(productId); // finding product exixts or not 

  if(!product){ // if not found
    return next(new ErrorHandler(`Product not found with id ${productId}`,404))
  }
   
  // found but already reviewed by any user then only update it
  const isReviewed = product.reviews.find((rev)=> rev.user.toString() === req.user._id.toString()); // checking if user already review it
  if(isReviewed){ // if yes
    product.reviews.forEach((rev)=>{  //check and find it 
      if(rev.user.toString() === req.user._id.toString()) 
      (rev.rating=rating),(rev.comment = comment); // update rating or comment but no. of reviews are same
    })
  }
  else{  //if no
     product.reviews.push(review); // push new review in reviews model
     product.numOfReviews = product.reviews.length; // and update no. of reviews 
  }

  let avg = 0;
   product.reviews.forEach((rev)=>{ // calculate the avg
     avg += rev.rating;
   });

    product.ratings = avg / product.reviews.length;
    // save all stuff
   await product.save({
    validateBeforeSave:false
   })

   res.status(200).json({
    success:true
   })
 })

// get all product reviews
exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{
        const product = await Product.findById(req.query.id);

        if(!product){
          return next(new ErrorHandler("product not found",404)); 
        }

        res.status(200).json({
           success:true,
           reviews:product.reviews
        })
});

// delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});