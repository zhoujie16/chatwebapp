<template>
	<div class="full-screen" style="z-index: 111;">
		<header class="aui-bar aui-bar-nav">
			<a @click="backAction" class="aui-pull-left aui-btn">
				<span class="aui-iconfont aui-icon-left"></span>返回
			</a>
			<div class="aui-title">注册</div>
		</header>
		<div class="aui-content">
			<ul class="aui-list aui-form-list">
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label">
							用户ID
						</div>
						<div class="aui-list-item-input">
							<input v-model="username" type="text" placeholder="推荐邮箱或手机" />
						</div>
					</div>
				</li>
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label">
							昵称
						</div>
						<div class="aui-list-item-input">
							<input v-model="nickname" type="text" placeholder="输入昵称(可空)" />
						</div>
					</div>
				</li>
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label">
							密码
						</div>
						<div class="aui-list-item-input">
							<input v-model="password" type="password" placeholder="输入密码" />
						</div>
					</div>
				</li>
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label">
							确认密码
						</div>
						<div class="aui-list-item-input">
							<input v-model="password2" type="password" placeholder="确认密码" />
						</div>
					</div>
				</li>
			</ul>
			<br />
			<div @click="registAction" class="aui-btn aui-btn-block aui-btn-primary aui-btn-sm">
				注册
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				nickname: '',
				password: '',
				password2: '',
			};
		},
		methods: {
			backAction() {
				this.$router.back();
			},
			registAction() {
				var self = this;
				if(self.username === '') {
					dialog.alert({
						title: '提示',
						msg: '用户ID必填',
						buttons: ['确定'],
					});
					return;
				}
				if(self.password != self.password2) {
					dialog.alert({
						title: '提示',
						msg: '2次输入的密码不一致',
						buttons: ['确定'],
					});
					return;
				}
				var options = {
					username: self.username,
					password: self.password,
					nickname: self.nickname,
					appKey: WebIM.config.appkey,
					success: function() {
						dialog.alert({
							title: '提示',
							msg: '账号注册成功',
							buttons: ['确定'],
						}, function() {
							App.username = self.username;
							App.password = self.password;
							self.backAction();
						});
					},
					error: function(err) {
						err = JSON.parse(err.data);
						var errMsg = '账号注册失败';
						if(err.error === 'illegal_argument') {
							errMsg = '非法参数!';
						} else if(err.error === 'duplicate_unique_property_exists') {
							errMsg = '该用户ID已经被注册!';
						} else {
							errMsg = err.error;
						}
						dialog.alert({
							title: '警告',
							msg: errMsg,
							buttons: ['确定'],
						});
						console.warn(JSON.stringify(err));
					},
					apiUrl: WebIM.config.apiURL
				};
				conn.registerUser(options);
			},
		},
	}
</script>

<style>

</style>