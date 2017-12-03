
module.exports = function(req,res,next){

     var secureRoutes =function(params){
         var app = params.app;
         console.log("DASDAS"+app);
         next();
     }

    
    

}
