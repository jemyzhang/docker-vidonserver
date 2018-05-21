
{#foreach $T as eachVideo}
	<div class="box2 singlemovie click_video lazyload_item">
		<div class="pic">
			<div class="img lazyload_img" mediatype="video" fileindex="{$T.eachVideo.fileindex}" fileid="{$T.eachVideo.idfile}" filepath="{$T.eachVideo.file}" tempPath="{$T.eachVideo.thumbnail}">
				<div class="singleimgbg">
					<a href="javascript:;" class="playerbtn"></a>
					<a href="javascript:;" class="editbtn type_video"></a>
					<a href="javascript:;" class="morebtn"></a>
					<ul class="morelist"></ul>		
				</div>
			</div>
			<p class="imgname" title="{$T.eachVideo.title}">{$T.eachVideo.title}</p>
		</div>
	</div>
{#/for}
