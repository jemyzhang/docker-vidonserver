 {#if $P.StaticDatas.commonPopNum==1}

  <a class="popconfirmDeleteClose close2"  href="javascript:;" onClick="close_box('.popabout',1);"></a>
  <div class="tckuangcon fillet10">
    <div class="poplogo"><img src="images/logo_new.png" width="116" height="23"></div>
    <div class="popserver">
      <h4>{$P.StaticDatas.aboutContent.aboutStr_1}</h4>
      <p>{$P.StaticDatas.aboutContent.aboutStr_2}</p>
    </div>
    <p class="big">{$P.StaticDatas.aboutContent.aboutStr_3}</p>
    <p class="big">{$P.StaticDatas.aboutContent.aboutStr_4}</p>
    <p style=" text-align:center; padding-top:40px;">Copyright@2012-2015 VidOn.me All Right Reserved</p>
  </div>

{#elseif $P.StaticDatas.commonPopNum==2}

  <a class="popaddNoPlayClose close2"  href="javascript:;" onClick="close_box('.addNoPlay',1);"></a>
  <div class="tckuangcon fillet4">
    <p>{$P.StaticDatas.noPlayContent.noPlayContentStr_1}</p>
    <p class="listing">{$P.StaticDatas.noPlayContent.noPlayContentStr_2}</p>
    <div class="cloud">
      <div class="no1 fl"><img src="images/movie/cloud_img_2.png" width="177" height="190"></div>
      <div class="no2 fl">
        <a  target="_blank" class="btn-small btn-blue mac" href="{$P.StaticDatas.noPlayContent.noPlayContentStr_4}">{$P.StaticDatas.noPlayContent.noPlayContentStr_3}</a>
        <a  target="_blank" class="btn-small btn-blue android" href="{$P.StaticDatas.noPlayContent.noPlayContentStr_6}">{$P.StaticDatas.noPlayContent.noPlayContentStr_5}</a>
      </div>
      <div class="clr"></div>
    </div>
  </div>


{#elseif $P.StaticDatas.commonPopNum==3}

  <a class="popconfirmDeleteClose close2"  href="javascript:;" onClick="close_box('.confirmDelete',3);"></a>
  <div class="tckuangcon fillet4">
    <h4>{$P.StaticDatas.delContent.title_1}</h4>
    <div class="deletePath" id="deletePath">{$P.StaticDatas.delContent.pathstr}</div>
    <a href="javascript:;"  onClick="close_box('.confirmDelete',3);" class="fr btn-small btn-white">{$P.StaticDatas.delContent.btn_1}</a><a href="javascript:;"  class="fl btn-small btn-blue" id="btnCfmDeletePathOK" >{$P.StaticDatas.delContent.btn_2}</a>
    <div class="clr"></div>
  </div>

{#elseif $P.StaticDatas.commonPopNum==4}

  <div class="tckuangcon fillet4">
    <p style="font-size: 24px;margin: 20px 0 30px;text-align: center;">{$P.StaticDatas.saveContent.saveContentStr_1}</p>
  </div>
{#elseif $P.StaticDatas.commonPopNum==5}
    {#if $P.StaticDatas.mediaType=="tvshow"}
    <li class="updatemetabtn">{$P.StaticDatas.showMediaDropContent.showMediaDropContentStr_1}</li>
    {#else}
    <li class="updatemetabtn">{$P.StaticDatas.showMediaDropContent.showMediaDropContentStr_1}</li>
    <li class="aboutmetabtn">{$P.StaticDatas.showMediaDropContent.showMediaDropContentStr_2}</li>
    {#/if}
{#elseif $P.StaticDatas.commonPopNum==6}
<a class="popagentlistClose close2"  href="javascript:;" onClick="close_box('.popagentlist',2);"></a>

  <div class="tckuangcon fillet4">

   <p>{$P.StaticDatas.agentlistContent.showMediaDropContentStr_1}</p>
   <P>{$P.StaticDatas.agentlistContent.showMediaDropContentStr_2}</P>
   <P>{$P.StaticDatas.agentlistContent.showMediaDropContentStr_3}</P>
   <P>{$P.StaticDatas.agentlistContent.showMediaDropContentStr_4}</P>
  </div>
{#elseif $P.StaticDatas.commonPopNum==7}
<div class="dropdown dropdown-small dropdown-bg topfilterdropdown">
  <div class="jt"></div>
  <a title="" class="input_dropdown fillet4" href="javascript:;" cus_value=""> <b class="font">{$P.StaticDatas.topFilterContent.topFilterStr_4}</b>
    <span></span>
  </a>
  <ul style="display: none;" class="filletbot4">
    <li cus_value="">{$P.StaticDatas.topFilterContent.topFilterStr_1}</li>
    <li cus_value="">{$P.StaticDatas.topFilterContent.topFilterStr_2}</li>
    <li cus_value="">{$P.StaticDatas.topFilterContent.topFilterStr_3}</li>
  </ul>
</div>
{#elseif $P.StaticDatas.commonPopNum==8}

  <a class="popshowCommonTipsClose close2"  href="javascript:;" onClick="close_box('.showCommonTips',5);"></a>
  <div class="tckuangcon fillet4">
    <h4>{$P.StaticDatas.commonTipsContent.title_1}</h4>
    <div class="commonTipsContent"><p>{$P.StaticDatas.commonTipsContent.str_1}</p></div>
    <a href="javascript:;"  onClick="close_box('.showCommonTips',5);" class="fr btn-small btn-white">{$P.StaticDatas.commonTipsContent.btn_1}</a><a href="javascript:;"  class="fl btn-small btn-blue js-btncommonTipsOk" id="btnCommonTipsOk">{$P.StaticDatas.commonTipsContent.btn_2}</a>
    <div class="clr"></div>
  </div>
{#elseif $P.StaticDatas.commonPopNum==9}

  <div class="tckuangcon fillet4">
    <h4 style="margin-bottom:10px;">{$P.StaticDatas.saveContent.saveContentStr_1}</h4>
    <p style=" text-align: center;">{$P.StaticDatas.saveContent.saveContentStr_2}</p>
  </div>
{#/if}