 {#if $P.StaticDatas.editLibraryState==1}
<div class="editMoveBlock editlibraryblock" >
	<div class="editlibraryinfo">
		<div class="libraryname ">
		<div class="vertical">
			<p class="vertical_wrap">
				<span id="siderbar_channel" class="vertical_content ">{$P.StaticDatas.editLibraryStatic.editLibraryStr_1}</span>
			</p>
		</div>
		</div>
		<div class="selectedinfo clearfix">
			<p>
				{$P.StaticDatas.editLibraryStatic.editLibraryStr_2}(
				<span class="selectedCount" id="editlibrarymovenum">0</span>
				)
			</p>
			<p class="selectedAll editLibraryselectedAll">
				<span class="checkbox"></span>
				<span>{$P.StaticDatas.editLibraryStatic.editLibraryStr_3}</span>
			</p>
		</div>
		<div class="transferredinfo">
			<p>{$P.StaticDatas.editLibraryStatic.editLibraryStr_4}</p>
			<div class="dropdown dropdown-small dropdown-bg transferredTo">
				<div class="jt"></div>
				
				<input class="input_dropdown input" cus_value="{$T.transfeeredto.id}" value="{$T.transfeeredto.name}" disabled="true" />
				<ul class="filletbot4"  style="display: none;">
				{#foreach $T.libraryList as eachData}
					<li cus_value="{$T.eachData.id}">{$T.eachData.name}</li>
				{#/for}	
				<li cus_value="-10">{$P.StaticDatas.editLibraryStatic.editLibraryStr_5}</li>
				</ul>
			</div>
		</div>

		<div class="editlibrarybtn">
			<a href="javascript:;" class="editlibrarycannel" title="{$P.StaticDatas.editLibraryStatic.editLibraryStr_btn1}"></a>
			<a href="javascript:;" class="editlibraryok disable"  title="{$P.StaticDatas.editLibraryStatic.editLibraryStr_btn2}"></a>
		</div>
		<div class="clr"></div>
	</div>
</div>
{#else}
<div class="editCombineBlock editlibraryblock">
	<div class="editlibraryinfo">
		<div class="libraryname">
		<div class="vertical">
			<p class="vertical_wrap">
				<span id="siderbar_channel" class="vertical_content ">{$P.StaticDatas.editLibraryStatic.editLibraryStr_1}</span>
			</p>
		</div>
		</div>
		<div class="selectedinfo clearfix">
			<p>
				{$P.StaticDatas.editLibraryStatic.editLibraryStr_2}(
				<span class="selectedCount" id="editlibrarycomnum">3</span>
				)
			</p>
			<p class="selectedAll editLibraryselectedAll">
				<span class="checkbox"></span>
				<span>{$P.StaticDatas.editLibraryStatic.editLibraryStr_3}</span>
			</p>
		</div>
		<div class="transferredinfo">
			<p>{$P.StaticDatas.editLibraryStatic.editLibraryStr_4}</p>
			<input class="input-small" id="editCombineSetName" type="text" value="{$T.setName}">
			<p>{$P.StaticDatas.editLibraryStatic.editLibraryStr_5}</p>
			<div class="dropdown dropdown-small dropdown-bg ">
				<div class="jt"></div>
				<a cus_value="My Treasure" href="javascript:;" class="input_dropdown fillet4"  title=""> <b class="font">{$T.settype}</b>
					<span></span>
				</a>
				<ul class="filletbot4"  style="display: none;">
					{#foreach $T.libraryList as eachData}
						<li cus_value="{$T.selectedList}">{$T.eachData}</li>
					{#/for}	
				</ul>
			</div>
		</div>
		<div class="editlibrarybtn">
			<a href="javascript:;" class="editlibrarycannel"  title="{$P.StaticDatas.editLibraryStatic.editLibraryStr_btn1}"></a>
			<a href="javascript:;" class="editlibraryok"  title="{$P.StaticDatas.editLibraryStatic.editLibraryStr_btn2}"></a>
		</div>
	</div>
</div>
{#if}