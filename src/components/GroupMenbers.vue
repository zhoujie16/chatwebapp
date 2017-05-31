<template>
	<div class="full-screen">
		<header class="aui-bar aui-bar-nav">
			<a @click="backAction" class="aui-pull-left aui-btn">
				<span class="aui-iconfont aui-icon-left"></span>返回
			</a>
			<div class="aui-title">群成员({{groupInfo.name}})</div>
		</header>
		<div class="aui-content">
			<ul class="aui-list aui-media-list">
				<li @click="openChatView(item)" v-for="(item,i) in gropuMenbers" class="aui-list-item aui-list-item-middle">
					<div class="aui-media-list-item-inner">
						<div class="aui-list-item-media wechat-avatar">
							<!--<div v-if="item.msgNum>0" class="aui-badge">{{item.msgNum}}</div>-->
							<img src="http://i1.piimg.com/1949/6f7764a45a1d1a50.png">
						</div>
						<div class="aui-list-item-inner">
							<div class="aui-list-item-text">
								<div class="aui-list-item-title">{{item.jid}}</div>
								<!--<div class="aui-list-item-right">状态</div>-->
							</div>
							<div class="aui-list-item-text aui-font-size-12">

							</div>
						</div>
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
				gropuMenbers: [],
			};
		},
		methods: {
			//返回
			backAction: function() {
				this.$router.back();
			},
		},
		mounted() {
			var self = this;
			self.groupInfo = self.$route.params;
			httpTool.queryRoomMember(self.groupInfo.id, function(arr) {
				console.log(JSON.stringify(arr));
				self.gropuMenbers = arr;
			});
		},
	}
</script>

<style scoped="">
	.aui-content.app-body {
		overflow: auto;
		bottom: 0px;
	}
</style>