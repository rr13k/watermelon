class video{
    constructor(){
        this.youku= {
            movie_url:`https://movie.youku.com/`
        }
    }

    getMovieList(){
        let _this = this
        api.get({
            url:this.youku.movie_url
        },function(res){
            console.dir(res)
            let dom = _this.parseDom(res.responseText)
            console.dir(dom)
        })
    }

    parseDom(arg) {
    　　 var objE = document.createElement("div");
    　　 objE.innerHTML = arg;
    　　 return objE;
    };

    
}

exports.video = video

// video.getMovieList()

