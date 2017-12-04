var syncRequest = require("sync-request")
var configInfo = require("./config")
var cheerIo = require("cheerio")
var fileSystem = require("fs")

class Article {
    constructor() {
        this.title = ""
        this.content = ""
    }
}

//抓取首页
var getHtml = () => {
    var url = "http://www.jianshu.com/"
    var options = {
        "headers": {
            "User-Agent": configInfo.userAgent,
            "Cookie": configInfo.cookie,
        }
    }
    var request = syncRequest("GET", url, options)
    var page = request.getBody("utf8")
    return page
}

//解析title，article
var getArticle = function(html) {
    html = cheerIo.load(html)
    var titles = html(".title")
    var abstracts = html(".abstract")
    var articleArray = []

    for (var i = 0; i < titles.length - 2; i++) {
        var article = new Article()
        var item = titles[i]
        var content = abstracts[i]
        var itemSelector = cheerIo.load(item)
        var contentSelector = cheerIo.load(content)
        article.title = itemSelector.text()
        article.content = dataOP(contentSelector.text())
        articleArray.push(article)
    }
    return articleArray
}

//去除空格
var dataOP = function(string) {
    return string.replace(/\s/g,'')
}

var saveData = (data) => {
    var path = "article.json"
    var parseData = JSON.stringify(data, null, 2)
    fileSystem.writeFileSync(path, parseData)
}

var __main = () => {
    var html = getHtml()
    var articleArray = getArticle(html)
    saveData(articleArray)
}

__main()
