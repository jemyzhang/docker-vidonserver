<div class="posterMenu">
	<a href="javascript:;" class="backbtn click_backtvshowdetail">{$P.title.index_39}</a>
</div>
<h2>{$T.subtitle}</h2>


<div class="details_metadata_block">
	{#if $T.plot.length > 0}
	<p class="fullwidth">
		<span>{$P.staticTitle.plot}</span>
		<br>
		<span class="white">{$T.plot}</span>
	</p>
	{#/if}
	<div style="margin-left:-10px;">
	{#foreach $T.episodes as eachEpisode}
		<div class="box2 singlemovie click_episode">
		<div class="pic">
			<div class="img" mediatype="tvshow_episode" filepath="{$T.eachEpisode.file}" mainTitle="{$P.title}" playTitle="{$T.eachEpisode.playTitle}" numepisode="{$T.eachEpisode.numepisode}" fileid="{$T.eachEpisode.idfile}" style="background-image:url({$T.eachEpisode.thumbnail});">
				<div class="singleimgbg">
					<a href="javascript:;" class="playerbtn" ></a>
					<a href="javascript:;" class="editbtn type_tvshow_episode"></a>
					<a href="javascript:;" class="morebtn"></a>
					<ul class="morelist"></ul>
				</div>
			</div>
			<p class="imgname">{$T.eachEpisode.episode}</p>
		</div>
	</div>
	{#/for}
	</div>
	<div class="clr"></div>
</div>
