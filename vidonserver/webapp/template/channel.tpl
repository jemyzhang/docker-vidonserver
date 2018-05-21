<div class="channeltips">
	<p trans_value="index_199">{$P.multilang.index_199}</p>
	<P>
		<span  class="white" trans_value="index_200">{$P.multilang.index_200}</span>
	</p>
	<p style="padding-bottom:0px;" trans_value="index_201">{$P.multilang.index_201}</P>
	<p style="padding:0px;" trans_value="index_202">{$P.multilang.index_202}</P>
	<p style="padding:0px;" trans_value="index_203">{$P.multilang.index_203}</P>
</div>
<div class="installed_channel" >
	<h3 trans_value="index_204">{$P.multilang.index_204}</h3>
	<div id="installed_channel">
		{#foreach $T as eachChannel}
		<div class="img click_channel" channelindex="{$T.eachChannel$index}">
			<img src="{$T.eachChannel.strThumbnail}" />
			<div class="imgbg"></div>
		</div>
		{#/for}
	</div>
	<div class="clr"></div>
</div>