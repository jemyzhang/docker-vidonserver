<!--<div class="posterMenu">
	<p class="mediaName">{$P.multilang.index_38}</p>					
</div>-->
{#foreach $T as eachMovie}
	{#if $T.eachMovie.setflag}
		<div class="box collectionmovie click_movieset lazyload_item">
			<div class="pic">
				<div class="img lazyload_img" mediatype="movieset" fileindex="{$T.eachMovie.fileindex}" fileid="{$T.eachMovie.fileid}" tempPath="{$T.eachMovie.thumbnail}">
					<div class="collectionbg" >
						<span class="Moviescount">{$T.eachMovie.filecount}</span>
					</div>
				</div>
				<p class="imgname" title="{$T.eachMovie.name}">{$T.eachMovie.name}</p>
			</div>
		</div>
	{#else}
		<div class="box singlemovie click_movie lazyload_item">
			<div class="pic">
				<div class="img lazyload_img" mediatype="movie" fileindex="{$T.eachMovie.fileindex}" fileid="{$T.eachMovie.fileid}" tempPath="{$T.eachMovie.thumbnail}" filepath="{$T.eachMovie.filepath}">
					<div class="singleimgbg">
						<a href="javascript:;" class="playerbtn" ></a>
						<a href="javascript:;" class="editbtn type_movie"></a>
						<a href="javascript:;" class="morebtn"></a>
						<ul class="morelist"></ul>
					</div>
					<div class="collectionbg" style="display:none;" >
						<span class="Moviescount">{$T.eachMovie.filecount}</span>
					</div>
				</div>
				<p class="imgname" title="{$T.eachMovie.name}">{$T.eachMovie.name}</p>
			</div>
		</div>
	{#/if}
{#/for}
