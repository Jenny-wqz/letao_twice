//初始化表单校验
var $form = $('#form');

$form.bootstrapValidator({
  //指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  //对表单内容进行校验
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
        // ajax请求结束时调用的回调函数
        callback:{
          message:'用户名不存在!'
        }
        
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
        // ajax请求结束时调用的回调函数
        callback:{
          message:'密码错误!'
        }
        
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
        //获取到后台的响应后,进行校验
    		if (res.error === 1000) {
    			// console.log('用户名不存在!')

          // 判断用户名是否存在,如果不存在,更新表单校验的状态,调用updateStatus方法,里面有三个参数,
          // 更新的字段\更新的状态\更新的值,在这里以一个回调函数的形式
          $form.data('bootstrapValidator').updateStatus('username', 'INVALID','callback');
    		}else if (res.error === 1001){
    			// console.log('密码错误!')
          $form.data('bootstrapValidator').updateStatus('password', 'INVALID','callback');

    		}else if(res.success === true){
    			// console.log('登陆成功!')
    			location.href = "index.html";
    		}
    	}
    })
});

//重置表单
$('[type="reset"]').on('click',function(){

  $form.data('bootstrapValidator').resetForm(true);
  
})