function command(text){
    if(event.keyCode==13){
        pz.print(text)
        showText()
    }
}

function log(text,tag="mylog"){
    console.log(tag,text)
}

function showText(){
    var inputBox = $("#textInput")
    if(!!inputBox.length){
        inputBox.remove();
    }else{
        var textInput = `<input id="textInput" placeholder="say."   value="搜索音乐再见只是陌生人" onkeydown="command(this.value)" />`
        $('body').append(textInput)
        console.dir()
        $("#textInput").focus()
    }
}

function closeSelf(id){
    console.dir("关闭了")
    $(`#${id}`).remove()
    pz.show()
}

function getClientHeight()
{
  var clientHeight=0;
  if(document.body.clientHeight&&document.documentElement.clientHeight)
  {
  var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
  }
  else
  {
  var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
  }
  return clientHeight;
}