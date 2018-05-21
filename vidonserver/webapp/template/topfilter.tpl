<div class="topfiltercontent"  id="topfilterctx">
	{#foreach $T as topFilterData}
	<div class="clearfix filterblock">
		<div class="filtertitle">{$T.topFilterData.filterName} :</div>
		<div class="filtercontent" filtertype="{$T.topFilterData.filterType}">
			<span class="filterAll selected">{$T.topFilterData.selectedall}</span>
			{#foreach $T.topFilterData.filterList as eachFilter}
			<span>{$T.eachFilter}</span>
			{#/for}
		</div>
	</div>
	{#/for}
</div>
