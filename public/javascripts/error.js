/**
 * 对错误的统一处理
 * User: marshal marshal.wu@gmail.com
 * Date: 12-12-10
 * Time: 下午5:59
 */
(function (hotel) {
    hotel.errorHandlers={
        errors:new Backbone.Collection(),
        errorHandlers:{},
        addErrorHandler:function(errorHandler){
            if(errorHandler.type){
                this.errorHandlers[errorHandler.type]=errorHandler;
            }
        },
        defaultErrorHandler:{
            handler:function(error){
            }
        },
        init:function(){
            this.errors.on('add',function(error,collection){
                if(this.errorHandlers[error.type]){
                    this.errorHandlers[error.type].handler(error);
                }else{
                    this.defaultErrorHandler.handler(error);
                }
                collection.remove(error);
            });
        }
    };
})(hotel);