//在公共的js 文件中,,写公共的js代码
$(function(){

	//1.每个页面都会发送请求,所以在公共的文件中,监听ajax请求

	//配置禁用小圆环
	NProgress.configure({
		showSpinner:false
	})
	//ajax的全局事件,给页面注册
	$(document).ajaxStart(function(){
		//开始发送ajax请求时,开启进度条
		NProgress.start();
	})

	$(document).ajaxStop(function(){
		setTimeout(function(){
			//ajax请求结束,结束进度条
			NProgress.done();
		},2000)
	})
})