//初始化表单校验
var $form = $('#form');

$form.bootstrapValidator({
	fields: {
    //校验用户名，对应name表单的name属性
    username: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
        //长度校验
        stringLength: {
          min: 3,
          max: 9,
          message: '用户名长度必须在3到9之间'
        },
        
      }
    },
    password: {
      validators: {
        //不能为空
        notEmpty: {
          message: '密码不能为空'
        },
        //长度校验
        stringLength: {
          min: 6,
          max: 12,
          message: '密码长度必须在6到12之间'
        },
        
      }
    }
  }
})

//当表单校验成功后,点击登陆按钮,会自动发送get请求,我们需要阻止表单提交 

$form.on('success.form.bv', function (e) {
    e.preventDefault();
    
    // console.log('校验成功');
    //阻止表单提交后,发送ajax请求
    $.ajax({
    	url:'/employee/employeeLogin',
    	type:'post',
    	data:$form.serialize(),
    	success:function(res){
    		// console.log(res);
    		if (res.error === 1000) {
    			console.log('用户名不存在!')
    		}else if (res.error === 1001){
    			console.log('密码错误!')
    		}else if(res.success === true){
    			// console.log('登陆成功!')
    			location.href = "index.html";
    		}
    	}
    })
});