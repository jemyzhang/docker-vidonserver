 <a class="popsetupClose close"  href="javascript:;" id="btnPopsetupClose" onClick="close_box('.popsetup',1);"></a>
<h3 class="fillettop4">{$P.title.poptitle}</h3>
<div class="tckuangcon filletbot4">
  <div class="setupleft">
    <ul  id="setupmenu">
      <li class="{$T[0].selectedClass}">{$P.title.sider_1}</li>
      <li class="{$T[1].selectedClass}">{$P.title.sider_2}</li>
      <li class="{$T[2].selectedClass}">{$P.title.sider_3}</li>
      {#if $T[3].isShowTranscode }
      <li class="{$T[3].selectedClass}">{$P.title.sider_4}</li>
      {#/if}
      {#if $T[4].isShowUpdate }
      <li class="{$T[4].selectedClass}">{$P.title.sider_5}</li>
      {#/if}
    </ul>
  </div>
  <div class="setupright" id="setupright">
    <div id="setupcontent">
      <div class="setupcon {$T[0].showClass} userdefined_scrollbar">
        <h4>{$P.setUpStaticDatas[0].title_1}</h4>
        <div class="serverinfo">
          <p><span>{$P.setUpStaticDatas[0].serverNameStr}</span>
            <input class="input-small" id="txtServerName" type="text" value="{$T[0].serverName}" />
          </p>
          <p><span>{$P.setUpStaticDatas[0].serverVersionsStr}</span><span>{$T[0].serverVersions}</span></p>
          <p><span>{$P.setUpStaticDatas[0].serverIpStr}</span><span>{$T[0].serverIp}</span></p>
          <a href="javascript:;" id="btnSaveState"  class="btn-small btn-blue">{$P.setUpStaticDatas[0].btn_1}</a> </div>
        <h4 class="h4">{$P.setUpStaticDatas[0].title_2}</h4>
        <p class="white" >{$P.setUpStaticDatas[0].serverClientStr}</p>
        <table id="tblClienlist"  class="fillet4 white tblClienlist" >
          <tr>
            <td class="row1 col1">{$P.setUpStaticDatas[0].serverClientTB_1}</td>
            <td  class="row1 col2">{$P.setUpStaticDatas[0].serverClientTB_2}</td>
            <td  class="row1" >{$P.setUpStaticDatas[0].serverClientTB_3}</td>
          </tr>
          {#foreach $T[0].serverClientList as serverClientList}
          <tr>
            <td class="col1">{$T.serverClientList.strname}</td>
            <td class="col2">{$T.serverClientList.ip}</td>
            <td>{$T.serverClientList.state}</td>
          </tr>
          {#/for}
        </table>
      </div>
      <div class="setupcon {$T[1].showClass}">
        <h4>{$P.setUpStaticDatas[1].title_1}</h4>
        <div class="weblangs">
          <div class="dropdown selectLanguage" >
            <div class="jt"></div>
            <a title=""  id="selectWebLanguage" class="input_dropdown fillet4" href="javascript:;" cus_value="{$T[1].selectedWebLanguage.cus_value}"><b class="font">{$T[1].selectedWebLanguage.value}</b><span></span></a>
            <ul id="ulWebLanguage" class="filletbot4">
              {#foreach $P.setUpStaticDatas[1].webLanguage as webLanguage}
              
              {#if $T.webLanguage.cus_value=="Korean"}
              <li cus_value="{$T.webLanguage.cus_value}" style="font-family:'Meiryo', 'MS Mincho', sans-serif">{$T.webLanguage.value}</li>
              {#else}
              <li cus_value="{$T.webLanguage.cus_value}">{$T.webLanguage.value}</li>
              {#/if}
              {#/for}
            </ul>
          </div>
          <p class="checkboxblock" id="autostart">
            <span class="checkbox" checkbox_state="{$T[1].autoStart}"></span>
            <span class="white">{$P.setUpStaticDatas[1].commonUserStr_3}</span>
          </p>
          <a href="javascript:;"  class="fl btn-small btn-blue" id="btnSaveEssentialInfo" >{$P.setUpStaticDatas[1].btn_1}</a> <a id="btnCancleEssentialInfo" href="javascript:;"  class="fl btn-small btn-white" onClick="close_box('.popsetup',1);">{$P.setUpStaticDatas[1].btn_2}</a>
          <div class="clr"></div>
        </div>
      </div>
      <div class="setupcon {$T[2].showClass}">
        <h4>{$P.setUpStaticDatas[2].title_1}</h4>
        <div class="dropdown selectLanguage" id="selectWeek">
          <div class="jt"></div>
          <a id="updateFrequency"  class="input_dropdown fillet4" href="javascript:;" cus_value="{$T[2].selectedAutoUpdate.cus_value}"><b class="font">{$T[2].selectedAutoUpdate.value}</b><span></span></a>
          <ul id="ulUpdateFrequency" class="filletbot4">
           {#foreach $P.setUpStaticDatas[2].autoUpdate as autoUpdate}
            <li cus_value={$T.autoUpdate.cus_value}>{$T.autoUpdate.value}</li>
            {#/for}
           
          </ul>
        </div>
        <h4 style="margin-top:50px;" trans_value="index_100">{$P.setUpStaticDatas[2].title_2}</h4>
        <div class="dropdown selectLanguage" id="selectLanguage">
          <div class="jt"></div>
          <a id="subLanguage" title="" class="input_dropdown fillet4" href="javascript:;" cus_value="{$T[2].selectedMovieLanguage.cus_value}"><b class="font">{$T[2].selectedMovieLanguage.value}</b><span></span></a>
          <ul id="ulSubLanguage" class="filletbot4 userdefined_scrollbar" >
           {#foreach $P.setUpStaticDatas[2].movieLanguage as movieLanguage}
              
              {#if $T.movieLanguage.cus_value=="ko"}
              <li cus_value="{$T.movieLanguage.cus_value}" style="font-family:'Meiryo', 'MS Mincho', sans-serif">{$T.movieLanguage.value}</li>
              {#else}
              <li cus_value="{$T.movieLanguage.cus_value}">{$T.movieLanguage.value}</li>
              {#/if}
              {#/for}
          
          </ul>
          <p class="checkboxblock hidefilecheckbox" id="hidefilecheckbox">
            <span class="checkbox" checkbox_state="{$T[2].hidefile}"></span>
            <span >{$P.setUpStaticDatas[2].title_2_str}</span>
          </p>

        </div>
        <a href="javascript:;"  class="fl btn-small btn-blue" id="btnSaveMediaLibrary">{$P.setUpStaticDatas[2].btn_1}</a> <a id="btnCancleMediaLibrary" href="javascript:;"  class="fl btn-small btn-white" onClick="close_box('.popsetup',1);">{$P.setUpStaticDatas[2].btn_2}</a>
        <div class="clr"></div>
      </div>
      <div class="setupcon {$T[3].showClass}">
        <h4>{$P.setUpStaticDatas[3].title_1}</h4>
        <p class="checkboxblock" id="transcodemode"><span class="checkbox" checkbox_state="{$T[3].transcodeMode}"></span><span  class="white">{$P.setUpStaticDatas[3].transcodeModeStr}</span></p>
         {#if $T[3].hardwareDecoding}
         <div id="hardCodecSupport">
          <p class="checkboxblock" id="opendecoding"><span class="checkbox" checkbox_state="{$T[3].openhardwareDecoding}"></span><span  class="white">{$P.setUpStaticDatas[3].transcodingStr_1}</span></p>
         
          <p>{$P.setUpStaticDatas[3].transcodingStr_2}</p>
         
         {#else}
         <div id="hardCodecSupport" class="disable">
         
          <p class="disablep"  style="height:auto;"><span></span><b>{$P.setUpStaticDatas[3].transcodingStr_1}</b><br /><b class="red" >{$P.setUpStaticDatas[3].transcodingStr_3}</b></p>
          <p>{$P.setUpStaticDatas[3].transcodingStr_2}</p>
         {#/if}
         <a href="javascript:;"  class="fl btn-small btn-blue" id="btnSaveTranscode">{$P.setUpStaticDatas[3].btn_1}</a> <a id="btnCancleTranscode" href="javascript:;"  class="fl btn-small btn-white" onClick="close_box('.popsetup',1);">{$P.setUpStaticDatas[3].btn_2}</a> </div>
        <div class="clr"></div>
      </div>
      <div class="setupcon {$T[4].showClass} userdefined_scrollbar">
       <div style="height:490px;">
        <h4>{$P.setUpStaticDatas[4].title_1}</h4>
        <p class="checkboxblock" id="autoUpdate">
          <span class="checkbox selected" checkbox_state="{$T[4].autoUpdate}"></span>
          <span class="white">{$P.setUpStaticDatas[4].autoUpdateStr_1}</span>
        </p>
        <p class="white">{$P.setUpStaticDatas[4].autoUpdateStr_2}</p>
        <div class="autoupgrade">
          <div class="dropdown upgradeDate" id="upgradeDate" style="margin-top:5px;">
            <div class="jt"></div>
            <a id="selectedAutoUpdateDay" title="" class="input_dropdown fillet4" href="javascript:;" cus_value="{$T[4].selectedAutoUpdateDay.cus_value}"><b class="font">{$T[4].selectedAutoUpdateDay.value}</b><span></span></a>
            <ul class="filletbot4">
            {#foreach $P.setUpStaticDatas[4].autoUpdateDay as autoUpdateDay}
            <li cus_value={$T.autoUpdateDay.cus_value}>{$T.autoUpdateDay.value}</li>
            {#/for}
            </ul>
          </div>
          <p>{$P.setUpStaticDatas[4].autoUpdateStr_3}</p>
          <div class="dropdown upgradeTime" id="upgradeTime" style="margin-top:5px;">
            <div class="jt"></div>
            <a id="selectedAutoUpdateHour" title="" class="input_dropdown fillet4" href="javascript:;" cus_value="{$T[4].selectedAutoUpdateHour.cus_value}"><b class="font">{$T[4].selectedAutoUpdateHour.value}</b><span></span></a>
            <ul class="filletbot4  userdefined_scrollbar" >
            {#foreach $P.setUpStaticDatas[4].autoUpdateHour as autoUpdateHour}
            <li cus_value={$T.autoUpdateHour.cus_value}>{$T.autoUpdateHour.value}</li>
            {#/for}
              
            </ul>
          </div>
          <div class="clr"></div>
        </div>
        <h4>{$P.setUpStaticDatas[4].title_2}</h4>
        
         {#if $T[4].CurrentStatusNum==1}
        <div  class="versionfindnew" id="versionFindNew" status="1" >
          <p><span >{$P.setUpStaticDatas[4].CurrentStatusStr_1}</span>:&nbsp<span>{$T[4].CurrentVersion}</span></p>
          <p><span>{$P.setUpStaticDatas[4].CurrentStatusStr_2}</span>:&nbsp<span>{$T[4].newVersion}</span></p>
          <ul class="changelog">
           {#foreach $T[4].CurrentStatus[0].changelog as changelog}
            <li>{$T.changelog}</li>
             {#/for}
          </ul>
          <a href="javascript:;" class="btn-small btn-blue" id="btnUpgrade" >{$P.setUpStaticDatas[4].CurrentStatusStr_10}</a> 
        </div>
		{#elseif $T[4].CurrentStatusNum==2}
		<div class="versionnew" id="versionNew" status="2">
          <p><span >{$P.setUpStaticDatas[4].CurrentStatusStr_1}</span>:&nbsp<span>{$T[4].CurrentVersion}</span></p>
          <p>{$P.setUpStaticDatas[4].CurrentStatusStr_3}</p>
        </div>
		{#elseif $T[4].CurrentStatusNum==3}
        <div  class="versiondown" id="versionDown" status="3">
          <p><span >{$P.setUpStaticDatas[4].CurrentStatusStr_1}</span>:&nbsp<span>{$T[4].CurrentVersion}</span></p>
          <p><span>{$P.setUpStaticDatas[4].CurrentStatusStr_2}</span>:&nbsp<span>{$T[4].newVersion}</span></p>
          <div class="progreessbarblock">
            <p>{$P.setUpStaticDatas[4].CurrentStatusStr_4}</p>
            <div class="progress">
              <div class="progress-bar" style={$T[4].CurrentStatus[2].style}></div>
            </div>
            <P id="percent">{$T[4].CurrentStatus[2].downloadBarWidth}</p>
          </div>
          <div class="clr"></div>
          <p>{$P.setUpStaticDatas[4].CurrentStatusStr_5}</p>
        </div>
        {#elseif $T[4].CurrentStatusNum==5}
        <div  class="versiondownfail" id="versionDownFail" status="5" >
         <p><span >{$P.setUpStaticDatas[4].CurrentStatusStr_1}</span>:&nbsp<span>{$T[4].CurrentVersion}</span></p>
          <p><span>{$P.setUpStaticDatas[4].CurrentStatusStr_2}</span>:&nbsp<span>{$T[4].newVersion}</span></p>
          <P>{$P.setUpStaticDatas[4].CurrentStatusStr_6}</p>
          <P>{$P.setUpStaticDatas[4].CurrentStatusStr_7}</p>
        </div>
        {#elseif $T[4].CurrentStatusNum==6}
        <div  class="versioninstall" id="versionInstall" status="6" >
          <p><span >{$P.setUpStaticDatas[4].CurrentStatusStr_1}</span>:&nbsp<span>{$T[4].CurrentVersion}</span></p>
          <p><span>{$P.setUpStaticDatas[4].CurrentStatusStr_2}</span>:&nbsp<span>{$T[4].newVersion}</span></p>
          <div class="clr"></div>
          <p>{$P.setUpStaticDatas[4].CurrentStatusStr_8}</p>
          <p>{$P.setUpStaticDatas[4].CurrentStatusStr_9}</p>
        </div>
        {#/if}
      </div>
    </div>
  </div>
</div>
  </div>
<div class="clr"></div>

