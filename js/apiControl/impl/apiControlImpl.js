const {xmlHttp} = require("../../tools/xmlHttp");

 
class apiControlImpl{

    getBaiduToken(AiType,callback){
        let userConfig = JSON.parse(localStorage.getItem('userConfig')).baidu_Ai_config
        let url = `https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=${userConfig[AiType].client_id}&client_secret=${userConfig[AiType].client_secret}`
        xmlHttp.get({url},res=>{
            callback(res)
        })
    }

    getBaiduAudioTTS(text,callback){
        new Promise((resolve, reject)=>{
            this.getBaiduToken('audio_tts',res=>{
                let data = JSON.parse(res.response)
                resolve(data.access_token);
            })
        }).then((token)=>{
           let url = `http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=${token}&tex=${text}&vol=9&per=0&spd=5&pit=5&aue=3`
           xmlHttp.get({url,responseType:'blob'},res=>{
            callback(res)
        })
        })
    }

    getBaiduLexer(text,callback){
        new Promise((resolve, reject)=>{
            this.getBaiduToken('lexer',res=>{
                let data = JSON.parse(res.response)
                resolve(data.access_token);
            })
        }).then((token)=>{
           let url = `https://aip.baidubce.com/rpc/2.0/nlp/v1/lexer?charset=UTF-8&access_token=${token}`
           xmlHttp.post({url,body:{text}},res=>{
            callback(res)
        })
        })
    }

    getMusicList(music,callback){
        let url = `https://v1.itooi.cn/${music.company}/search?keyword=${music.name}&type=song&pageSize=${music.pageSize}&page=0`
        xmlHttp.get({url},res=>{
            callback(res)
        })
    }

    getSongAudio(index,callback){
        let music_list = JSON.parse(localStorage.getItem("musicList"))
        let playMusic =  music_list[index - 1]
        var url =  `https://v1.itooi.cn/${playMusic.company}/url?id=${playMusic.id}&quality=128`
        xmlHttp.head({url,timeout:1000},res=>{
            callback(res)
        })
    }

}

exports.apiControlImpl = apiControlImpl