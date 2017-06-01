<template>
	<div id="app" class="full-screen">
		<transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
			<router-view></router-view>
		</transition>
		<transition enter-active-class="animated" leave-active-class="animated fadeOutDown">
			<div v-show="!isLogin" class="full-screen">
				<div class="aui-content aui-margin-b-15" style="margin-top: 100px;">
					<ul class="aui-list aui-form-list">
						<li class="aui-list-item">
							<div class="aui-list-item-inner">
								<div class="aui-list-item-label">
									用户名
								</div>
								<div class="aui-list-item-input">
									<input v-model="username" type="text" placeholder="Name">
								</div>
							</div>
						</li>
						<li class="aui-list-item">
							<div class="aui-list-item-inner">
								<div class="aui-list-item-label">
									密码
								</div>
								<div class="aui-list-item-input">
									<input v-model="password" type="password" placeholder="Password">
								</div>
							</div>
						</li>
					</ul>
				</div>

				<div @click="loginAction" class="aui-btn aui-btn-primary aui-btn-block aui-btn-sm" style="margin-bottom: 10px;">登录</div>
				<div @click="registAction" class="aui-btn aui-btn-primary aui-btn-block aui-btn-sm">注册</div>
			</div>
		</transition>
		<header class="aui-bar aui-bar-nav">{{username}}</header>
		<div v-if="isOffLine" class="aui-tips aui-margin-b-15" id="tips-1" style="background-color: rgba(229,28,35,.6);">
			<i class="aui-iconfont aui-icon-info"></i>
			<div class="aui-tips-title">本机网络掉线</div>
			<i class="aui-iconfont aui-icon-close"></i>
		</div>
		<div class="aui-content app-body">
			<div class="aui-content aui-hide" :class="{'aui-show':showItem==0}">
				<ul class="aui-list aui-media-list">
					<li @click="openChatView(item)" v-for="(item,i) in friends" class="aui-list-item aui-list-item-middle">
						<div class="aui-media-list-item-inner">
							<div class="aui-list-item-media wechat-avatar">
								<div v-if="item.msgNum>0" class="aui-badge">{{item.msgNum}}</div>
								<img src="http://i1.piimg.com/1949/6f7764a45a1d1a50.png">
							</div>
							<div class="aui-list-item-inner">
								<div class="aui-list-item-text">
									<div class="aui-list-item-title">{{item.name}}</div>
									<div class="aui-list-item-right">状态</div>
								</div>
								<div class="aui-list-item-text aui-font-size-12">
									{{item.id}}
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="aui-content aui-hide" :class="{'aui-show':showItem==1}">
				<ul @click="openChatView(item)" v-for="(item,i) in groups" class="aui-list aui-media-list">
					<li class="aui-list-item aui-list-item-middle wechat-top">
						<div class="aui-media-list-item-inner">
							<div class="aui-list-item-media wechat-avatar">
								<div v-if="item.msgNum>0" class="aui-badge">{{item.msgNum}}</div>
								<div class="aui-row-padded">
									<div class="aui-col-xs-6">
										<img src="http://i1.piimg.com/1949/6f7764a45a1d1a50.png" />
									</div>
									<div class="aui-col-xs-6">
										<img src="http://i1.piimg.com/1949/6f7764a45a1d1a50.png" />
									</div>
									<div class="aui-col-xs-6">
										<img src="http://i1.piimg.com/1949/6f7764a45a1d1a50.png" />
									</div>
									<div class="aui-col-xs-6">
										<img src="http://i1.piimg.com/1949/6f7764a45a1d1a50.png" />
									</div>
								</div>

							</div>
							<div class="aui-list-item-inner">
								<div class="aui-list-item-text">
									<div class="aui-list-item-title">{{item.name}}</div>
									<div class="aui-list-item-right">状态</div>
								</div>
								<div class="aui-list-item-text aui-font-size-12">
									{{item.id}}
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="aui-content aui-hide" :class="{'aui-show':showItem==2}">
				<ul class="aui-list aui-list-in">

					<li @click="openSearchView" class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="aui-iconfont aui-icon-home"></i>
						</div>
						<div class="aui-list-item-inner">
							搜索
						</div>
					</li>
					<li @click="openNoticeView" class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="aui-iconfont aui-icon-edit"></i>
						</div>
						<div class="aui-list-item-inner">
							新通知
						</div>
					</li>
					<li @click="addFriendsAction" class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="aui-iconfont aui-icon-camera"></i>
						</div>
						<div class="aui-list-item-inner">
							添加好友
						</div>
					</li>
					<li @click="openCreatGroupView" class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="aui-iconfont aui-icon-camera"></i>
						</div>
						<div class="aui-list-item-inner">
							创建群
						</div>
					</li>
					<li @click="refreshFriendAndGroupListAction" class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="aui-iconfont aui-icon-camera"></i>
						</div>
						<div class="aui-list-item-inner">
							刷新好友列表和群组列表
						</div>
					</li>
					<li @click="closeChat" class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="aui-iconfont aui-icon-camera"></i>
						</div>
						<div class="aui-list-item-inner">
							退出登录
						</div>
					</li>
				</ul>
			</div>
		</div>

		<footer class="aui-bar aui-bar-tab" id="footer">
			<div class="aui-bar-tab-item" :class="{'aui-active':showItem===0}" @click="showItem=0" tapmode>
				<i class="aui-iconfont aui-icon-my"></i>
				<div class="aui-bar-tab-label">好友</div>
			</div>
			<div class="aui-bar-tab-item" :class="{'aui-active':showItem===1}" @click="showItem=1" tapmode>
				<!--<div class="aui-badge">99</div>-->
				<i class="aui-iconfont aui-icon-comment"></i>
				<div class="aui-bar-tab-label">群聊</div>
			</div>
			<div class="aui-bar-tab-item" :class="{'aui-active':showItem===2}" @click="showItem=2" tapmode>
				<!--<div class="aui-dot"></div>-->
				<i class="aui-iconfont aui-icon-paper"></i>
				<div class="aui-bar-tab-label">更多</div>
			</div>
		</footer>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				isOffLine: false,
				//显示模块
				showItem: 0,
				//登陆成功后的用户信息
				userInfo: {},
				isLogin: false,
				username: '',
				password: '',
				//所有好友聊天记录
				friendChatArr: [],
				//所有群组聊天记录
				groupChatArr: [],
				//好友添加申请
				subscribes: [],
				//好友列表
				friends: [],
				//群组列表
				groups: [],
			};
		},
		watch: {
			//监听好友聊天信息变化 来自：好友  群组  自己
			friendChatArr: function(arr, oldArr) {
				console.log('好友聊天信息 变化');
				App.$emit('onChatMsgSuccess', arr);
				App.computUnReadMsgNum();
			},
			//监听群组聊天信息变化 来自： 好友  群组  自己
			groupChatArr: function(arr, oldArr) {
				console.log('好友聊天信息 变化');
				App.$emit('onChatMsgSuccess', arr);
				App.computUnReadMsgNum();
			}
		},
		methods: {
			/**
			 * 和环信监听的事件绑定
			 */
			//网络连接成功
			onOnline() {
				console.warn('本机网络连接成功');
				this.isOffLine = false;
			},
			//网络掉线
			onOffline() {
				console.warn('本机网络掉线');
				this.isOffLine = true;
				dialog.alert({
					title: '警告',
					msg: '本机网络掉线！',
					buttons: ['确定'],
				});
			},
			//收到文本消息触发
			onTextMessage(message) {
				var self = this;
				var res_msg = {
					data: message.data,
					date: new Date().getTime(),
					id: message.id,
					from: message.from,
					to: message.to,
					is_mine: false,
					is_read: false,
					msg_type: 'text',
					chat_type: '',
				};
				if(message.type == 'chat') {
					res_msg.chat_type = 'single_chat';
					App.friendChatArr.push(res_msg);
				} else if(message.type == 'groupchat') {
					res_msg.chat_type = 'group_chat';
					App.groupChatArr.push(res_msg);
				}
				//保存本地
				//dbManager.saveChat(res_msg);
			},
			//收到图片消息
			onPictureMessage(message) {
				var self = this;
				var res_msg = {
					data: message.url, //
					date: new Date().getTime(),
					id: message.id,
					from: message.from,
					to: message.to,
					is_mine: false,
					is_read: false,
					msg_type: 'image', //
					chat_type: '',
				};
				if(message.type == 'chat') {
					res_msg.chat_type = 'single_chat';
					App.friendChatArr.push(res_msg);
				} else if(message.type == 'groupchat') {
					res_msg.chat_type = 'group_chat';
					App.groupChatArr.push(res_msg);
				}
				//保存本地
				//dbManager.saveChat(res_msg);
			},
			//收到 加好友请求
			onPresenceTypeSubscribe(message) {
				/*{
				 chatroom: false,
				 code: null,
				 from: "test1",
				 fromJid: "zj1406187962#layimtest_test1@easemob.com",
				 original_type: "subscribe",
				 presence_type: "",
				 status: "想添加您未好友",
				 to: "test4",
				 toJid: "zj1406187962#layimtest_test4@easemob.com",
				 type: "subscribe",
				}*/
				message.isRead = false;
				App.subscribes.push(message);
			},
			/**
			 * APP的方法
			 */
			//判断是否登录
			judgeIsLogin() {
				var self = this;
				var user = localStorage.getItem('user');
				var pwd = localStorage.getItem('pwd');
				if(user && pwd) {
					self.username = user;
					self.password = pwd;
				}
			},
			//
			registAction() {
				var self = this;
				self.$router.push({
					name: 'Regist',
				});
			},
			//登录事件
			loginAction(username, password) {
				toast.loading({
					title: "正在登陆",
				});
				var self = this;
				self.friendChatArr = [];
				self.groupChatArr = [];
				self.subscribes = [];
				console.log('点击登录 删掉之前记录');
				httpTool.login({
					user: self.username,
					pwd: self.password,
					success: function(userInfo) {
						console.log('登陆成功，%o', userInfo)
						setTimeout(function() {
							toast.hide();
							self.loginActionSuccess(userInfo);
						}, 1000);
					},
					error: function(err) {
						toast.hide();
						dialog.alert({
							title: '警告',
							msg: '登录失败',
							buttons: ['确定']
						});

					}
				});
			},
			//登陆成功
			loginActionSuccess(userInfo) {
				var self = this;
				self.showItem = 0;
				//dbManager.createTable(self.username);
				//dbManager.setUserInfo(userInfo);
				localStorage.setItem('user', self.username);
				localStorage.setItem('pwd', self.password);
				var self = this;
				console.log('登陆成功');
				self.isLogin = true;
				//查询好友 //查询群组
				self.refreshFriendAndGroupListAction()
			},
			//注册事件
			registCilck(username, password) {
				var self = this;
				httpTool.registerUser({
					user: username,
					pwd: password,
					success: function() {
						toast.success({
							title: "注册成功",
							duration: 2000
						});

					},
					error: function() {
						toast.fail({
							title: "注册失败",
							duration: 2000
						});

					},

				});
			},
			//打开聊天页面
			openChatView(friend) {
				console.log('打开聊天页面');
				var self = this;
				self.$router.push({
					name: 'Chat',
					params: friend
				});
			},
			//打开搜索页面
			openSearchView() {
				var self = this;
				self.$router.push({
					name: 'Search'
				});
			},
			//打开通知页面
			openNoticeView() {
				var self = this;
				self.$router.push({
					name: 'Notice'
				});
			},
			//打开添加好友页面
			addFriendsAction() {
				var self = this;
				self.$router.push({
					name: 'AddFriend'
				});
			},
			//打开 创建群组页面
			openCreatGroupView() {
				var self = this;
				self.$router.push({
					name: 'CreateGroup'
				});
			},
			//刷新好友列表和群组列表
			refreshFriendAndGroupListAction() {
				var self = this;
				//查询好友 //查询群组
				toast.loading({
					title: "获取好友和群组列表",
				});
				httpTool.getRoster(function(arr) {
					console.log('查询好友成功:%o', arr);
					self.friends = arr;
					httpTool.getListGroups(function(arr) {
						console.log('查询群组成功回调:%o', arr);
						self.groups = arr;
						toast.hide();
						self.computUnReadMsgNum();
					});
				});

			},
			//统计 所有好友的 未读消息数量
			computUnReadMsgNum() {
				var self = this;
				//好友消息 未读数
				$.each(self.friends, function(i, friend) {
					var num = 0;
					$.each(App.friendChatArr, function(j, msg) {
						if(msg.from == friend.id && msg.is_read == false) {
							num++;
						}
					});
					friend.msgNum = num;
				});
				//群组信息 未读数
				$.each(self.groups, function(i, group) {
					var num = 0;
					$.each(App.groupChatArr, function(j, msg) {
						if(msg.to == group.id && msg.is_read == false) {
							num++;
						}
					});
					group.msgNum = num;
				});
			},
			closeChat() {
				conn.close();
				this.isLogin = false;
			},
		},
		mounted() {
			App = this;
			//判断是否登录
			App.judgeIsLogin();
		},
	}
</script>

<style>
	.aui-content.app-body {
		bottom: 53px;
	}
	
	.aui-list-item.wechat-top {
		background-color: #f3f3f7;
	}
	
	.aui-list .wechat-avatar {
		width: 3rem;
	}
	
	.wechat-avatar .aui-row-padded {
		background-color: #dddee0;
		padding: 0.1rem;
		border-radius: 0.2rem;
		margin-left: -0.05rem;
		margin-right: -0.05rem;
	}
	
	.wechat-avatar .aui-row-padded [class*=aui-col-xs-] {
		padding: 0.05rem;
	}
	
	.wechat-avatar,
	.wechat-avatar>img {
		border-radius: 0.2rem;
	}
</style>