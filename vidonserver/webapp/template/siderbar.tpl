{#if $T.hidesiderbar == true}
<div class="sidermenubtn sidermenubtn_enter"></div>
<div class="siderbarblock hideslderbar siderbarblock_leave">
	{#else}
	<div class="sidermenubtn"></div>
	<div class="siderbarblock">
		{#/if}
		<div class="addlibrary" data-step="1" data-intro="{$P.siderBarStaticDatas.guide_1}" data-position='right' datatype="new">
			<a href="javascript:;" class="btn-small btn-blue2">{$P.siderBarStaticDatas.addlibrary_1}</a>
		</div>
		<div class="userdefined_scrollbar siderbarscroll">
			{#foreach $T.libaryData as eachData}
			<div class="libraryblock">
				<h3 title="{$T.eachData.name}">
					<span class="siderlibraryname" libid="{$T.eachData.id}">{$T.eachData.name}</span>
				</h3>

			</div>
			{#/for}
			<div class="border"></div>
			<dl class="libraryClick photochannel">
				<dd class="{$T.photoData.iconclass} {$T.photoData.selectclass} verticaldd" id={$T.photoData.id}>
					<a class="editphotochannel click_editlibphoto"></a>
					<div class="vertical">
						<p class="vertical_wrap">
							<span id="{$T.photoData.subid}" class="vertical_content white">{$T.photoData.title}</span>

						</p>
					</div>
				</dd>
			</dl>
			<!--div class="border"></div>
			<dl class="libraryClick RSSorder">
				<dd class="RSS verticaldd" id="RSS">
					<a class="editrssorder click_editlibRSS"></a>
					<div class="vertical">
						<p class="vertical_wrap">
							<span  class="vertical_content white">RSS订阅</span>
						</p>
					</div>
				</dd>
			</dl-->
		</div>
		<div class="siderbarbtn" data-step="4" data-intro="{$P.siderBarStaticDatas.guide_5}"  data-position='top' datatype="tips">
			{#if $P.msgState}
			<a id="btnMessages" href="javascript:;" class="messages hasMess" title="{$P.siderBarStaticDatas.siderBarStaticDatas_messages}"></a>
			{#else}
			<a id="btnMessages" href="javascript:;" class="messages" title="{$P.siderBarStaticDatas.siderBarStaticDatas_messages}"></a>
			{#/if}
			<a id="btnSetting" href="javascript:;" class="setting" title="{$P.siderBarStaticDatas.siderBarStaticDatas_setup}"></a>
		</div>
		<div class="siderbarbtn2">
			<a href="javascript:;" id="btnFeedback">{$P.siderBarStaticDatas.siderBarStaticDatas_q}</a>
		</div>
	</div>