<a class="popPlayWinowsSetupClose close2"  href="javascript:;" onClick="close_box('.playwinows-setup-popblock',0);"></a>
	<div class="left">
		<ul class="tab_title">
			<li class="selected">{$P.multiLang.audio}</li>
			<li >{$P.multiLang.subtitle}</li>
		</ul>
	</div>
	<div class="right tab_content">
		<div class="tab_con selected userdefined_scrollbar">
			<ul class="local-audio-list">
				{#foreach $T.audios as eachAudio}
				<li class="{$T.eachAudio.state}" cus_value="{$T.eachAudio.index}" title="{$T.eachAudio.title}">{$T.eachAudio.title}</li>
				{#/for}
			</ul>
		</div>
		<div class="tab_con">
			<div class="subtitle-carousel-layer">
				<div class="subtitle-carousel" >
					<P class="online-subtitle-btn">{$P.multiLang.onlineSub}</P>
					<div class="userdefined_scrollbar subtitle-list">
					<ul class=" local-subtitle-list">
						<li class="close-subtitle-btn">{$P.multiLang.closeSub}</li>
						{#foreach $T.subtitles.inlineSub as eachSub}
						<li class="{$T.eachSub.state}" cus_value="{$T.eachSub.index}" title="{$T.eachSub.title}">{$T.eachSub.title}</li>
						{#/for}
					</ul>
				</div>
				</div>
				<div class="subtitle-carousel">
					<P class="online-subtitle-back-btn back">{$P.multiLang.onlineSub}</P>
					<!--没有加载出内容的时候
					<img width="32" height="32" class="loadingimg"  src="images/movie/refresh.gif">-->
					<!--有了内容以后-->
					<ul class="userdefined_scrollbar subtitle-list" id="onlinesub_ul">
						<!--{#foreach $T.subtitles.onlineSub as eachSub}
							{#if $T.eachSub.files.length > 1}
								<li class="package-subtitle-btn" subtitleid="{$T.eachSub.id}" title="{$T.eachSub.title}">{$T.eachSub.title}</li>
							{#else}
								<li subtitleid="{$T.eachSub.id}" downloadurl="{$T.eachSub.downloadUrl}" subtitletype="{$T.eachSub.type}" title="{$T.eachSub.title}">{$T.eachSub.title}</li>
							{#/if}
						{#/for}-->
					</ul>
				</div>
				<div class="subtitle-carousel">
					<P class="online-subtitle-back-btn2 back">{$P.multiLang.zipSub}</P>
					<ul class="userdefined_scrollbar subtitle-list" id="zipsubtitle"></ul>
				</div>
			</div>
		</div>
	</div>