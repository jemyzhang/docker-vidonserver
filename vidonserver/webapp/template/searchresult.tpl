<div class="editlibrary" id="moveMediaControl_searchPage"></div>
{#foreach $T as eachLibrary}
<div class="searchlibraryblock havetitleblock">
	<h3>{$T.eachLibrary.title}</h3>
	<div class="searchresultblock">
		{#foreach $T.eachLibrary.movies as eachItem}
		{#if $T.eachItem.setflag}
		<div class="box collectionmovie click_movieset lazyload_item">
			<div class="pic">
				<div class="img lazyload_img" mediatype="movieset" libid="{$T.eachItem.idlibrary}" fileindex="{$T.eachItem.fileindex}" fileid="{$T.eachItem.id}" tempPath="{$T.eachItem.thumbnail}" style="background-image:url({$T.eachItem.thumbnail})">
					<div class="collectionbg" >
						<span class="Moviescount">{$T.eachItem.filecount}</span>
					</div>
				</div>
				<p class="imgname" title="{$T.eachItem.title}">{$T.eachItem.title}</p>
			</div>
		</div>
		{#else}
		<div class="box singlemovie click_movie lazyload_item">
			<div class="pic">
				<div class="img lazyload_img" mediatype="movie" fileid="{$T.eachItem.id}" libid="{$T.eachItem.idlibrary}" tempPath="{$T.eachItem.thumbnail}" filepath="{$T.eachItem.path}" style="background-image:url({$T.eachItem.thumbnail})">
					<div class="singleimgbg">
						<a href="javascript:;" class="playerbtn"></a>
						<a href="javascript:;" class="editbtn type_movie"></a>
						<a href="javascript:;" class="morebtn"></a>
						<ul class="morelist"></ul>
					</div>
				</div>
				<p class="imgname" title="{$T.eachItem.title}">{$T.eachItem.title}</p>
			</div>
		</div>
		{#/if}
		{#/for}
		<div class="clr"></div>
	</div>
	<div class="searchresultblock">
		{#foreach $T.eachLibrary.tvshows as eachItem}
		<div class="box singlemovie click_tvshow">
			<div class="pic">
				<div class="img" mediatype="tvshow" fileid="{$T.eachItem.id}" libid="{$T.eachItem.idlibrary}" filepath="{$T.eachItem.path}" style="background-image:url({$T.eachItem.thumbnail})" libraryid="{$T.eachItem.idlibrary}">
					<div class="singleimgbg">
						<a href="javascript:;" class="playerbtn" ></a>
						<a href="javascript:;" class="editbtn type_tvshow"></a>
						<a href="javascript:;" class="morebtn"></a>
						<ul class="morelist"></ul>
					</div>
				</div>
				<p class="imgname" title="{$T.eachItem.title}">{$T.eachItem.title}</p>
			</div>
		</div>
		{#/for}
		<div class="clr"></div>
	</div>
	<div class="searchresultblock">
		{#foreach $T.eachLibrary.videos as eachItem}
		<div class="box2 singlemovie click_video">
			<div class="pic">
				<div class="img" mediatype="video" fileid="{$T.eachItem.id}" libid="{$T.eachItem.idlibrary}" filepath="{$T.eachItem.path}" style="background-image:url({$T.eachItem.thumbnail})">
					<div class="singleimgbg">
						<a href="javascript:;" class="playerbtn"></a>
						<a href="javascript:;" class="editbtn type_video"></a>
						<a href="javascript:;" class="morebtn"></a>
						<ul class="morelist"></ul>
					</div>
				</div>
				<p class="imgname" title="{$T.eachItem.title}">{$T.eachItem.title}</p>
			</div>
		</div>
		{#/for}
		<div class="clr"></div>
	</div>
</div>
{#/for}