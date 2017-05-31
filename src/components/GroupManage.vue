<template>
	<div class="full-screen">
		<transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
			<router-view></router-view>
		</transition>
		<header class="aui-bar aui-bar-nav">
			<a @click="backAction" class="aui-pull-left aui-btn">
				<span class="aui-iconfont aui-icon-left"></span>返回
			</a>
			<div class="aui-title">群管理</div>
		</header>
		<div class="aui-content">
			<ul class="aui-list aui-list-in">
				<li @click="queryRoomMemberAction" class="aui-list-item">
					<div class="aui-list-item-label-icon">
						<i class="aui-iconfont aui-icon-home"></i>
					</div>
					<div class="aui-list-item-inner">
						查询群成员
					</div>
				</li>
				<li @click="AddGroupMembersAction" class="aui-list-item">
					<div class="aui-list-item-label-icon">
						<i class="aui-iconfont aui-icon-home"></i>
					</div>
					<div class="aui-list-item-inner">
						添加群成员
					</div>
				</li>
				<li @click="destroyGroupAction" class="aui-list-item">
					<div class="aui-list-item-label-icon">
						<i class="aui-iconfont aui-icon-home"></i>
					</div>
					<div class="aui-list-item-inner">
						解散群
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				groupInfo: {},
			};
		},
		methods: {
			//返回
			backAction: function() {
				this.$router.back();
			},
			//查询群成员
			queryRoomMemberAction() {
				var self = this;
				this.$router.push({
					name: 'GroupMenbers',
					params: self.groupInfo,
				});
			},
			//查询群信息
			queryGroupInfoAction() {},
			//添加群成员
			AddGroupMembersAction() {
				var self = this;
				self.$router.push({
					name: 'AddGroupMembers',
					params: self.groupInfo,
				});
			},
			//解散群
			destroyGroupAction() {
				var self = this;
				dialog.alert({
					title: "是否解散群组(" + self.groupInfo.name + ")",
					msg: '只有管理员才能解散',
					buttons: ['取消', '解散']
				}, function(ret) {
					if(ret.buttonIndex == 2) {
						var option = {
							reason: 'Test Destroy Group',
							roomId: self.groupInfo.id,
							success: function() {
								console.log('Destroy group success!');
								toast.success({
									title: "群组解散成功",
									duration: 2000
								});
								setTimeout(function(){
									App.refreshFriendAndGroupListAction();
								},2000);
							}
						};
						conn.destroyGroup(option);
					}
				});
			},
			//退出群
			leaveGroupAction() {
				mui.alert('此功能等待开放...');
			},
		},
		mounted() {
			var self = this;
			self.groupInfo = self.$route.params;
			console.log(JSON.stringify(self.groupInfo));
		},
	}
</script>

<style>

</style>