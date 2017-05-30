function s(code) {
	var errorText = '';
	$.each(errorCodeArr, function(i, d) {
		if(d.code == code) {
			errorText = d.text || d.detail;
			return false;
		}
	})
	return errorText;
};
var errorCodeArr = [{
		"code": "0",
		"detail": "WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR",
	},
	{
		"code": "1",
		"detail": "WEBIM_CONNCTION_OPEN_ERROR",
	},
	{
		"code": "2",
		"detail": "WEBIM_CONNCTION_AUTH_ERROR",
	},
	{
		"code": "3",
		"detail": "WEBIM_CONNCTION_OPEN_USERGRID_ERROR",
	},
	{
		"code": "4",
		"detail": "WEBIM_CONNCTION_ATTACH_ERROR",
	},
	{
		"code": "5",
		"detail": "WEBIM_CONNCTION_ATTACH_USERGRID_ERROR",
	},
	{
		"code": "6",
		"detail": "WEBIM_CONNCTION_REOPEN_ERROR",
	},
	{
		"code": "7",
		"detail": "WEBIM_CONNCTION_SERVER_CLOSE_ERROR",
		"text": "客户端网络中断 (net::ERR_INTERNET_DISCONNECTED)"
	},
	{
		"code": "8",
		"detail": "WEBIM_CONNCTION_SERVER_ERROR",
		"text": "多端登录，被踢下线"
	},
	{
		"code": "9",
		"detail": "WEBIM_CONNCTION_IQ_ERROR",
	},
	{
		"code": "10",
		"detail": "WEBIM_CONNCTION_PING_ERROR",
	},
	{
		"code": "11",
		"detail": "WEBIM_CONNCTION_NOTIFYVERSION_ERROR",
	},
	{
		"code": "12",
		"detail": "WEBIM_CONNCTION_GETROSTER_ERROR",
	},
	{
		"code": "13",
		"detail": "WEBIM_CONNCTION_CROSSDOMAIN_ERROR",
	},
	{
		"code": "14",
		"detail": "WEBIM_CONNCTION_LISTENING_OUTOF_MAXRETRIES",
	},
	{
		"code": "15",
		"detail": "WEBIM_CONNCTION_RECEIVEMSG_CONTENTERROR",
	},
	{
		"code": "16",
		"detail": "WEBIM_CONNCTION_DISCONNECTED",
		"text": "服务端关闭了websocket链接"
	},
	{
		"code": "17",
		"detail": "WEBIM_CONNCTION_AJAX_ERROR",
	},
	{
		"code": "18",
		"detail": "WEBIM_CONNCTION_JOINROOM_ERROR",
	},
	{
		"code": "19",
		"detail": "WEBIM_CONNCTION_GETROOM_ERROR",
	},
	{
		"code": "20",
		"detail": "WEBIM_CONNCTION_GETROOMINFO_ERROR",
	},
	{
		"code": "21",
		"detail": "WEBIM_CONNCTION_GETROOMMEMBER_ERROR",
	},
	{
		"code": "22",
		"detail": "WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR",
	},
	{
		"code": "23",
		"detail": "WEBIM_CONNCTION_LOAD_CHATROOM_ERROR",
	},
	{
		"code": "24",
		"detail": "WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR",
	},
	{
		"code": "25",
		"detail": "WEBIM_CONNCTION_JOINCHATROOM_ERROR",
	},
	{
		"code": "26",
		"detail": "WEBIM_CONNCTION_QUITCHATROOM_ERROR",
	},
	{
		"code": "27",
		"detail": "WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR",
	},
	{
		"code": "28",
		"detail": "WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR",
	},
	{
		"code": "29",
		"detail": "WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR",
	},
	{
		"code": "30",
		"detail": "WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR",
	},
	{
		"code": "31",
		"detail": "WEBIM_CONNCTION_CALLBACK_INNER_ERROR",
		"text": "处理下行消息出错，try/catch抛出异常"
	},
	{
		"code": "32",
		"detail": "WEBIM_CONNCTION_CLIENT_OFFLINE",
		"text": "客户端断线"
	},
	{
		"code": "33",
		"detail": "WEBIM_CONNCTION_CLIENT_LOGOUT",
		"text": "客户端退出登录"
	},
	{
		"code": "34",
		"detail": "WEBIM_CONNCTION_CLIENT_TOO_MUCH_ERROR",
		"text": "同一浏览器打开标签页超过上限"
	},
	{
		"code": "35",
		"detail": "WEBIM_CONNECTION_ACCEPT_INVITATION_FROM_GROUP",
	},
	{
		"code": "36",
		"detail": "WEBIM_CONNECTION_DECLINE_INVITATION_FROM_GROUP",
	},
	{
		"code": "37",
		"detail": "WEBIM_CONNECTION_ACCEPT_JOIN_GROUP",
	},
	{
		"code": "38",
		"detail": "WEBIM_CONNECTION_DECLINE_JOIN_GROUP",
	},
	{
		"code": "39",
		"detail": "WEBIM_CONNECTION_CLOSED",
	},
	{
		"code": "100",
		"detail": "WEBIM_UPLOADFILE_BROWSER_ERROR",
	},
	{
		"code": "101",
		"detail": "WEBIM_UPLOADFILE_ERROR",
	},
	{
		"code": "102",
		"detail": "WEBIM_UPLOADFILE_NO_LOGIN",
	},
	{
		"code": "103",
		"detail": "WEBIM_UPLOADFILE_NO_FILE",
	},
	{
		"code": "200",
		"detail": "WEBIM_DOWNLOADFILE_ERROR",
	},
	{
		"code": "201",
		"detail": "WEBIM_DOWNLOADFILE_NO_LOGIN",
	},
	{
		"code": "202",
		"detail": "WEBIM_DOWNLOADFILE_BROWSER_ERROR",
	},
	{
		"code": "300",
		"detail": "WEBIM_MESSAGE_REC_TEXT",
	},
	{
		"code": "301",
		"detail": "WEBIM_MESSAGE_REC_TEXT_ERROR",
	},
	{
		"code": "302",
		"detail": "WEBIM_MESSAGE_REC_EMOTION",
	},
	{
		"code": "303",
		"detail": "WEBIM_MESSAGE_REC_PHOTO",
	},
	{
		"code": "304",
		"detail": "WEBIM_MESSAGE_REC_AUDIO",
	},
	{
		"code": "305",
		"detail": "WEBIM_MESSAGE_REC_AUDIO_FILE",
	},
	{
		"code": "306",
		"detail": "WEBIM_MESSAGE_REC_VEDIO",
	},
	{
		"code": "307",
		"detail": "WEBIM_MESSAGE_REC_VEDIO_FILE",
	},
	{
		"code": "308",
		"detail": "WEBIM_MESSAGE_REC_FILE",
	},
	{
		"code": "309",
		"detail": "WEBIM_MESSAGE_SED_TEXT",
	},
	{
		"code": "310",
		"detail": "WEBIM_MESSAGE_SED_EMOTION",
	},
	{
		"code": "311",
		"detail": "WEBIM_MESSAGE_SED_PHOTO",
	},
	{
		"code": "312",
		"detail": "WEBIM_MESSAGE_SED_AUDIO",
	},
	{
		"code": "313",
		"detail": "WEBIM_MESSAGE_SED_AUDIO_FILE",
	},
	{
		"code": "314",
		"detail": "WEBIM_MESSAGE_SED_VEDIO",
	},
	{
		"code": "315",
		"detail": "WEBIM_MESSAGE_SED_VEDIO_FILE",
	},
	{
		"code": "316",
		"detail": "WEBIM_MESSAGE_SED_FILE",
	},
	{
		"code": "317",
		"detail": "WEBIM_MESSAGE_SED_ERROR",
	},
	{
		"code": "400",
		"detail": "STATUS_INIT",
	},
	{
		"code": "401",
		"detail": "STATUS_DOLOGIN_USERGRID",
	},
	{
		"code": "402",
		"detail": "STATUS_DOLOGIN_IM",
		"text": "取到token 但是没有连上xmpp server"
	},
	{
		"code": "403",
		"detail": "STATUS_OPENED",
	},
	{
		"code": "404",
		"detail": "STATUS_CLOSING",
	},
	{
		"code": "405",
		"detail": "STATUS_CLOSED",
	},
	{
		"code": "406",
		"detail": "STATUS_ERROR",
	}
];
