/**
 * 1:歌曲搜索接口
 *      请求地址：https://autumnfish.cn/search
 *      请求方法：get
 *      请求参数：keywords（查询关键字）
 *      响应内容：歌曲搜索结果
 * 2.歌曲url获取接口
 *      请求地址：https://autumnfish.cn/song/url
 *      请求方法：get
 *      请求参数：id
 *      响应内容：歌曲的url地址
 * 3.歌曲详情获取
 *      请求地址：https://autumnfish.cn/song/detail
 *      请求方法：get
 *      请求参数：ids
 *      响应内容：歌曲详情，包含封面信息
 * 4.热门评论获取
 *      请求地址：https://autumnfish.cn/comment/hot?type=0
 *      请求方法：get
 *      请求参数：id
 *      响应内容：歌曲热门评论
 * 4.mv地址获取
 *      请求地址：https://autumnfish.cn/mv/url
 *      请求方法：get
 *      请求参数：id
 *      响应内容：mv的地址
 */
var app = new Vue({
    el: '#player',
    data: {
        //歌曲搜索
        query: "",
        //歌曲搜索结果
        musicList: [],
        //歌曲播放url
        musicUrl:"",
        //歌曲封面
        musicCover:"",
        //歌曲评论
        hotComments:[],
        //歌曲播放状态
        isPlaying:false,
        //遮罩层显示状态
        isShow: false,
        //mv路径
        mvUrl:""
    },
    methods: {
        //歌曲搜索
        searchMusic: function() {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
                .then(function(res){
                    //console.log(res)
                    that.musicList = res.data.result.songs;
                }, function(err){
                   //..
                });
        },
        
        // 歌曲播放
        playMusic: function(musicId) {
            //console.log(musicId);
            var that = this;
            //获取歌曲地址
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
                .then( function(res){
                    // console.log(res);
                    that.musicUrl=res.data.data[0].url;
                }, function(err){
                    //..
                });
            
            //歌曲详情
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then( function(res){
                // console.log(res);
                that.musicCover=res.data.songs[0].al.picUrl;
            }, function(err){
                //..
            });

            //歌曲评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then( function(res){
                // console.log(res);
                that.hotComments=res.data.hotComments
            }, function(err){
                //..
            });
        },

        //播放
        play: function() {
            this.isPlaying=true;
        },
        //暂停 
        pause: function() {
            this.isPlaying=false;
        }, 

        //播放mv
        playMv: function(mvId) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvId)
                .then( function(res){
                    console.log(res);
                    that.isShow=true;
                    that.mvUrl=res.data.data.url;
                }, function(err){
                    //..
                });
        },

        //隐藏遮罩层
        hide: function(){
            this.isShow = false;
        }
    },
});