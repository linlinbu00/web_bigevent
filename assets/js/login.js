$(function () {
  $('#link_reg').click(() => {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  $('#link_login').click(() => {
    $('.login-box').show();
    $('.reg-box').hide();
  });
  // 从 LayUI 中获取 form 对象
  const form = layui.form;
  const layer = layui.layer;
  // 通过 form.verify() 方法自定义校验规则
  form.verify({
    // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: (value) => {
      const pwd = $('#form_reg [name=password]').val();
      if (pwd !== value) return '两次密码不一致';
    },
  });
  // 设置baseUrl
  // 注册功能
  $('#form_reg').on('submit', (e) => {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url:'/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
      },
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg('ovo注册失败');
        } else {
          layer.msg('哇哦注册成功！'); // 模拟点击跳转
          $('#link_login').click();
        }
      },
    });
  });
    // 登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url:'/api/login',
            data:$(this).serialize()
            ,
            success: (res) => {
                if (res.status !== 0) return layer.msg('登陆失败！')
                layer.msg('登陆成功！')
                // 登陆成功将token放在本地存储
                localStorage.setItem('token', res.token)
                // 跳转到主页
                location.href = "/index.html"
                
            }
        })
    })
});
