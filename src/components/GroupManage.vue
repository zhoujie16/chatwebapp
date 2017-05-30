<template>
	<div class="full-screen">
		<transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
			<router-view></router-view>
		</transition>
		<!--<div class="vux-header">-->
			<!--<div @click="backAction" class="vux-header-left">-->
				<!--<a class="vux-header-back"></a>-->
				<!--<div class="left-arrow"></div>-->
			<!--</div>-->
			<!--<h1 class="vux-header-title">群管理</h1>-->
		<!--</div>-->
		<!--<div class="scroll-content">-->
			<!--<div class="weui-cells">-->
				<!--<div @click="queryRoomMemberAction" class="weui-cell">-->
					<!--<div class="weui-cell__bd">-->
						<!--<p>查询群成员</p>-->
					<!--</div>-->
					<!--<div class="weui-cell__ft"></div>-->
				<!--</div>-->
				<!--<div v-if="0" @click="queryGroupInfoAction" class="weui-cell">-->
					<!--<div class="weui-cell__bd">-->
						<!--<p>查询群信息</p>-->
					<!--</div>-->
					<!--<div class="weui-cell__ft"></div>-->
				<!--</div>-->
				<!--<div @click="AddGroupMembersAction" class="weui-cell">-->
					<!--<div class="weui-cell__bd">-->
						<!--<p>添加群成员</p>-->
					<!--</div>-->
					<!--<div class="weui-cell__ft"></div>-->
				<!--</div>-->
				<!--<div @click="destroyGroupAction" class="weui-cell">-->
					<!--<div class="weui-cell__bd">-->
						<!--<p>解散群</p>-->
					<!--</div>-->
					<!--<div class="weui-cell__ft"></div>-->
				<!--</div>-->
				<!--<div v-if="0" @click="leaveGroupAction" class="weui-cell">-->
					<!--<div class="weui-cell__bd">-->
						<!--<p>退出群</p>-->
					<!--</div>-->
					<!--<div class="weui-cell__ft"></div>-->
				<!--</div>-->
			<!--</div>-->
		<!--</div>-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//路由于传过来的信息 id  name  
				routeData: {
					id: "",
					msgNum: "",
					name: "",
					type: "",
				},

			};
		},
		mounted() {

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
					name:'GroupMenbers',
					params:self.routeData,
				});
			},
			//查询群信息
			queryGroupInfoAction() {
				mui.alert('此功能等待开放...');
				return;
				var self = this;
				httpTool.queryGroupInfo(self.routeData.id)
			},
			//添加群成员
			AddGroupMembersAction() {
				var self = this;
				self.$router.push({
					name: 'AddGroupMembers',
					params: self.routeData,
				});
			},
			//解散群
			destroyGroupAction() {
				var self = this;
				$.confirm({
					title: '警告',
					text: '是否解散该群',
					onOK: function() {
						httpTool.destroyGroup(self.routeData.id);
					},
					onCancel: function() {}
				});

			},
			//退出群
			leaveGroupAction() {
				mui.alert('此功能等待开放...');
			},
		},
		mounted() {
			var self = this;
			self.routeData = self.$route.params;
			console.log(self.routeData);
		},
	}
</script>

<style>

</style>