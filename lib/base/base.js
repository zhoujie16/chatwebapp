/**
 * 保存登录信息和聊天记录
 * 登录信息就直接保存在 localStorage
 */

var dbManager = function() {
	function Manager() {
		//创建数据库
		this.db = openDatabase('chatdb', '1.0', '保存登录信息和聊天记录', 10 * 1024 * 1024, function() {
			console.log('chatdb open ok');
		});
		//表名 (登录后 id_'+this.tableName+')
		this.tableName = 'chatlist';

	};
	/**
	 * 创建表
	 * @param {Object} user_id
	 */
	Manager.prototype.createTable = function(user_id) {
		//创建聊天记录表格
		var _this = this;
		this.tableName = 'chatlist' + user_id;
		this.db.transaction(function(tx) {
			tx.executeSql('create table IF NOT EXISTS ' + _this.tableName + ' (m_data,m_date,m_id,m_from,m_to,m_is_mine,m_is_read,m_msg_type,m_chat_type,m_status)');
		});
	};
	/**
	 * 保存 userInfo（登陆成功后）
	 */
	Manager.prototype.setUserInfo = function(userInfo) {
		if(userInfo) {
			localStorage.setItem('userinfo', JSON.stringify(userInfo));
		}
	};
	/**
	 * 读取 userInfo
	 * @param userInfo
	 */
	Manager.prototype.getUserInfo = function(userInfo) {
		var userinfo = localStorage.getItem('userinfo');
		if(userinfo) {
			return JSON.parse(userinfo);
		}
	};
	/**
	 * 插入一条聊天记录
	 * @param message
	 */
	Manager.prototype.saveChat = function(message) {
		var _this = this;
		var db = openDatabase('chatdb', '1.0', '保存登录信息和聊天记录', 10 * 1024 * 1024, function() {
			console.log('chatdb open ok');
		});
		db.transaction(function(tx) {
			tx.executeSql('insert into ' + _this.tableName + ' (m_data,m_date,m_id,m_from,m_to,m_is_mine,m_is_read,m_msg_type,m_chat_type,m_status) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.data, message.date, message.id, message.from, message.to, message.is_mine, message.is_read, message.msg_type, message.chat_type, message.status], function(e) {
				console.warn('插入数据 ok');
			}, function(e) {
				console.warn('插入数据 error')
			});
		});
	};
	/**
	 * 读取 用户 聊天记录(单聊)
	 * @param {Object} mine
	 * @param {Object} to
	 * @param {Object} success
	 */
	Manager.prototype.readSingleChat = function(mine, to,success) {	
		var _this = this;
		this.db.transaction(function(tx) {
			tx.executeSql('select * from ' + _this.tableName + ' where m_from = ? and m_to = ? or m_from = ? and m_to = ? order by m_date desc limit 0, 100', [mine, to, to, mine], function(tx, results) {
				var arr = [];
				var len = results.rows.length,
					i;
				for(i = 0; i < len; i++) {
					var message = results.rows.item(i);
					arr.unshift(message);
				}
				success(arr);
			}, null);
		});
	};
	/**
	 * 读取 用户 聊天记录(群组)
	 * @param {Object} groupid
	 * @param {Object} success
	 */
	Manager.prototype.readGroupChat = function(groupid, success) {
		var _this = this;
		this.db.transaction(function(tx) {
			tx.executeSql('select * from ' + _this.tableName + ' where m_to = ? order by m_date desc limit 0, 100', [groupid], function(tx, results) {
				var arr = [];
				var len = results.rows.length,
					i;
				for(i = 0; i < len; i++) {
					var message = results.rows.item(i);
					arr.unshift(message);
				}
				success(arr)
			}, null);
		});
	};
	/**
	 * 读取 所有聊天记录 (单聊)
	 * @param {Object} success
	 */
	Manager.prototype.readSingleChat = function(success) {	
		var _this = this;
		this.db.transaction(function(tx) {
			tx.executeSql('select * from ' + _this.tableName + ' where m_from = ? and m_to = ? or m_from = ? and m_to = ? order by m_date desc limit 0, 100', [mine, to, to, mine], function(tx, results) {
				var arr = [];
				var len = results.rows.length,
					i;
				for(i = 0; i < len; i++) {
					var message = results.rows.item(i);
					arr.unshift(message);
				}
				success(arr);
			}, null);
		});
	};
	/**
	 * 读取 所有 聊天记录(群组)
	 * @param {Object} success
	 */
	Manager.prototype.readGroupChat = function(success) {
		var _this = this;
		this.db.transaction(function(tx) {
			tx.executeSql('select * from ' + _this.tableName + ' where m_to = ? order by m_date desc limit 0, 100', [groupid], function(tx, results) {
				var arr = [];
				var len = results.rows.length,
					i;
				for(i = 0; i < len; i++) {
					var message = results.rows.item(i);
					arr.unshift(message);
				}
				success(arr)
			}, null);
		});
	};
	/**
	 * 修改一条聊天记录  (修改 已读状态 和 发送状态)
	 * @param id 用户id
	 * @param date 发送时间
	 */
	Manager.prototype.updateChat = function(message) {
		var _this = this;
		this.db.transaction(function(tx) {
			tx.executeSql('update ' + _this.tableName + ' set m_is_read = ? , m_status = ? where m_id = ? and m_date = ?', [message.is_read, message.status, message.id, message.date]);
		});
	};
	/**
	 * 删除聊天记录
	 * @param id
	 */
	Manager.prototype.deleteChat = function(id) {
		var _this = this;
		var sql = 'delete from ' + _this.tableName + '';
		if(id) {
			sql = 'delete from ' + _this.tableName + ' where m_id = ' + id;
		}
		this.db.transaction(function(tx) {
			tx.executeSql(sql);
		});
	};
	return new Manager();
}();

//aui 组件初始化
var dialog = new auiDialog();
var toast = new auiToast();