<template>
	<div id="chat" class="full-screen">
		<transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
			<router-view></router-view>
		</transition>
		<header class="aui-bar aui-bar-nav">
			<a @click="backAction" class="aui-pull-left aui-btn">
				<span class="aui-iconfont aui-icon-left"></span>返回
			</a>
			<div class="aui-title">{{msgToName}}</div>
			<a v-if="chat_type!='single_chat'" @click="openDetailView" class="aui-pull-right aui-btn">
				<span class="aui-iconfont aui-icon-more"></span>
			</a>
		</header>
		<div id="chat-scroll-view" class="aui-content app-body" style="bottom: 80px">
			<section class="aui-chat">
				<!--<div class="aui-chat-header">2016年7月13日</div>-->
				<div v-for="(msg,i) in msgArr" class="aui-chat-item" :class="{'aui-chat-left':!msg.is_mine,'aui-chat-right':msg.is_mine}">
					<div class="aui-chat-media">
						<img src="http://i1.piimg.com/1949/6f7764a45a1d1a50.png" />
					</div>
					<div class="aui-chat-inner">
						<div class="aui-chat-name">{{msg.from}}
							<!--<span class="aui-label aui-label-warning">2.0</span>-->
						</div>
						<div class="aui-chat-content">
							<div class="aui-chat-arrow"></div>
							<div v-if="msg.msg_type=='text'">{{msg.data}}</div>
							<img v-if="msg.msg_type=='image'" :src="msg.data" />
						</div>
						<div class="aui-chat-status aui-chat-status-refresh">
							<!--<i v-if="msg.status===''" class="aui-iconfont aui-icon-correct aui-text-success"></i>-->
							<i v-if="msg.status==='wait'" class="aui-iconfont aui-icon-refresh aui-text-warning"></i>
							<i v-if="msg.status==='error'" class="aui-iconfont aui-icon-info aui-text-danger"></i>
						</div>
					</div>
				</div>
			</section>
		</div>
		<div class="chat-footer">
			<div class="chat-send">
				<input v-model="msg_send" type="text" />
				<button @click="sendMsgAction" type="button" class="mui-btn">发送</button>
			</div>
			<div class="chat-tool">
				<span>
                    <i class="aui-iconfont aui-icon-image"></i>
                    <input @change="sendPicMsgAction" type="file" accept="image/*"/>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				/** 显示的数据 */
				//输入框内容
				msg_send: '',
				//聊天信息数组
				msgArr: [],

				/**  */
				routeData: {}, //路由传过来的信息
				msgTo: '', //发送好友的id 群id
				msgToName: '', //对方name 群name
				mine: App.username, //我的id
				msgType: '', //聊天类型 friend group
				chat_type: 'single_chat',
				msgSuccessClass: {
					'aui-icon-correct': true,
					'aui-text-success': true
				},
				msgErrorClass: {

				},
				msgWaitClass: {

				},

			};
		},
		watch: {
			msgArr(v) {
				this.$nextTick(function() {
					var div = document.getElementById('chat-scroll-view');
					div.scrollTop = div.scrollHeight;
				});
			}
		},
		mounted() {
			var self = this;
			var param = self.$route.params;
			console.log(param);
			self.routeData = param;
			self.msgTo = param.id;
			if(param.type == 'group') {
				self.chat_type = 'group_chat'
			}
			self.msgToName = param.name;
			console.log('我的id:%o  对方id:%o 对方name:%o  消息类型:%o', self.mine, self.msgTo, param.name, self.chat_type);
			if(self.chat_type == 'single_chat') {
				self.getChatMsgArr(App.friendChatArr);
			} else if(self.chat_type == 'group_chat') {
				self.getGroupMsgArr(App.groupChatArr);
			}
			App.$on('onChatMsgSuccess', function(arr) {
				if(self.chat_type == 'single_chat') {
					console.log('Chat frieng 消息改变时收到信息处理')
					self.getChatMsgArr(arr);
				} else if(self.chat_type == 'group_chat') {
					console.log('Char group 消息改变时收到信息处理')
					self.getGroupMsgArr(arr);
				}
			});
			App.computUnReadMsgNum();

			////设计一个message对象
			var mmm = {
				data: '',
				date: '',
				id: '',
				from: '',
				to: '',
				is_mine: '',
				is_read: '',
				msg_type: '',
				chat_type: '',
			};
		},
		methods: {
			//读取这个好友的聊天记录
			getChatMsgArr(arr) {
				console.log(arr)
				var self = this;
				var arr_temp = [];
				$.each(arr, function(i, msgObj) {
					if((msgObj.from == self.msgTo && msgObj.to == self.mine) || (msgObj.from == self.mine && msgObj.to == self.msgTo)) {
						console.log('找到 %o 和 %o 的一条记录', self.mine, self.msgTo);
						//改变已读状态
						msgObj.is_read = true;
						arr_temp.push(msgObj);
					}
				});
				self.msgArr = arr_temp;
			},
			//读取 群组 聊天记录
			getGroupMsgArr(arr) {
				var self = this;
				var arr_temp = [];
				$.each(arr, function(i, msgObj) {
					if(msgObj.to == self.msgTo) {
						console.log('找到 %o 和群组%o 的一条记录', self.mine, self.msgTo);
						msgObj.is_read = true;
						arr_temp.push(msgObj);
					}
				});
				self.msgArr = arr_temp;
			},
			//返回
			backAction() {
				this.$router.back();
			},
			//发送信息
			sendMsgAction() {
				var self = this;
				if(self.msg_send == '') {
					return;
				}
				var my_msg = self.msg_send;
				var msg_to = self.msgTo;
				console.log('要发送给 %o 的 消息==%o', msg_to, my_msg);
				//发送 单聊 信息
				if(self.chat_type == 'single_chat') {
					var id = conn.getUniqueId(); // 生成本地消息id
					var msg = new WebIM.message('txt', id); // 创建文本消息
					var msg_mine = {
						data: my_msg,
						date: new Date().getTime(),
						id: id,
						from: App.username,
						to: msg_to,
						is_mine: true,
						is_read: true,
						msg_type: 'text',
						chat_type: self.chat_type,
						status: 'wait',
					};
					console.log('包装我发的信息 %o', msg_mine);
					App.friendChatArr.push(msg_mine);
					msg.set({
						msg: my_msg, // 消息内容
						to: msg_to, // 接收消息对象（用户id）
						roomType: false,
						success: function(id, serverMsgId) {
							console.log('send private text Success');
							msg_mine.status = '';
							//保存信息
							//dbManager.saveChat(msg_mine);
						},
						fail: function() {
							console.log('failed');
							msg_mine.status = 'error';
						}
					});
					msg.body.chatType = 'singleChat';
					conn.send(msg.body);
				}
				//发送群聊信息
				if(self.chat_type == 'group_chat') {
					var id = conn.getUniqueId(); // 生成本地消息id
					var msg = new WebIM.message('txt', id); // 创建文本消息
					var msg_mine = {
						data: my_msg,
						date: new Date().getTime(),
						id: id,
						from: App.username,
						to: msg_to,
						is_mine: true,
						is_read: true,
						msg_type: 'text',
						chat_type: self.chat_type,
						status: 'wait',
					};
					console.log('包装我发的信息 %o', msg_mine);
					App.groupChatArr.push(msg_mine);
					var option = {
						msg: my_msg, // 消息内容
						to: msg_to, // 接收消息对象(群组id)
						roomType: false,
						chatType: 'chatRoom',
						success: function() {
							console.log('send room text success');
							msg_mine.status = '';
							//保存信息
							//dbManager.saveChat(msg_mine);
						},
						fail: function() {
							console.log('failed');
							msg_mine.status = 'error';
						}
					};
					msg.set(option);
					msg.setGroup('groupchat');
					conn.send(msg.body);
				}
				//发送完清空文本框
				self.msg_send = '';

			},
			//发送 图片 信息
			sendPicMsgAction(e) {
				var self = this;
				var id = conn.getUniqueId(); // 生成本地消息id
				var msg = new WebIM.message('img', id); // 创建图片消息
				var input = e.target; // 选择图片的input
				var file = WebIM.utils.getFileUrl(input); // 将图片转化为二进制文件
				var allowType = {
					'jpg': true,
					'gif': true,
					'png': true,
					'bmp': true
				};
				var msg_mine = {
					data: file.url,
					date: new Date().getTime(),
					id: id,
					from: App.username,
					to: self.msgTo,
					is_mine: true,
					is_read: true,
					msg_type: 'image',
					chat_type: self.chat_type,
					status: 'wait',
				};
				console.log('包装我发的信息 %o', msg_mine);
				if(self.chat_type == 'single_chat') {
					App.friendChatArr.push(msg_mine);
				} else {
					App.groupChatArr.push(msg_mine);
				}
				if(file.filetype.toLowerCase() in allowType) {
					var option = {
						apiUrl: WebIM.config.apiURL,
						file: file,
						to: self.msgTo, // 接收消息对象
						roomType: false,
						chatType: self.chat_type == 'single_chat' ? 'singleChat' : 'chatRoom',
						onFileUploadError: function() { // 消息上传失败
							console.log('onFileUploadError');
							msg_mine.status = 'error';
						},
						onFileUploadComplete: function() { // 消息上传成功
							console.log('onFileUploadComplete');
						},
						success: function() { // 消息发送成功
							console.log('Success', id);
							msg_mine.status = '';
						},
						flashUpload: WebIM.flashUpload
					};
					msg.set(option);
					if(self.chat_type == 'group_chat') {
						msg.setGroup('groupchat');
					}
					conn.send(msg.body);
				} else {
					msg_mine.status = 'error';
				}
			},
			//打开群管理 或 打开联系人信息
			openDetailView() {
				var self = this;
				console.log('打开群管理')
				this.$router.push({
					name: 'GroupManage',
					params: self.routeData
				});
			},
		},
		destroyed() {
			console.log('组件销毁  移除事件监听器');
			App.$off('onChatMsgSuccess');
		},

	}
