// for seraching 
class ApiFeatures{
   constructor(query,querystr){
       this.query = query;
       this.querystr = querystr;
   }
   // for seraching
   search(){
    // take keyword for search
    const keyword = this.querystr.keyword? { // if there is a key word 
        name:{
            $regex: this.querystr.keyword, // sirf main content ko hi na dundhe aage piche ka bhi dekhe uske lie
            $options: "i",  // search fun is case insenstive for this we write this code
        }
    } // if there is no keyword return empty
     : {};

    //  console.log(keyword);
    // finding using keyword
     this.query = this.query.find({...keyword});
     return this;
     
   }

   // for filtering by category
   filter(){
      const queryCopy = {...this.querystr};
      //   console.log(queryCopy);
      // removing fields from category
      const removeFields = ["keyword","page","limit"];
      // removing fields
      removeFields.forEach((key) => delete queryCopy[key]);

      // filter for rating & price
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g , key => `$${key}`);
      //   console.log(queryCopy);
     // fiding in database
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
      // this filter feature is case senstive but we will handel it in frontend
   }

};

module.exports = ApiFeatures;