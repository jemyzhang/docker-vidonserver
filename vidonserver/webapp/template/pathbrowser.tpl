<a class="popAddPathClose close"  href="javascript:;" onClick="close_box('.addPath',3);"></a>
<h3 id="popAddPathH3" class="fillettop4">{$P.titles.h3}</h3>
<div class="tckuangcon filletbot4">
  <p id="popAddPathP" class="fontbold">{$P.titles.p}</p>
  <div class="selectedvideo">
    <div class="popDisk left" >
      <ul id="popDiskblock">
      	{#foreach $T.drivelist as eachDrive}
        {#if $T.eachDrive.isnet == 1 }
        <li index="{$T.eachDrive.index}" class="{$T.eachDrive.class}" title="{$T.eachDrive.title}" >{$T.eachDrive.value}<span class="close"></span></li>
        {#else}
        <li index="{$T.eachDrive.index}" class="{$T.eachDrive.class}" title="{$T.eachDrive.title}" >{$T.eachDrive.value}</span></li>
        {#/if}
        {#/for}
      </ul>
    </div>
    <div id="listpathblock"  class="popFolder right">
      <div id="listpath">    
        {#foreach $T.folderlist as eachPath}
      	<div class="{$T.eachPath.class}"><a index="{$T.eachPath.index}" title="{$T.eachPath.title}">{$T.eachPath.value}</a></div>
        {#/for}
      </div>    
    </div>
    <div class="clr"></div>
  </div>
  <p>{$P.titles.p_sel_path}</p>
  <input style="width:588px;" type="text" value=""  name="popSelectedPath" class="input-small" id="addSrcPath" />
  <div class="clr"></div>
  <a href="javascript:;" onClick="close_box('.addPath',3);" class="fl btn-small btn-white" id="btnAddLibPathCancel">{$P.titles.btn_cancel}</a>
  <a href="javascript:;" class="fr btn-small btn-disable btn-blue" id="btnAddLibPathOK">{$P.titles.btn_ok}</a>
  <div class="clr"></div>
</div>