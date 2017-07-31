var express = require('express')
var app = express()
var io = require('socket.io');
var bodyParser = require('body-parser')
var fs = require('fs');


app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
app.get('/123', function(req, res) {
	res.status(200),
		res.json({
			a: 3
		})
});


var users = require('./user').items;
var findUser = function(name, password) {
	var ret;
	users.forEach(function(user) {
		if (name == user.name && password == user.password) {
			ret = user.name
			return
		}

	})
	return ret
}



app.post('/login', function(req, res, next) {
	var user = findUser(req.body.username, req.body.pass);
	if (user) {
		 res.json({
                code: 0,
                msg: '登录成功',
                nickname:user,
                token:user+'token'
            });
	}else{
		res.json({
            code: 1,
            msg: '账号或密码错误'
        });
	}
	
})


//配置服务端口
var server = app.listen(3000, function() {


	var host = server.address().address;

	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
})


var socket = io.listen(server, {
	origins: '*:*'
});

socket.on('connection', function(socket) {
	//接收并处理客户端的hi事件

	socket.emit('a', 'helladfasasdao')
	socket.on('join',function(data){
		console.log('join')
		socket.broadcast.emit('hi', data+'上线了,大家快喷他!')
	});
	socket.on('sendmsg',function(name,msg){
		console.log(name,msg)
		socket.broadcast.emit('recivemsg',name, msg,'left')
		socket.emit('minerecivemsg',name, msg,'right')
	})

	//断开事件
	socket.on('disconnect', function(data) {
		console.log('断开', data)
		socket.emit('c_leave', '离开');
		//socket.broadcast用于向整个网络广播(除自己之外)
		//socket.broadcast.emit('c_leave','某某人离开了')
	})

});