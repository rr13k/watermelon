class xmlHttp{

    constructor(){
    }

    get(req,callback){
        let http = new XMLHttpRequest()
        http.onreadystatechange = function(){
            http.readyState == 4 && http.status==200 ? callback(http): null
        }
        http.responseType = req.responseType || ''
        var async  =  typeof req.async ==  'boolean' ?  req.async : true
        http.open("GET", req.url,async);
        this.SetHeader(http,req.header)
        http.send();
    }

    post(req,callback){
        let http = new XMLHttpRequest()
        http.onreadystatechange = function(){
            http.readyState == 4 && http.status==200 ? callback(http): null
        }
        var async  =  typeof req.async ==  'boolean' ?  req.async : true
        http.open("POST", req.url,async);
        this.SetHeader(http,req.header)
        http.send(JSON.stringify(req.body) );
    }

    head(req,callback){
        let http = new XMLHttpRequest()
        http.onreadystatechange = function(){
            http.readyState == 4 ?  callback(http) :null
        }
        typeof req.timeout == "number" ?  http.timeout = req.timeout : null
        http.responseType = req.responseType || ''
        var async  =  typeof req.async ==  'boolean' ?  req.async : true
        http.open("HEAD", req.url,async);
        this.SetHeader(http,req.header)
        http.send();
    }

    SetHeader(http,header){
        for(var i in header){
            http.setRequestHeader(i, header[i]);
        }
    }

}

exports.xmlHttp = new xmlHttp()