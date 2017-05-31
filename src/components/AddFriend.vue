<template>
	<div class="full-screen">
		<header class="aui-bar aui-bar-nav">
			<a @click="backAction" class="aui-pull-left aui-btn">
				<span class="aui-iconfont aui-icon-left"></span>返回
			</a>
			<div class="aui-title">添加好友</div>
		</header>
		<div class="aui-content">
			<ul class="aui-list aui-form-list">
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label">
							好友ID
						</div>
						<div class="aui-list-item-input">
							<input v-model="friendId" type="text" placeholder="输入用户ID">
						</div>
					</div>
				</li>
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label">
							验证消息
						</div>
						<div class="aui-list-item-input">
							<textarea v-model="message" placeholder="验证消息"></textarea>
						</div>
					</div>
				</li>
			</ul>
			<div @click="addFriendAction" class="aui-btn aui-btn-info aui-btn-block aui-btn-sm" style="margin: 10px;width: 95%">添加好友</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				friendId: '',
				message: '加个好友呗!',
			};
		},
		methods: {
			backAction() {
				this.$router.back();
			},
			addFriendAction() {
				var self = this;
				conn.subscribe({
					to: self.friendId,
					message: self.message
				});
			},

		},
		mounted() {

		}
	}
</script>

<style>

</style>