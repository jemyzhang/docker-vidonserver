<div class="posterMenu">
	{#if $P.title.fromSetPage == true}
	<a href="javascript:;" class="backbtn click_backmovieset">{$P.title.index_38}</a>
	{#else}
	<a href="javascript:;" class="backbtn click_backmovie">{$P.title.index_38}</a>
	{#/if}
</div>
<div class="details_title_block">
	<h2 class="item_year">{$T.year}</h2>
	<h1 class="item_title">{$T.title}</h1>
</div>
<div class="details_metadata_block">
	<P class="floatp">
		<span>{$P.title.director}:</span>
		<span class="white"><a class="A" href="javascript:;" vtype="director" onclick="findOtherVideos(this)">{$T.director}</a></span>
	</p>
	<P class="floatp">
		<span>{$P.title.time}:</span>
		<span class="white">{$T.runtime}</span>
	</p>
	<P class="floatp">
		<span>{$P.title.country}:</span>
		{#foreach $T.country as eachCountry}
		{#if !$T.eachCountry$last}
		<span class="white"><a class="A" href="javascript:;" vtype="country" onclick="findOtherVideos(this)">{$T.eachCountry}</a><a>, </a></span>
		{#else}
		<span class="white"><a class="A" href="javascript:;" vtype="country" onclick="findOtherVideos(this)">{$T.eachCountry}</a></span>
		{#/if}
		{#/for}
	</p>
	<P class="floatp">
		<span>{$P.title.genre}:</span>
		{#foreach $T.genre as eachGenre}
		{#if !$T.eachGenre$last}
		<span class="white"><a class="A" href="javascript:;" vtype="genre" onclick="findOtherVideos(this)">{$T.eachGenre}</a><a>, </a></span>
		{#else}
		<span class="white"><a class="A" href="javascript:;" vtype="genre" onclick="findOtherVideos(this)">{$T.eachGenre}</a></span>
		{#/if}
		{#/for}
	</p>
	<P class="floatp">
		<span>{$P.title.mpaa}:</span>
		<span class="white"><a class="A" href="javascript:;" vtype="mpaa" onclick="findOtherVideos(this)">{$T.mpaa}</a></span>
	</p>
	<div class="clr"></div>
	<p  class="fullwidth">
		<span>{$P.title.plot}</span>
		<br>
		<span class="white">{$T.plot}</span>
	</p>
	<div class="fullwidth clearfix starsblockinner js-starsblockinner">
	{#if $T.cast.length > 0}
		<P>{$P.title.stars}</P>
		{#foreach $T.cast as eachCast}
		<div class="starsblock">
			<img src="{$T.eachCast.thumbnail}"  onclick="findOtherVideos(this)" vtype="actor" vname="{$T.eachCast.name}">
			<P class="white" style="cursor:pointer;" vtype="actor" onclick="findOtherVideos(this)">{$T.eachCast.name}</P>
			<p>{$T.eachCast.role}</p>
		</div>
		
		{#/for}
		<div class="jt"></div>
		{#/if}
	</div>
	<div class="rating details_rating_block">
		<div class="ratingblock">
			<div style="width:{$T.rating}%;" class="ratingvalue"></div>
		</div>
		<div class="ratingnum">{$T.strrating}</div>
	</div>
</div>
<div class="details_poster box_big">
	<div class="pic_big">
			<div fileid="{$T.idfile}" filepath="{$T.filepath}" style="background-image:url({$T.thumbnail});" mediatype="movie" class="img">
				<div class="singleimgbg">
					<a href="javascript:;" class="playerbtn" ></a>
					<a href="javascript:;" class="editbtn type_movie"></a>
					<a href="javascript:;" class="morebtn"></a>
					<ul class="morelist"></ul>
				</div>
			</div>
	</div>
</div>
{#if $P.flag.classify == true}
<div class="detail_jt" id="movie_detail_jt">
	<a href="javascript:;" class="left"></a>
	<a href="javascript:;" class="right"></a>
</div>
{#/if}
