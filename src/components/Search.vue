<template>
    <div class="full-screen">
        <header class="aui-bar aui-bar-nav">
            <a @click="backAction" class="aui-pull-left aui-btn">
                <span class="aui-iconfont aui-icon-left"></span>返回
            </a>
            <div class="aui-title">搜索</div>
        </header>
        <div class="aui-searchbar" id="search" style="margin-top: 48px">
            <div class="aui-searchbar-input aui-border-radius" tapmode onclick="doSearch()">
                <i class="aui-iconfont aui-icon-search"></i>
                <form action="javascript:search();">
                    <input  v-model="searchText" type="search" placeholder="请输入搜索内容" id="search-input">
                </form>
            </div>
            <div class="aui-searchbar-cancel" tapmod>取消</div>
        </div>
        <div class="aui-content app-body" style="top: 100px;">
            <ul class="aui-list aui-media-list">
                <li v-if="item.name.indexOf(searchText)!=-1||item.id.indexOf(searchText)!=-1" v-for="(item,i) in allFriends" class="aui-list-item aui-list-item-middle">
                    <div class="aui-media-list-item-inner">
                        <div class="aui-list-item-media wechat-avatar">
                            <!--<div v-if="item.msgNum>0" class="aui-badge">{{item.msgNum}}</div>-->
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

    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchText: '',
                allFriends: [],
            };
        },
        methods: {
            backAction() {
                this.$router.back();
            },
        },
        mounted() {
            var self = this;
            $.each(App.friends, function (i, item) {
                self.allFriends.push(item);
            });
            $.each(App.groups, function (i, item) {
                self.allFriends.push(item);
            });

        },
    }
</script>

<style scoped="scoped">

</style>