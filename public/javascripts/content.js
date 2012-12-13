/**
 * 内容管理
 * User: marshal marshal.wu@gmail.com
 * Date: 12-12-10
 * Time: 下午3:23
 */
(function (hotel) {

    hotel.commands.content=function(param1,param2,param3){
        console.log('load content, param1:'+param1+' ,param2: '+param2+' ,param3:'+param3);
        new ContentView().render().$el.appendTo(hotel.contentEl);
    };

    var ContentView=Backbone.View.extend({
        render:function(){
            var template = Handlebars.compile($('#content_template').html());
            $(template()).appendTo(this.$el);
            return this;
        }
    });

})(hotel);