/**
 * 认证和授权
 * User: marshal marshal.wu@gmail.com
 * Date: 12-12-10
 * Time: 上午10:02
 */
(function (hotel) {
    var LoginView = Backbone.View.extend({
        count:0,
        render:function () {
            var template = Handlebars.compile($('#login_template').html());//TODO 改为ajax同步加载
            $(template()).appendTo(this.$el);
            return this;
        },
        events:{
            'click':'login'
        },
        login:function () {
            console.log('click login button');
            var view = this;
            hotel.auth.userName = "张三";
            this.count++;

            var socket = io.connect("?userName=" + hotel.auth.userName + this.count,{'force new connection':true});

            socket.on('disconnect', function () {
                console.log('socket disconnect');
            });

            socket.on('error', function () {
                console.log('socket io error');
            });

            socket.on('connect', function () {
                console.log('login ok.');
                view.forward();
            });
        },
        forward:function () {
            var anchor = location.href.split('#')[1];
            anchor = anchor || '';
            var command = anchor.split('/')[0];
            var params = anchor.substring(command.length + 1);
            hotel.router.doCommand(command, params);
        }
    });

    hotel.auth = {
        isLogin:function () {
            return this.userName != null;
        },
        hasAuth:function (command) {
            return true;
        },
        showLoginView:function () {
            new LoginView().render().$el.appendTo(hotel.contentEl);
        }
    };

    console.log('auth component loaded');
})(hotel);