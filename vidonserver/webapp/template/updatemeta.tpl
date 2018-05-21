<a class="popupdatemetaClose close"  href="javascript:;" onClick="close_box('.updatemeta',1);"></a>
<h3 class="fillettop4" trans_value="index_219">{$P.multilang.index_219}</h3>
<div class="tckuangcon fillet4">
	<div class="updatemetablockW">
		<div class="updatemetablock">
			<div class="updatemetainner">
				<div class="updatemes">
					<P><span trans_value="index_220">{$P.multilang.index_220}</span><br>
					<span id="updatemetapath" class="white updatemesname">{$T.firstPage.path}</span></P>
					<h4 trans_value="index_221">{$P.multilang.index_221}</h4>
					<input class="input-small" type="text"  name="videoname" id="videoname"  value="{$T.firstPage.name}">
					<h4 trans_value="index_222">{$P.multilang.index_222}</h4>
					<ul class="updateType clearfix" id="updateType">
						<li id="updatetoMoive" trans_value="index_38">{$P.multilang.index_38}</li>
						<li id="updatetoTVShow" trans_value="index_39">{$P.multilang.index_39}</li>
						<li id="updatetoVideo" class="last" trans_value="index_40">{$P.multilang.index_40}</li>
					</ul>
					<P  trans_value="index_223">{$P.multilang.index_223}</p>
					<P class="white mt30"  trans_value="index_224">{$P.multilang.index_224}</P>
					<a class="btn btn-white btn-disable" href="javascript:;" id="videosearchbtn" trans_value="index_225">{$P.multilang.index_225}</a>
				</div>
			</div>
			<div class="updatemetainner clearfix">
				<div class="backbtn"></div>
				<div class="userdefined_scrollbar">
					<div class="updatevideo updatevideoSuss clearfix" id="updatevideo">
					 
						{#foreach $T.secondPage as eachData}
						{#if $T.index%2==0}
						<div class="updatevideoblock left">
						{#else}
						<div class="updatevideoblock">
						{#/if}
							<div class="img">
								<img src="{$T.eachData.imgsrc}" width="160px;" height="240">
							</div>
							<div class="updatevideomes vertical">
								<div class="vertical_wrap">
									<div class="vertical_content">
										<P class="videoname">{$T.eachData.name}</P>
										<P class="videotime">{$T.eachData.time}</P>
									</div>
								</div>
							</div>
							<div class="bg"></div>
							<div class="clr"></div>
						</div>
						{#/for}
					</div>
				
					<div class="updatevideoErr" >
						<img src="images/meta/img.png" width="200" height="158">
						<P class="white"><b  trans_value="index_233">{$P.multilang.index_233}</b></P>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="bot">
		<a href="javascript:;" onclick="close_box('.updatemeta',1);"  class="fl btn-small btn-white" trans_value="index_25" id="updateMetaCancelBtn">{$P.multilang.index_25}</a>
		<a href="javascript:;" class="fr btn-small btn-blue btn-disable" trans_value="index_26" id="updateMetaFinishBtn">{$P.multilang.index_26}</a>
		<div class="clr"></div>
	</div>
</div>