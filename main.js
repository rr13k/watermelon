const {
    app,ipcMain,
    BrowserWindow
} = require('electron')

let win
var child_win = []

function createWindow() {
    win = new BrowserWindow({
        // width: 900,
        // height: 900,
        width: 150,
        height: 170,
        alwaysOnTop:true,
        skipTaskbar:true,
        autoHideMenuBar:true,

        frame:false,
        transparent:true, //开启调试会使该属性无效
        webPreferences :{
            nodeIntegration: true,
            webSecurity: false,
        }
    })
    win.loadFile('index.html')
    // win.webContents.openDevTools()
    win.on('closed', () => {
        win = null
    })
}

ipcMain.on('createWin',(even,data)=>{
    let _child = new BrowserWindow({
        width: data.width,
        height: data.height,
        autoHideMenuBar:true,
        frame:false,

        transparent:true,
        webPreferences :{
            nodeIntegration: true,
            webSecurity: false,
        }
    })

    _child.name = data.name
    _child.loadFile(data.html)
    // _child.webContents.openDevTools()
    child_win.push(_child)
    _child.on('closed', () => {
        child_win.forEach((element,index) => {
            if(element.name == _child.name){
                child_win.splice(index,index+1)
            }
        });
        _child = null
    })
})

ipcMain.on('wind_if_life',(even,name)=>{
    for(i in child_win){
        if(child_win[i].name == name){
            even.returnValue = true
        }
    }
    even.returnValue = false
})

ipcMain.on('even_control',(even,arg)=>{
    switch(arg.type){
        case "update":
        child_win.map(child =>{
            if(child.name == arg.name){
                child.webContents.send(arg.evenName,"")
            }
        })
    }
})

app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})