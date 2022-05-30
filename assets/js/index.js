function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    
    success: (res) => {
      if (res.status !== 0) return layer.msg('获取用户信息失败！');
      layer.msg('获取用户信息成功！');
      renderAvatar(res.data);
      },
      complete: (res) => {
        console.log(res);
    }
  });
}
function renderAvatar(res) {
  console.log(res);
  let username = res.nickname || res.username;
  $('#welcome').html(`欢迎${username}`);
  if (res.user_pic !== null) {
    $('.layui-nav-img').attr('src', res.user_pic);
    $('.text-avatar').hide();
  } else {
    $('.layui-nav-img').hide();

    $('.text-avatar').html(username[0].toUpperCase());
  }
}
// 退出登录
$("#btnLogout").click(() => {
    layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "提示" },
        function (index) {
            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";
        }
    );
});
getUserInfo();
