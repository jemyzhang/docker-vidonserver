<a class="popaddlibraryClose close"  href="javascript:;" onClick="close_box('.popaddlibrary',1);"></a>
{#if $T.media_type == 1}
	{#if $P.mode == 0}
	<h3 class="fillettop4" trans_value="index_219">{$P.addLibraryStaticDatas.addLibraryStaticDatasStr_title1}</h3>
	{#else}
	<h3 class="fillettop4" trans_value="index_219">{$P.addLibraryStaticDatas.addLibraryStaticDatasStr_title2}</h3>
	{#/if}
{#else}
	<h3 class="fillettop4" trans_value="index_219"></h3>
{#/if}
<div class="tckuangcon fillet4">
	<div class="popaddlibrarycon">
		<div class="popaddlibraryconpadding">
		{#if $T.media_type == 1}
			<div class="col-2 mr40" >
				<h4>{$P.addLibraryStaticDatas.addLibraryStaticDatasStr_1}</h4>
				<input class="input-small" id="libraryName" type="text" value="{$T.name}">
			</div>
			<div class="col-2">
				<div class="addlibrarytips">
					<h4>{$P.addLibraryStaticDatas.addLibraryStaticDatasStr_2}</h4>
					<div class="tipsblock">
						<div class="tipsimg" id="tipsimg"></div>
					</div>
					<div class="clr"></div>
				</div>
				<div class="dropdown" id="scraperAgent">
		        	<div class="jt"></div>
		        	<a class="input_dropdown fillet4" href="javascript:;" cus_value="{$T.curAgent.id}"><b class="font">{$T.curAgent.name}</b><span></span></a>
		        	<ul  class="filletbot4">
		        		{#foreach $T.agents as eachAgent}
			        	<li cus_value="{$T.eachAgent.id}">{$T.eachAgent.name}</li>
		            	{#/for}
		        	</ul>
		        </div>
			</div>
			<div class="clr"></div>
		{#/if}
		<h4>{$P.addLibraryStaticDatas.addLibraryStaticDatasStr_5}</h4>
		</div>
		<div class="userdefined_scrollbar">
			<ul class="selectedPath" id="pathsInLibrary">
				{#if  $T.paths!=""}
					{#foreach $T.paths as eachPath}
					<li><span class="delete click_delpath"></span><span class="showpath">{$T.eachPath.path}</span></li>
					{#/for}
			  	{#else}
					<li><span class="showpath">{$P.addLibraryStaticDatas.index_16}</span></li>
			   	{#/if}
			</ul>
		</div>
		<a href="javascript:;" class="btn-small btn-white addlibrarypath" id="addlibrarypath">{$P.addLibraryStaticDatas.addLibraryStaticDatasStr_6}</a>
	</div>
	<div class="btnblock">
		{#if $P.mode == 1}
		{#if $T.libId > 2 && $T.isCustom}
		<a href="javascript:;"  class="fl btn-small btn-red" id="editLibraryDelete">{$P.addLibraryStaticDatas.addLibraryStaticDatasStr_4}</a>
		<a href="javascript:;"  class="fr btn-small btn-blue" id="editLibraryOk">{$P.addLibraryStaticDatas.addLibraryStaticDatasStr_btn1}</a>
		<a href="javascript:;"  onClick="close_box('.popaddlibrary',1);" class="fr btn-small btn-white mr20">{$P.addLibraryStaticDatas.addLibraryStaticDatasStr_btn2}</a>
		{#else}
		<a href="javascript:;"  class="fr btn-small btn-blue" id="editLibraryOk">{$P.addLibraryStaticDatas.addLibraryStaticDatasStr_btn1}</a>
		<a href="javascript:;"  onClick="close_box('.popaddlibrary',1);" class="fl btn-small btn-white mr20">{$P.addLibraryStaticDatas.addLibraryStaticDatasStr_btn2}</a>		
		{#/if}
		{#else}
		<a href="javascript:;"  class="fr btn-small btn-blue btn-disable" id="editLibraryOk">{$P.addLibraryStaticDatas.addLibraryStaticDatasStr_btn1}</a>
		<a href="javascript:;"  onClick="close_box('.popaddlibrary',1);" class="fl btn-small btn-white mr20">{$P.addLibraryStaticDatas.addLibraryStaticDatasStr_btn2}</a>
		{#/if}
	</div>
</div>
