class brain {
    constructor() {
        this.phase = 0
        this.user_config = JSON.parse(localStorage.getItem("userConfig"))
        this.keyword = {
            act : {"搜索":"search","查找":"search","寻找":"search",
            "搜":"search","播放":"paly","播":"paly","放":"paly","开始":"paly","执行":"paly"},
            scene : {"音乐":"music","歌曲":"music","歌":"music",
            "电影":"movie","视频":"movie"}
        }
    }

    imp(command) {
        let _this = this
        let p = new Promise((resolve, reject)=>{
            window.api.getBaiduLexer(command,(lexered)=>{
                let instruct = _this.lexerSplit(lexered.response)
                console.log("分词完毕",instruct)
                resolve(instruct)
             })
        })
        return p
    }

    lexerSplit(command){
        command = typeof command ==  'string' ?  JSON.parse(command) : command
        console.log("百度解析完毕,准备二次拆分!",command)
        let instruct = {acts:[],nouns:''}
        let nounLink = false  //名词链接
        for(let word of command.items){
            switch(word.pos){
                case "v":
                    let keyList = Object.keys(this.keyword.act)
                    keyList.forEach((name)=>{
                        name == word.item ? instruct.acts.push(this.keyword.act[name]) : null
                    })
                    break

                case "n":
                    if(nounLink){
                        instruct.nouns  = instruct.nouns + word.item
                        break
                    }else{
                        let keyList = Object.keys(this.keyword.scene)
                        keyList.forEach((name)=>{
                            if(name == word.item){
                                instruct.scene = this.keyword.scene[name]
                                nounLink = true  //开启名词链接
                            }
                        })
                    }
                    break
                
                case "m":
                    instruct.index = word.item

                default:
                    if(nounLink){
                        instruct.nouns  = instruct.nouns + word.item
                        break
                    }
            }
        }
        return instruct
    }

}

exports.brain = brain