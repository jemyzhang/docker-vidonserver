<a class="popPlayWindowsClose close2" id="click_btn_playwindow" href="javascript:;"></a>
	<div class="PlayWindowsBlockBg"></div>
<div id="PlayWindowsBlock" class="PlayWindowsBlock"></div>

<div  class="playwinows-userdefined">
	<div class="playwinows-setup"></div>
	<div class="player-dropdown">
		<a href="javascript:;" class="player-dropdown-selected fillet4" title="{$P.curQualityInfo.title}" cus_value="{$P.curQualityInfo.index}" >{$P.curQualityInfo.shortTitle}</a>
		<div  class="player-dropdown-list">
			<div class="top"></div>
			<div class="con">
				<ul>
				{#foreach $P.qualityInfos as eachInfo}
					<li cus_value="{$T.eachInfo.index}">
						<span>{$T.eachInfo.title}</span>
					</li>
				{#/for}
				</ul>
			</div>
			<div class="bot"></div>
		</div>
	</div>
</div>
<div class="playwinows-setup-popblock fillet4" id="playwinows-setup-popblock">

	
</div>