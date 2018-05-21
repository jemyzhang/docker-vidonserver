<!--<div class="posterMenu">
	<p class="mediaName">{$P.multilang.index_38}</p>					
</div>-->
{#foreach $T as eachData}
	{#if $T.eachData.mediatype == "movie"}
		{#if $T.eachData.filecount > 1}
			<div class="box collectionmovie click_movieset_inmultipage lazyload_item">
				<div class="pic">
					<div class="img lazyload_img" mediatype="movieset" fileindex="{$T.eachData.fileindex}" fileid="{$T.eachData.mediaid}" tempPath="{$T.eachData.thumbnail}">
						<div class="collectionbg" >
							<span class="Moviescount">{$T.eachData.filecount}</span>
						</div>
					</div>
					<p class="imgname" title="{$T.eachData.title}">{$T.eachData.title}</p>
				</div>
			</div>
		{#else}
			<div class="box singlemovie click_movie_inmultipage lazyload_item">
				<div class="pic">
					<div class="img lazyload_img" mediatype="movie" fileindex="{$T.eachData.fileindex}" fileid="{$T.eachData.mediaid}" tempPath="{$T.eachData.thumbnail}" filepath="{$T.eachData.filepath}">
					{#if $P.isAdministrator == true}
						<div class="singleimgbg">
							<a href="javascript:;" class="playerbtn" ></a>
							<a href="javascript:;" class="editbtn type_movie"></a>
							<a href="javascript:;" class="morebtn"></a>
							<ul class="morelist"></ul>
						</div>
					{#/if}
						<div class="collectionbg" style="display:none;">
							<span class="Moviescount">{$T.eachData.filecount}</span>
						</div>
					</div>
					<p class="imgname" title="{$T.eachData.title}">{$T.eachData.title}</p>
				</div>
			</div>
		{#/if}
	{#elseif $T.eachData.mediatype == "tvshow"}
		<div class="box singlemovie click_tvshow_inmultipage lazyload_item">
			<div class="pic">
				<div class="img lazyload_img" mediatype="tvshow" fileindex="{$T.eachData.fileindex}" fileid="{$T.eachData.mediaid}" filepath="{$T.eachData.filepath}" tempPath="{$T.eachData.thumbnail}">
				{#if $P.isAdministrator == true}
					<div class="singleimgbg">
						<a href="javascript:;" class="editbtn type_tvshow"></a>
						<a href="javascript:;" class="morebtn"></a>
						<ul class="morelist"></ul>
					</div>
				{#/if}
				</div>
				<p class="imgname" title="{$T.eachData.title}">{$T.eachData.title}</p>
			</div>
		</div>
	{#elseif $T.eachData.mediatype == "video"}
		<div class="box singlemovie click_video_inmultipage lazyload_item">
			<div class="pic">
				<div class="img lazyload_img" mediatype="video" fileindex="{$T.eachData.fileindex}" fileid="{$T.eachData.mediaid}" filepath="{$T.eachData.filepath}" tempPath="{$T.eachData.thumbnail}">
				{#if $P.isAdministrator == true}
					<div class="singleimgbg">
						<a href="javascript:;" class="playerbtn" ></a>
						<a href="javascript:;" class="editbtn type_video"></a>
						<a href="javascript:;" class="morebtn"></a>
						<ul class="morelist"></ul>		
					</div>
				{#/if}
				</div>
				<p class="imgname" title="{$T.eachData.title}">{$T.eachData.title}</p>
			</div>
		</div>
	{#else}
	{#/if}
	
{#/for}
