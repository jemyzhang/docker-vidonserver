<a class="popaboutmetaClose close"  href="javascript:;" id="btnpopaboutmetaClose" onClick="close_box('.popaboutmeta',1);"></a>
<h3 class="fillettop4">{$P.aboutMetaStaticDatas.aboutMetaStaticDatasStr_title}</h3>
<div class="tckuangcon filletbot4 userdefined_scrollbar">
	<div class="aboutmetapath">
		<p class="white">{$P.aboutMetaStaticDatas.aboutMetaStaticDatasStr_path}</p>
		<P>{$T.aboutMetaDatasPath}</P>
	</div>
	<div class="aboutmatevideo">
		<P class="white">{$P.aboutMetaStaticDatas.aboutMetaStaticDatasStr_video}</P>
		<P>{$P.aboutMetaStaticDatas.aboutMetaStaticDatasStr_size}:<span class="white">{$T.aboutMetaDatasVideoSize}</span></P>
		<P>{$P.aboutMetaStaticDatas.aboutMetaStaticDatasStr_min}:<span class="white">{$T.aboutMetaDatasVideoMin}</span></P>
		<P>{$P.aboutMetaStaticDatas.aboutMetaStaticDatasStr_coding}:<span class="white">{$T.aboutMetaDatasVideoCoding}</span></P>
		<P>{$P.aboutMetaStaticDatas.aboutMetaStaticDatasStr_aspectratio}:<span class="white">{$T.aboutMetaDatasVideoAspectratio}</span></P>
		<P>{$P.aboutMetaStaticDatas.aboutMetaStaticDatasStr_dpi}:<span class="white">{$T.aboutMetaDatasVideoDPI}</span></P>
		<P>{$P.aboutMetaStaticDatas.aboutMetaStaticDatasStr_framerate}:<span class="white">{$T.aboutMetaDatasVideoFramerate}</span></P>
		<P>{$P.aboutMetaStaticDatas.aboutMetaStaticDatasStr_kpbs}:<span class="white">{$T.aboutMetaDatasSize}</span></P>
	</div>
	<div class="aboutmateaudio">
	 {#foreach $T.aboutMetaDatasAudio as eachAboutMetaDatasAudio}
		<P class="white">{$T.eachAboutMetaDatasAudio.aboutMetaDatasAudioTitle}</P>
		<P>{$P.aboutMetaStaticDatas.aboutMetaStaticDatasStr_coding}:
		<span class="white">{$T.eachAboutMetaDatasAudio.aboutMetaDatasAudioCoding}</span></P>
		<P>{$P.aboutMetaStaticDatas.aboutMetaStaticDatasStr_channels}:
		<span class="white">{$T.eachAboutMetaDatasAudio.aboutMetaDatasAudioChannels}</span></P>
		<P>{$P.aboutMetaStaticDatas.aboutMetaStaticDatasStr_sampling}:
		<span class="white">{$T.eachAboutMetaDatasAudio.aboutMetaDatasAudioSampling}</span></P>
		<P>{$P.aboutMetaStaticDatas.aboutMetaStaticDatasStr_language}:
		<span class="white">{$T.eachAboutMetaDatasAudio.aboutMetaDatasAudioLanguage}</span></P>
	{#/for}

	</div>
	<div class="clr"></div>
</div>