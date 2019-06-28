class music {
    constructor(){
        this.kugou = "kugou"
        this.qq = "tencent"
        this.wangyi = "netease"
        this.baidu = "baidu"
        this.migu = "migu"

        this.newSeachName = ""
    }

    musicPlayIng(audio){
        let mp3 = $("#music_mp3_control")
        if(!!mp3.length){
            mp3.remove()
        }
        let my_audio = document.createElement('audio');
        my_audio.id  = "music_mp3_control"
        my_audio.setAttribute('autoplay','autoplay');
        my_audio.setAttribute('controls','controls');
        my_audio.autoplay = true
        my_audio.src = audio
        $('body').append(my_audio)
    }

    play(index){
        window.api.getSongAudio(index,res=>{
            if(res.status != 200){
                console.error("歌曲资源无效!")
                watermelon.say("歌曲资源无效!")
                return
            }
            this.musicPlayIng(res.responseURL)
        })
    }

    getmusicData(catParam,company){
        let p = new Promise(function(resolve, reject){
            window.api.getMusicList(catParam,res=>{
                res = typeof res != 'string' ? res : JSON.parse(res);
                let data = JSON.parse(res.response).data
                data.company = catParam.company
                resolve(data);
            })
        })
        return p
    }
    
    cloneMusic(musicObj){
        musicObj.id = musicObj.id || '-'
        musicObj.name = musicObj.name || '-'
        musicObj.singer = musicObj.singer || '-'
        musicObj.time = musicObj.time || '-'
        musicObj.album = musicObj.album || '-'
        return musicObj
    }

    SturnM(num){
        var _m = parseInt(num/60) 
        var m =  _m < 10 ? '0'+ _m : _m
        var s = num  % 60
        return  `${m}:${s}`
    }

    /**
     * @description 音乐格式归一化
     * @param {*} musicList
     * @returns 格式化的音乐列表
     * @memberof music格式整理,如果你考虑整合它，请新建类
     */
    formatTidy(musicList){
        let cleanList= []
        for(let musics of musicList){
            let i = musics
            switch(i.company){
                case "netease":
                    i.songs.map((n)=>{
                        let singer = ''
                        for(let i of n.ar){
                            singer = singer + i.name
                        }
                        let album = n.al.name != "" ?   `《${n.al.name}》` :  '-'
                        let musicObj =  this.cloneMusic({
                            id:n.id,
                            name:n.name,
                            singer,
                            time:'-',
                            album,
                            company:i.company
                        })
                        cleanList.push(musicObj)
                    })
                    break
                case "tencent":
                    i.list.map((n)=>{
                        let singer = ''
                        for(let i of n.singer){
                            singer = singer + i.name
                        }
                        let album =  n.albumname != "" ?   `《${n.albumname}》` :  '-'
                        let musicObj =  this.cloneMusic({
                            id:n.songmid,
                            name:n.songname,
                            singer,
                            time: this.SturnM(n.interval),
                            album,
                            company:i.company
                        })
                        cleanList.push(musicObj)
                    })
                    
                    break
                case "kugou":
                    i.info.map((n)=>{
                        let album =  n.album_name != "" ?   `《${n.album_name}》` :  '-'
                        let musicObj =  this.cloneMusic({
                            id:n.hash,
                            name:n.songname,
                            singer:n.singername,
                            time: this.SturnM(n.duration),
                            album,
                            company:i.company
                        })
                        cleanList.push(musicObj)
                    })
                    break
            }
            
        }
        return  this.sorting(cleanList) 
    }
    
    search(musicName){
        var self = this
        this.newSeachName = musicName
        let p = Promise.all([
            self.getmusicData({
                "company":this.qq,
                "name":musicName,
                "pageSize":4
            }),
            self.getmusicData({
                "company":this.wangyi,
                "name":musicName,
                "pageSize":4
            }),
            self.getmusicData({
                "company":this.kugou,
                "name":musicName,
                "pageSize":4
            }),
        ])
        return p
    }

    /**
     * @description 对列表进行排序
     * @param {*} musicList 音乐列表
     * @param {*} obj 
     * @returns
     * @memberof music
     */
    sorting(musicList){
        let _this = this
        musicList.forEach((music) => {
            let index = 0
            if(music.name.indexOf(_this.newSeachName) > -1){
                index++
                if(music.name == _this.newSeachName){
                    index++
                }
            }
            music.index = index
        });
        let _list = musicList.sort((a,b)=>{
            return b.index - a.index
        })
        console.log("排序后的音乐列表",_list)
        return _list
    }

}

exports.music = music