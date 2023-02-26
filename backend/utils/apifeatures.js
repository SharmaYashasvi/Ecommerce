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
            $regex: this.querystr.keyword,
            $options: "i",
        }
    } // if there is no keyword return empty
     : {};

    //  console.log(keyword);
    // finding using keyword
     this.query = this.query.find({...keyword});
     return this;
   }
};

module.exports = ApiFeatures;