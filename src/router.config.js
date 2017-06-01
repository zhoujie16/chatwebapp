import Chat from './components/Chat.vue'
import GroupManage from './components/GroupManage.vue'
import CreateGroup from './components/CreateGroup.vue'
import AddGroupMembers from './components/AddGroupMembers.vue'
import Notice from './components/Notice.vue'
import Search from './components/Search.vue'
import GroupMenbers from './components/GroupMenbers.vue'
import AddFriend from './components/AddFriend.vue'
import Regist from './components/Regist.vue'
export default {
	routes: [{
		path: '/chat',
		name: 'Chat',
		component: Chat,
		children: [{
			path: '/chat/groupmanage',
			name: 'GroupManage',
			component: GroupManage,
			children: [{
				path: '/chat/groupmanage/addgroupmenbers',
				name: 'AddGroupMembers',
				component: AddGroupMembers,
			}, {
				path: '/chat/groupmanage/groupMenbers',
				name: 'GroupMenbers',
				component: GroupMenbers,
			}],
		}],
	}, {
		path: '/creategroup',
		name: 'CreateGroup',
		component: CreateGroup
	}, {
		path: '/notice',
		name: 'Notice',
		component: Notice
	}, {
		path: '/search',
		name: 'Search',
		component: Search
	}, {
		path: '/addfriend',
		name: 'AddFriend',
		component: AddFriend
	}, {
		path: '/regist',
		name: 'Regist',
		component: Regist
	}]
}