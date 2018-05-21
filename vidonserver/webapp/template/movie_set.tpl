<div class="posterMenu">
	<a href="javascript:;" class="backbtn click_backmovie">{$P.multilang.index_38}</a>
</div>{#foreach $T as eachMovie}
<div class="box click_moviesetdetail">
	<div class="pic">
		<div class="img" fileid="{$T.eachMovie.fileid}" fileindex="{$T.eachMovie$index}" mediatype="movie" filepath="{$T.eachMovie.filepath}" style="background-image:url({$T.eachMovie.thumbnail});">
			<div class="icon {$T.eachMovie.typecss}"></div>
			<div class="singleimgbg">
				<a href="javascript:;" class="playerbtn" ></a>
				<a href="javascript:;" class="editbtn type_movie"></a>
				<a href="javascript:;" class="morebtn"></a>
				<ul class="morelist"></ul>
			</div>
	
		</div>
		<p class="imgname" title="{$T.eachMovie.name}">{$T.eachMovie.name}</p>
	</div>
</div>
{#/for}

