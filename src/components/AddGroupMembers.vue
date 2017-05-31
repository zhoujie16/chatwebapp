<template>
	<div class="full-screen">
		<header class="aui-bar aui-bar-nav">
			<a @click="backAction" class="aui-pull-left aui-btn">
				<span class="aui-iconfont aui-icon-left"></span>返回
			</a>
			<div class="aui-title">添加群成员</div>
			<a @click="AddMenbersAction" class="aui-pull-right aui-btn">
				<span class="">添加</span>
			</a>
		</header>
		<div class="aui-content">
			<ul class="aui-list aui-media-list">
				<li @click="cellClick(item)" v-for="(item,i) in friends" class="aui-list-item aui-list-item-middle">
					<div class="aui-media-list-item-inner">
						<div class="aui-list-item-media wechat-avatar">
							<!--<div v-if="item.msgNum>0" class="aui-badge">{{item.msgNum}}</div>-->
							<img src="http://i1.piimg.com/1949/6f7764a45a1d1a50.png">
						</div>
						<div class="aui-list-item-inner">
							<div class="aui-list-item-text">
								<div class="aui-list-item-title">{{item.id}}</div>
								<div class="aui-list-item-right">
									<i v-if="item.isChecked" class="aui-iconfont aui-icon-correct"></i>
								</div>
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
				friends: [],
			};
		},
		methods: {
			backAction() {
				this.$router.back();
			},
			cellClick(item) {
				item.isChecked = !item.isChecked
			},
			AddMenbersAction() {
				var self = this;
				console.log('添加');
				var arr = [];
				$.each(self.friends, function(i, d) {
					if(d.isChecked) {
						arr.push(d.id);
					}
				});
				if(arr.length == 0) {
					toast.fail({
						title: "没有选择任何好友",
						duration: 2000
					});
					return;
				}
				var option = {
					list: arr,
					roomId: self.groupInfo.id
				};
				conn.addGroupMembers(option);
			},
		},
		mounted() {
			var self = this;
			self.groupInfo = self.$route.params;
			var arr_temp = JSON.parse(JSON.stringify(App.friends));
			$.each(arr_temp, function(i, d) {
				d.isChecked = false;
			});
			self.friends = arr_temp;
			console.log(self.friends);
		},
	}
</script>
<style>

</style>