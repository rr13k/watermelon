
window.onload = function(){
    (function(){
        // const {serverControl} = require("./src/js/server/serverControl");
        const {watermelon} = require("./src/js/watermelon/watermelon");
        const {apiControl} = require("./src/js/apiControl/apiControl");
        $.getJSON("./config/user_conifg.json",function(res){
            localStorage.setItem("userConfig",JSON.stringify(res))
        })
        window.api = apiControl
        // server =  new serverControl
        window.watermelon = new watermelon()
        
        window.addEventListener("message",res=>{
            res.data.method ==  "closeSelf" ? closeSelf(res.iframe) : null;
        },false)
            
        }())
}