</script>

<style scoped="scoped">
	/* 聊天输入框 聊天工具栏 */
	
	.chat-footer {
		position: absolute;
		width: 100%;
		left: 0px;
		bottom: 0px;
		height: 80px;
		padding: 0px 10px;
		background-color: rgb(238, 238, 238);
	}
	
	.chat-footer .chat-send {
		height: 40px;
		display: flex;
	}
	
	.chat-footer .chat-send input[type=text] {
		flex: auto;
		height: 40px;
		min-height: 40px;
		padding-left: 5px;
		border: 0;
		background-color: #fff;
		border-radius: 3px;
	}
	
	.chat-footer .chat-send button {
		border-radius: 3px;
		height: 40px;
		padding: 0 20px;
		border: 0;
		margin-left: 10px;
		margin-right: 0px;
		background-color: #5FB878;
		color: #fff;
	}
	
	.chat-footer .chat-tool {
		position: relative;
		width: 100%;
		overflow-x: auto;
		padding: 0;
		height: 38px;
		line-height: 38px;
		margin-top: 2px;
		font-size: 0;
		white-space: nowrap;
	}
	
	.chat-footer .chat-tool span {
		position: relative;
		margin: 0 5px;
		display: inline-block;
		vertical-align: top;
		font-size: 28px;
		height: 38px;
		line-height: 38px;
	}
	
	.chat-footer .chat-tool span .aui-iconfont {
		display: inline-block;
		width: 35px;
		margin-top: 2px;
		font-size: 1.3rem;
		text-align: center;
	}
	
	.chat-footer .chat-tool span input[type=file] {
		width: 35px;
		position: absolute;
		left: 0px;
		opacity: 0;
		margin-top: 2px;
	}
</style>