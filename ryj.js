<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>图书借阅</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico">
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/fontawesome.min.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/AdminLTE.min.css">
    <link rel="stylesheet" href="/css/_all-skins.min.css">
 
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <![endif]-->
</head>
<body class="hold-transition login-page">
<div class="login-box" id="app" v-cloak>
    <div class="login-logo">
        <b>图书借阅</b>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
        <p class="login-box-msg">管理员登录</p>
        <div v-if="error" class="alert alert-danger alert-dismissible">
            <h4 style="margin-bottom: 0px;"><i class="fa fa-exclamation-triangle"></i> {{errorMsg}}</h4>
        </div>
        <div class="form-group has-feedback">
            <input type="text" class="form-control" v-model="username" placeholder="账号">
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
            <input type="password" class="form-control" v-model="password" placeholder="密码">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
            <div class="row">
                <!-- /.col -->
                <div class="col-xs-8">
                    <input type="text" class="form-control" v-model="captcha" @keyup.enter="login" placeholder="验证码">
                </div>
                <div class="col-xs-4">
                    <img alt="如果看不清楚，请单击图片刷新！" class="pointer" :src="src" @click="refreshCode"
                         style="width: 100%; height: 34px">
                </div>
            </div>
        </div>
 
        <div class="form-group has-feedback">
            <div class="row">
                <!-- /.col -->
                <div class="col-xs-12">
                    <button type="button" class="btn btn-primary btn-block btn-flat" @click="login">登录</button>
                </div>
                <!-- /.col -->
            </div>
        </div>
        <!-- /.social-auth-links -->
        <a href="http://www.java1234.com/a/bysj/javaweb/" target='_blank'><font color=red>Java1234收藏整理</font></a>
 
    </div>
    <!-- /.login-box-body -->
</div>
<!-- /.login-box -->
<script src="/css/html5shiv.js"></script>
<script src="/css/respond.min.js"></script>
<script src="/css/jquery.min.js"></script>
<script src="/css/vue.min.js"></script>
<script src="/css/bootstrap.min.js"></script>
<script src="/css/echarts.min.js"></script>
<script src="/css/app.js"></script>
<script src="/js/admin/components.js"></script>
<script src="/js/admin/common.js"></script>
<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        data: {
            username: 'admin',
            password: '123456',
            captcha: '',
            error: false,
            errorMsg: '',
            src: '/captcha.jpg'
        },
 
        methods: {
            refreshCode: function () {
                this.src = "/captcha.jpg?t=" + $.now();
            },
            login: function () {
                var data = "username=" + vm.username + "&password=" + vm.password + "&captcha=" + vm.captcha;
                $.ajax({
                    type: "POST",
                    url: "/sys/login",
                    data: data,
                    dataType: "json",
                    success: function (r) {
                        if (r.code == 0) {//登录成功
                            localStorage.setItem("token", r.token);
                            parent.location.href = 'index.html?token=' + r.token;
                            // window.location.href='index';
 
                        } else {
                            vm.error = true;
                            vm.errorMsg = r.msg;
                            vm.refreshCode();
                        }
                    }
                });
            }
        }
    });
</script>
</body>
</html>
