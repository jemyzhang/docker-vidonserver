<div class="havetitleblock newaddblock">
	<div class="newaddblocklayer">
		<h3><a class="newaddbtn" href="javascript:;"><span>{$P.indexStaticDatas.indexStaticDatas_1}</span> <span class="icon"></span></a></h3>
		
		<div class="clr"></div>
		<div class="newaddblockinner">
		{#foreach $T.recentlyAddedVideos as eachItem}
			{#if $T.eachItem.filecount > 1 && $T.eachItem.mediatype != "tvshow"}
			<div class="box collectionmovie click_movieset_inmainpage lazyload_item">
				<div class="pic">
					<div class="img lazyload_img" mediatype="movieset" fileindex="{$T.eachItem.fileindex}" fileid="{$T.eachItem.mediaid}" idlibrary="{$T.eachItem.idlibrary}" tempPath="{$T.eachItem.thumbnail}" style="background-image:url({$T.eachItem.thumbnail})">
						<div class="collectionbg" >
							<span class="Moviescount">{$T.eachItem.filecount}</span>
						</div>
					</div>
					<p class="imgname" title="{$T.eachItem.title}">{$T.eachItem.title}</p>
				</div>
			</div>
			{#else}
			{#if $T.eachItem.mediatype == "movie"}
			<div class="box singlemovie click_movie_inmultipage lazyload_item">
				<div class="pic">
					<div class="img lazyload_img" mediatype="movie" fileindex="{$T.eachItem.fileindex}" fileid="{$T.eachItem.mediaid}" tempPath="{$T.eachItem.thumbnail}" filepath="{$T.eachItem.filepath}" style="background-image:url({$T.eachItem.thumbnail})">
					{#if $T.isadministrator == true}
						<div class="singleimgbg">
							<a href="javascript:;" class="playerbtn" ></a>
							<a href="javascript:;" class="editbtn type_movie"></a>
							<a href="javascript:;" class="morebtn"></a>
							<ul class="morelist"></ul>
						</div>
					{#/if}
					</div>
					<p class="imgname" title="{$T.eachItem.title}">{$T.eachItem.title}</p>
				</div>
			</div>
			{#elseif $T.eachItem.mediatype == "tvshow"}
			<div class="box singlemovie click_tvshow_inhistory">
				<div class="pic">
					<div class="img" mediatype="tvshow" fileindex="{$T.eachItem.fileindex}" fileid="{$T.eachItem.mediaid}" filepath="{$T.eachItem.filepath}" idlibrary="{$T.eachItem.idlibrary}" style="background-image:url({$T.eachItem.thumbnail})">
						{#if $T.isadministrator == true}
						<div class="singleimgbg">
							
							<a href="javascript:;" class="editbtn type_tvshow"></a>
							<a href="javascript:;" class="morebtn"></a>
							<ul class="morelist"></ul>
						</div>
					{#/if}
					</div>
					<p class="imgname" title="{$T.eachItem.title}">{$T.eachItem.title}</p>
				</div>
			</div>
			{#elseif $T.eachItem.mediatype == "video"}
			<div class="box singlemovie click_video_inmultipage">
				<div class="pic">
					<div class="img" mediatype="video" fileindex="{$T.eachItem.fileindex}" fileid="{$T.eachItem.mediaid}" filepath="{$T.eachItem.filepath}" style="background-image:url({$T.eachItem.thumbnail})">
					{#if $T.isadministrator == true}
						<div class="singleimgbg">
							<a href="javascript:;" class="playerbtn" ></a>
							<a href="javascript:;" class="editbtn type_video"></a>
							<a href="javascript:;" class="morebtn"></a>
							<ul class="morelist"></ul>		
						</div>
					{#/if}
					</div>
					<p class="imgname" title="{$T.eachItem.title}">{$T.eachItem.title}</p>
				</div>
			</div>
			{#else}
			{#/if}
			{#/if}
		{#/for}
		<div class="clr"></div>
		</div>
	</div>
	<div class="newaddblocklayer">
		<h3><a class="newviewbtn click_more_history" href="javascript:;"><span>{$P.indexStaticDatas.indexStaticDatas_2}</span><span class="icon"></span></a></h3>
		
		<div class="clr"></div>
		<div class="newaddblockinner">
		{#foreach $T.historyMedias as eachItem}
			{#if $T.eachItem.objtype == 2}
				<div class="box singlemovie click_movie_inmultipage lazyload_item">
					<div class="pic">
						<div class="img lazyload_img" mediatype="movie" fileindex="{$T.eachItem.fileindex}" fileid="{$T.eachItem.fileID}" tempPath="{$T.eachItem.thumbnail}" filepath="{$T.eachItem.path}" style="background-image:url({$T.eachItem.thumbnail})">
						{#if $T.isadministrator == true}
							<div class="singleimgbg">
								<a href="javascript:;" class="playerbtn" ></a>
								<a href="javascript:;" class="editbtn type_movie"></a>
								<a href="javascript:;" class="morebtn"></a>
								<ul class="morelist"></ul>
							</div>
						{#/if}
						</div>
						<p class="imgname" title="{$T.eachItem.title}">{$T.eachItem.title}</p>
					</div>
				</div>
			{#elseif $T.eachItem.objtype == 4}
				<div class="box singlemovie click_tvshow_inhistory">
					<div class="pic">
						<div class="img" mediatype="tvshow" fileindex="{$T.eachItem.fileindex}" fileid="{$T.eachItem.tvshowID}" filepath="{$T.eachItem.path}" idlibrary="{$T.eachItem.idlibrary}" style="background-image:url({$T.eachItem.thumbnail})">
						{#if $T.isadministrator == true}
							<div class="singleimgbg">
								<a href="javascript:;" class="playerbtn" ></a>
								<a href="javascript:;" class="editbtn type_tvshow"></a>
								<a href="javascript:;" class="morebtn"></a>
								<ul class="morelist"></ul>
							</div>
						{#/if}
						</div>
						<p class="imgname" title="{$T.eachItem.title}">{$T.eachItem.title}</p>
					</div>
				</div>
			{#elseif $T.eachItem.objtype == 1}
				<div class="box singlemovie click_video_inmultipage">
					<div class="pic">
						<div class="img" mediatype="video" fileindex="{$T.eachItem.fileindex}" fileid="{$T.eachItem.fileID}" filepath="{$T.eachItem.path}" style="background-image:url({$T.eachItem.thumbnail})">
						{#if $T.isadministrator == true}
							<div class="singleimgbg">
								<a href="javascript:;" class="playerbtn" ></a>
								<a href="javascript:;" class="editbtn type_video"></a>
								<a href="javascript:;" class="morebtn"></a>
								<ul class="morelist"></ul>
							</div>
							{#/if}
						</div>
						<p class="imgname" title="{$T.eachItem.title}">{$T.eachItem.title}</p>
					</div>
				</div>
			{#else}
			{#/if}
		{#/for}
		<div class="clr"></div>
		</div>
		
	</div>
</div>