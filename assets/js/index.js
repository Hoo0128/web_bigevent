// 获取用户信息
function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    success: (res) => {
      // console.log(res);
      if (res.status !== 0) return layer.msg('获取用户信息失败！');
      layer.msg('获取用户信息成功！');
      renderAvatar(res.data);
    },
    // 不论成功还是失败，最终都会调用 complete 回调函数
complete: (res) => {
  // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
  if(res.responseJSON.status ===1 && res.responseJSON.message === "身份认证失败！") {
      //  强制清空 token
      localStorage.removeItem("token");
      // 强制跳转到登录页面
      location.href = "/login.html"
  }
},
  });
}

// 渲染用户信息
const renderAvatar = (user) => {
  const name = user.nickname || user.username;
  // 渲染欢迎语
  $('#welcome').html(`欢迎${name}`);
  // 按需渲染头像
  if (user.user_pic !== null) {
    // 渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    $('.layui-nav-img').hide();
    let first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();
  }
};

// 退出登录
$('#btnLogout').click(() => {
  layui.layer.confirm(
    '是否退出登录？',
    { icon: 3, title: '提示' },
    function (index) {
      // 清空本地存储里面的 token
      localStorage.removeItem('token');
      // 重新跳转到登录页面
      location.href = '/login.html';
    }
  );
  
});


//获取用户列表
getUserInfo();
