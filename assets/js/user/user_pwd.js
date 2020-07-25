$(function () {
  var form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同';
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致！';
      }
    },
  });
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    // $.ajax({
    //   method: 'POST',
    //   url: '/my/updatepwd',
    //   data: $(this).serialize(),
    //   success: function (res) {
    //     if (res.status !== 0) {
    //       return layui.layer.msg('更新密码失败！');
    //     }
    //     layui.layer.msg('更新密码成功！');
    //     // 重置表单
    //     $('.layui-form')[0].reset();
    //   },
    // });
    $.ajax({
      type: 'POST', //默认get
      url: '/my/updatepwd', //默认当前页
      data: $(this).serialize(), //格式{key:value}
      dataType: 'json',
      beforeSend: function () {}, //请求发送前回调,常用验证
      success: function (res) {
        //请求成功回调
        if (res.status !== 0) {
          return layui.layer.msg('更新密码失败！');
        }
        layui.layer.msg('更新密码成功！');
        // 重置表单
        $('.layui-form')[0].reset();
      },
      error: function (e) {
        //请求超时回调
        if (e.statusText == 'timeout') {
          alert('请求超时');
        }
      },
      complete: function () {}, //无论请求是成功还是失败都会执行的回调，常用全局成员的释放，或者页面状态的重置
    });
  });
});
