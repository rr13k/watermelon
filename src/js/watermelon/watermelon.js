const {video} = require("./video");
const {music} = require("./music");
const {brain} = require("./brain");

class watermelon{
    constructor(){
        this.sayStop = true
        this.phase = 0
        this.brain = new brain
        this.video = new video
        this.music = new music
        this.brain = new brain
        this.initSoureX = window.screenLeft
        let {ipcRenderer} = require('electron')
        this.ipc = ipcRenderer
        this.renderUi()
    }
    
    dragInit(){
        var drag = require("electron-drag");
        drag(`#face`);
    }

    getAudio(text){
        var _this = this
        window.api.getBaiduAudioTTS(text,res=>{
            var is_mp3 = 'audio/mp3' === res.getResponseHeader('Content-type');
            var reader = new FileReader();
            reader.addEventListener("loadend",()=>{
                if (!is_mp3) return console.error(reader.result);
                _this.saying(reader.result)
            });
            reader[is_mp3 ? 'readAsDataURL' : 'readAsText'](res.response);
        })
    }
    
    saying(audio){
        var my_audio = document.createElement('audio');
        my_audio.setAttribute('autoplay','autoplay');
        my_audio.setAttribute('controls','controls');
        my_audio.autoplay = true
        my_audio.src = audio
        $('body').append(my_audio)
    }

    say(text){
        this.getAudio(text)
    }

    openMusaicList(promise){
        let _this = this
        promise.then(res=>{
            let name = "musicList"
            let musicData = _this.music.formatTidy(res)
            localStorage.setItem('musicList',JSON.stringify(musicData))
            let exist = !_this.ipc.sendSync("wind_if_life",name)
            if(exist){
                _this.ipc.send('createWin',{
                    html:"./src/page/musicList.html",
                    name:name,
                    width:1000,
                    height:500,
                })
            }else{
                _this.ipc.send("even_control", {type:"update",name,evenName:"music_data_update"} )
            }
        })
    }

    commandParse(command){
        let p = this.brain.imp(command)
        let self = this
        p.then(instruct=>{
            for(let act of instruct.acts){
                switch (act){
                    case "search":
                        let promise = self[instruct.scene].search(instruct.nouns)
                        self.openMusaicList(promise)
                        break
                    case "paly":
                        this.music.play(parseInt(instruct.index))
                        break
                }
            }
        })
    }

    showInput(){
        let inputBox =  document.getElementById('user_input_control')
        inputBox.style.display =  inputBox.style.display != "none" ? "none" : "block" 
    }

    renderElf(){
        var _this = this
        var face=`<img id="face"  src="./assets/watermelon.png"/>`
        var face = $('body').append(face)
        $(`#face`).on("click",()=>{
        _this.initSoureX != window.screenLeft ? _this.initSoureX = window.screenLeft : this.showInput()
        })
        this.dragInit()
    }

    renderInput(){
        let _this = this
        let user_input_control = `<div  id="user_input_control">
        <input type="text" value="" id="user_input" placeholder="search">
        <img src="./assets/yin_tao.svg" class="inputIco"></div>`
        $('body').append(user_input_control)
        $(`#user_input`).on("keydown",(e)=>{
            if(e.keyCode==13){
                let command = e.currentTarget.value
                _this.commandParse(command)
                e.currentTarget.value = ''
        }
        })
    }

    renderUi(){
        this.renderElf()
        this.renderInput()
    }
}

exports.watermelon = watermelon