 <a class="popaddVideoClose close" href="javascript:;" id="btnMngPathOK" onclick="close_box('.addVideo',2);"></a>
    <h3 id="popaddVideoH3" class="fillettop4">{$T.titles.addvideopage.h3}</h3>
    <div class="tckuangcon filletbot4  addpathblock">
    <p class="fontbold" trans_value="index_15">{$T.titles.addvideopage.p}</p>
    <div id="selectedPathblock" class="selectedPathblock">
        <ul class="selectedPath" id="selectedPath">
        	{#foreach $T.datas.pathlist as eachPath}
          <li index="{$T.eachPath.PathId}">
            <span class="delete-btn-bg"></span>
            <span class="showpath">{$T.eachPath.path}</span>
          </li>
          {#/for}
        </ul>
        <a href="javascript:;" id="addPathbtn" class="addPathbtn btn-small btn-white" trans_value="index_51">{$T.titles.addvideopage.btn_add}</a>
    </div>
    <a href="javascript:;" class="fl btn-small btn-white" id="addvideoback" trans_value="index_25" onclick="close_box('.addVideo',2);">{$T.titles.addvideopage.btn_cancel}</a>
    <a href="javascript:;" class="fr btn-small btn-blue" id="addvideook" trans_value="index_26" >{$T.titles.addvideopage.btn_ok}</a>
  </div>