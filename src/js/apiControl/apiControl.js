const {Interface} = require("../tools/Interface");
const {apiControlImpl} = require("./impl/apiControlImpl");

class apiControl{
    constructor(){
        this.baiduApi =  new Interface('baiduApi', ['getBaiduToken','getBaiduAudioTTS','getSongAudio','getMusicList']);
        
        this.apiServer = new apiControlImpl()
        this.check(this.apiServer)
    }

    check(server){
        Interface.ensureImplements(server, this.baiduApi);
    }
}

exports.apiControl = new apiControl().apiServer