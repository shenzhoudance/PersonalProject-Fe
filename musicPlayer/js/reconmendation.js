//设置背景
var loadSg = function() {
	var sgList = e('#id-singer-list')
	for(var i = 0; i < singerList.length; i++) {
		var basePath = 'img/'
		var singer =  singerList[i]
		var path = basePath + singer.imgPath
    var singerName = singer.name
		var html = `
		<div class="singer" data-sgnum=${i}>
        <span class=sg-photo1 style="background-image:url(${path})"></span>
        <span class=sg-name>${singerName}</span>
    </div>
		`
		appendHtml(sgList, html)
	}
}

var showSongs = function(singer, index) {
	var basePath = 'img/'
	var path = basePath + singer[0].imgPath
	var singerName = singer[0].singer
	var sgIndex = index
	var html1 = `
	<div class=singer-songs data-sgnum=${sgIndex}>
			<div class="singer left">
				<span class=sg-photo2 style="background-image:url(${path})"></span>
				<span class=sg-name>${singerName}</span>
			</div>
			<div class="songs right">
			</div>
	</div>
	`
	var songsList = e('#id-songs-list')
	appendHtml(songsList, html1)
	for(var i = 0; i < singer.length; i++) {
		var songName = singer[i].name
		var duration = singer[i].duration
		var html2 = `
		<div class=music-info data-snum=${i}>
			<span class=music-index data-num=0>${i+1}</span>
			<span class=music-name>${songName}</span>
			<span class=music-duration>${duration}</span>
		</div>
		`
		var songs = e('.songs')
		appendHtml(songs, html2)
	}
}

//点击展开歌手个人页面
var bindEventShowSongs = function() {
    bindAll('.sg-photo1', 'click', function(event) {
				var sgIndex = this.parentNode.dataset.sgnum
				var self = event.target
				var singer = songBook[sgIndex]
				showSongs(singer, sgIndex)
				var songsList = e('#id-songs-list')
				var singerList = e('#id-singer-list')
				songsList.classList.add('show')
				singerList.classList.remove('show')
				bindEventShowSg()
				bindEventAddSongs(sgIndex)
    })
}
// 返回众人页面
var bindEventShowSg = function() {
    bindAll('.sg-photo2', 'click', function(event) {
				var songsList = e('#id-songs-list')
				var singerList = e('#id-singer-list')
				var self = event.target
				var singerSongs = self.closest('.singer-songs')
				songsList.removeChild(singerSongs)
				toggleClass(songsList, 'show')
				toggleClass(singerList, 'show')
    })
}

var bindEventAddSongs = function(sgIndex) {
    bindAll('.music-info', 'click', function(event) {
        var sIndex = this.dataset.snum
        AddFromBook(sgIndex, sIndex)
		})
}
//点击更新列表
var AddFromBook = function(sgIndex, sIndex) {
	log('sgIndex'+sgIndex)
	log('sIndex'+sIndex)
	var addMusic = songBook[sgIndex][sIndex]
	log(addMusic)
	for(var i = 0; i < musicList.length; i++) {
		var music = musicList[i].music
		if(music == addMusic.music) {
			log('播放列表已存在该歌曲')
			CutPlay(musicList[i], i)
			return
		}
	}
	musicList.push(addMusic)
	UpdateMusicList()
	var n = musicList.length - 1
	CutPlay(addMusic, n)
}

loadSg()

bindEventShowSongs()
