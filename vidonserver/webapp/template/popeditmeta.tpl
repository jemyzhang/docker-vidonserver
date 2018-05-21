<a class="popeditmetaClose close"  href="javascript:;" id="btnpopeditmetaClose" onClick="close_box('.popeditmeta',1);"></a>
<h3 class="fillettop4">{$P.title.metatitle}</h3>
<div class="tckuangcon filletbot4">
	<div class="editmetaleft" id="editmetaleft">
		<ul>
			<li class="selected geninfo">{$P.title.sider_1}</li>
			<li class="poster">{$P.title.sider_2}</li>
			<li class="background">{$P.title.sider_3}</li>
			<li class="about">{$P.title.sider_4}</li>
		</ul>
	</div>
	<div class="editmetaright">
		<div class="editmetacontent userdefined_scrollbar_meta" id="editmetacontent">
			<div class="editmetacon editmetacon1">
				<h4>{$P.title.sider_1}</h4>
				{#if $T.mediaType==1 || $T.mediaType==3}
				<div class="inputblock">
					<p class="white">{$P.metaStaticDatas.geninfoStr_1}</p>
					<input class="input-small" id="movieName" type="text" value="{$T.geninfo.movieName}">
				</div>
				
				<div class="inputblock col-3 mr20">
					<p class="white">{$P.metaStaticDatas.geninfoStr_3}</p>
					<input class="input-small"  id="director" type="text" value="{$T.geninfo.director}">
				</div>
				<div class="inputblock col-3 mr20">
					<p class="white">{$P.metaStaticDatas.geninfoStr_4}</p>
					<input class="input-small" id="year" type="text" value="{$T.geninfo.year}">
				</div>
				<div class="inputblock col-3">
					<p class="white">{$P.metaStaticDatas.geninfoStr_5}</p>
					<input class="input-small" id="country" type="text" value="{$T.geninfo.country}">
				</div>
				<div class="clr"></div>
				<div class="inputblock col-3 mr20">
					<p class="white">{$P.metaStaticDatas.geninfoStr_6}</p>
					<input class="input-small" id="type" type="text" value="{$T.geninfo.type}">
				</div>
				<div class="inputblock col-3 mr20">
					<p class="white">{$P.metaStaticDatas.geninfoStr_7}</p>
					<input class="input-small" id="mpaa" type="text" value="{$T.geninfo.mpaa}">
				</div>
				<div class="inputblock col-3">
					<p class="white">{$P.metaStaticDatas.geninfoStr_8}</p>
					<input class="input-small" id="rate" type="text" value="{$T.geninfo.rate}">
				</div>
				<div class="clr"></div>
				{#/if}
				<div class="inputblock">
					<p class="white">{$P.metaStaticDatas.geninfoStr_9}</p>
					<textarea name="" id="details">{$T.geninfo.details}</textarea>
				</div>
			</div>
			<div class="editmetacon editmetacon2">
				<div class="uploadimgblock">
					<a href="javascript:;" class="uploadimg uploadPoster">{$P.metaStaticDatas.geninfoStr_11}</a>
					<input type="file" name="file" id="selectFilePoster"/>
				</div>
				
				<h4>{$P.title.sider_2}</h4>
				
				<div class="posterinner clearfix" id="posterinner">
					{#foreach $T.posterList as posterList}
						<div class="mr20 posterblock">
							<div class="img"><img src="{$T.posterList.url}" width="160" height="240" picid="{$T.posterList.picid}"></div>
							<div class="bg"></div>
						</div>
					{#/for}
					
				</div>
			</div>
			<div class="editmetacon editmetacon3">
			<div class="uploadimgblock">
					<a href="javascript:;" class="uploadimg uploadBg">{$P.metaStaticDatas.geninfoStr_11}</a>
					<input type="file" name="file" id="selectFileBackground"/>
				</div>
		
				<h4>{$P.title.sider_3}</h4>
				<div class="backgroundinner clearfix" id="backgroundinner">
					{#foreach $T.backgroundList as backgroundList}
						<div class="mr20 backgroundblock">
							<div class="img"><img src="{$T.backgroundList.url}" width="250" height="137" picid="{$T.backgroundList.picid}"></div>
							<div class="bg"></div>
						</div>
					{#/for}
					
				</div>
			</div>
			<div class="editmetacon editmetacon4">
				<h4>{$P.title.sider_4}</h4>
				<div class="inputblock">
					<p class="white">{$P.metaStaticDatas.geninfoStr_10}</p>
					<p class="abouturl" id="aboutUrl" >{$T.aboutUrl}</p>
				</div>
			</div>
		</div>
	</div>
	<div class="clr"></div>
	<div class="btnblock">
		<a href="javascript:;"  onClick="close_box('.popeditmeta',1);" class="fl btn-small btn-white" id="editMetaCancel">{$P.metaStaticDatas.btn_2}</a>
		<a href="javascript:;"  class="fr btn-small btn-blue" id="editMetaOk">{$P.metaStaticDatas.btn_1}</a>
	</div>
</div>