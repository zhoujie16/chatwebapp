<template>
	<div class="full-screen">
		<header class="aui-bar aui-bar-nav">
			<a @click="backAction" class="aui-pull-left aui-btn">
				<span class="aui-iconfont aui-icon-left"></span>返回
			</a>
			<div class="aui-title">创建群</div>
		</header>
		<div class="aui-content">
			<ul class="aui-list aui-form-list">
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label">
							群名称
						</div>
						<div class="aui-list-item-input">
							<input v-model="subject" type="text" placeholder="群名称">
						</div>
					</div>
				</li>
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label">
							群简介
						</div>
						<div class="aui-list-item-input">
							<textarea v-model="description" placeholder="群简介"></textarea>
						</div>
					</div>
				</li>
				<li class="aui-list-header"></li>
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<label><input v-model="optionsPublic" class="aui-checkbox" type="checkbox" name="checkbox"> 允许任何人加入</label>
					</div>
				</li>
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<label><input v-model="optionsAllowInvites" class="aui-checkbox" type="checkbox" name="checkbox"> 允许群人员邀请</label>
					</div>
				</li>

			</ul>
			<div @click="createGroupAction" class="aui-btn aui-btn-info aui-btn-block aui-btn-sm" style="margin: 10px;width: 95%">创建群组</div>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				subject: '', // 群名称
				description: '', // 群简介
				members: [], // 以数组的形式存储需要加群的好友ID
				optionsPublic: true, // 允许任何人加入
				optionsModerate: false, // 加入需审批
				optionsMembersOnly: false, // 不允许任何人主动加入
				optionsAllowInvites: true, // 允许群人员邀请

				/* 好友 */
				friends: App.friends,
			};
		},
		methods: {
            backAction() {
				this.$router.back();
			},
			//点击创建群按钮
			createGroupAction() {
				var self = this;
				if(self.subject == '') {
				    console.log('群名称必填", "警告')
					$.alert("群名称必填", "警告");
					return;
				}
				var param = {
					subject: self.subject,
					description: self.description,
					members: self.members,
					optionsPublic: self.optionsPublic,
					optionsModerate: self.optionsModerate,
					optionsMembersOnly: self.optionsMembersOnly,
					optionsAllowInvites: self.optionsAllowInvites
				};

				httpTool.createGroup(param);
			},
		},
		mounted() {

		},
		destroyed() {

		},
	}
</script>

<style>

</style>