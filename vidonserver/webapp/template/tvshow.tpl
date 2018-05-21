
{#foreach $T as eachTVShow}
	<div class="box singlemovie click_tvshow">
		<div class="pic">
			<div class="img" mediatype="tvshow" fileindex="{$T.eachTVShow.fileindex}" fileid="{$T.eachTVShow.idtvshow}" filepath="{$T.eachTVShow.file}" style="background-image:url({$T.eachTVShow.thumbnail})">
				<div class="singleimgbg">
					<!--<a href="javascript:;" class="playerbtn" ></a>-->
					<a href="javascript:;" class="editbtn type_tvshow"></a>
					<a href="javascript:;" class="morebtn"></a>
					<ul class="morelist"></ul>
				</div>
			</div>
			<p class="imgname" title="{$T.eachTVShow.title}">{$T.eachTVShow.title}</p>
		</div>
	</div>
{#/for}
