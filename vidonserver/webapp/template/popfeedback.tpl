<a class="popFeedbackClose close"  href="javascript:;" id="btnPopFeedbackClose" onClick="close_box('.popFeedback',1);"></a>
<h3 class="fillettop4">{$P.staticFeedbackData.title}</h3>
<div class="tckuangcon filletbot4">
    <div class="padding20">
        <p>{$P.staticFeedbackData.des_1}</p>
         <p>{$P.staticFeedbackData.des_2}</p>
        {#if $T.username==""}
        <div class="inputblock col-3 mr20">
            <p class="white">{$P.staticFeedbackData.username_str}</p>
            <input type="text" value="" id="feedback_username" class="input-small"></div>

        <div class="inputblock col-3 mr20">
            <p class="white">{$P.staticFeedbackData.email_str}</p>
            <input type="text" value="" id="feedback_email" class="input-small"></div>
        {#else}
        <div class="usermes"><span></span><P class="white">{$T.username}<br>{$T.email}</P><div class="clr"></div></div>
        {#/if}
        <div class="clr"></div>
        <div class="inputblock col-3 mr20">
            <p class="white">{$P.staticFeedbackData.question_str1}</p>
            <div class="dropdown selected_q_str1">
                <div class="jt"></div>
                <a cus_value="0" href="javascript:;" class="input_dropdown fillet4" id="feedback_q_str1" title=""> 
                <b class="font" >{$P.staticFeedbackData.question_str3}</b>
                    <span></span>
                </a>
                <ul class="filletbot4" id="feedback_q_str1_list" >
                   
                </ul>
            </div>

        </div>
        <div class="inputblock col-3 mr20">
            <p class="white">{$P.staticFeedbackData.question_str2}</p>
            <div class="dropdown selected_q_str2 disable">
                <div class="jt"></div>
                <a cus_value="0" href="javascript:;" class="input_dropdown fillet4" id="feedback_q_str2" title=""> 
                <b class="font">{$P.staticFeedbackData.question_str4}</b>
                    <span></span>
                </a>
                <ul class="filletbot4" id="feedback_q_str2_list">
                    
                </ul>
            </div>
        </div>
        <div class="inputblock col-3 loadinglog" >
            <p class="white">
                <span class="checkbox selected" checkbox_state="true" id="isloadlog"></span>
                <span>{$P.staticFeedbackData.loadlog_str}</span>
            </p>

        </div>
        <div class="clr"></div>
        <p class="white">
            {$P.staticFeedbackData.verson_str}
            <span>{$T.verson}</span>
        </p>
        <div class="inputblock">
            <p class="white">{$P.staticFeedbackData.question_des_str}</p>
            <textarea id="feedback_details" name="" style="height: 150px;"></textarea>
        </div>
    </div>
    <div class="btnblock">
        <a id="feedbackCancel" class="fl btn-small btn-white" onclick="close_box('.popFeedback',1);" href="javascript:;">{$P.staticFeedbackData.btn_2}</a>
        <a id="feedbackOk" class="fr btn-small btn-blue" href="javascript:;">{$P.staticFeedbackData.btn_1}</a>
        <div class="clr"></div>
    </div>
</div>