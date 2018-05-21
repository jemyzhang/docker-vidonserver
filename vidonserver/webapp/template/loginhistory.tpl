<div class="posterMenu">
<a class="backbtn" href="javascript:;">{$P.loginHistoryStaticDatas.loginHistoryStaticDatasStr_1}</a>					
</div>
<div class="havetitleblock loginhistoryblock">
	{#foreach $T as eachItem}
	<div class="loginhistorylayer">
		<h3>{$T.eachItem.time} <span class="sanjiao"></span></h3>
		<div class="clr"></div>
		<div class="loginhistorylist">
				{#foreach $T.eachItem.historyList as historyList}
					{#if $T.historyList.objtype == 2}
						<div class="box singlemovie click_movie_inmultipage">
							<div class="pic">
								<div class="img lazyload_img" mediatype="movie" fileindex="{$T.historyList.fileindex}" fileid="{$T.historyList.fileID}" tempPath="{$T.historyList.thumbnail}" filepath="{$T.historyList.path}" style="background-image:url({$T.historyList.thumbnail})">
								{#if $T.isadministrator == true}
									<div class="singleimgbg">
										<a href="javascript:;" class="playerbtn" ></a>
										<a href="javascript:;" class="editbtn type_movie"></a>
										<a href="javascript:;" class="morebtn"></a>
										<ul class="morelist"></ul>
									</div>
								{#/if}
								</div>
								<p class="imgname" title="{$T.historyList.title}">{$T.historyList.title}</p>
							</div>
						</div>
					{#elseif $T.historyList.objtype == 4}
						<div class="box singlemovie click_tvshow_inhistory">
							<div class="pic">
								<div class="img" mediatype="tvshow" fileindex="{$T.historyList.fileindex}" fileid="{$T.historyList.tvshowID}" filepath="{$T.historyList.path}" idlibrary="{$T.historyList.idlibrary}" style="background-image:url({$T.historyList.thumbnail})">
								{#if $T.isadministrator == true}
									<div class="singleimgbg">
										<a href="javascript:;" class="playerbtn" ></a>
										<a href="javascript:;" class="editbtn type_tvshow"></a>
										<a href="javascript:;" class="morebtn"></a>
										<ul class="morelist"></ul>
									</div>
								{#/if}
								</div>
								<p class="imgname" title="{$T.historyList.title}">{$T.historyList.title}</p>
							</div>
						</div>
					{#elseif $T.historyList.objtype == 1}
						<div class="box singlemovie click_video_inmultipage">
							<div class="pic">
								<div class="img" mediatype="video" fileindex="{$T.historyList.fileindex}" fileid="{$T.historyList.fileID}" filepath="{$T.historyList.path}" style="background-image:url({$T.historyList.thumbnail})">
									{#if $T.isadministrator == true}
									<div class="singleimgbg">
										<a href="javascript:;" class="playerbtn" ></a>
										<a href="javascript:;" class="editbtn type_video"></a>
										<a href="javascript:;" class="morebtn"></a>
										<ul class="morelist"></ul>
									</div>
									{#/if}
								</div>
								<p class="imgname" title="{$T.historyList.title}">{$T.historyList.title}</p>
							</div>
						</div>
					{#else}
					{#/if}
				{#/for}
				<div class="clr"></div>
		</div>
	</div>
	{#/for}
</div>