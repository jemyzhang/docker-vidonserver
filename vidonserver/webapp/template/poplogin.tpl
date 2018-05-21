<a class="poploginClose close2"  href="javascript:;" onClick="close_box('.poplogin',1);"></a>
<div class="tckuangcon fillet4">
  <!--未登录-->
  <div id="login">
    <h4>{$P.loginStaticDatas.loginStr_no_1}</h4>
    <div class="loginblock">
      <p class="err" id="loginerr"></p>
      <div class="int">
         <input  class="hui" type="text" id="user" name="user" value="{$P.loginStaticDatas.loginStr_no_2}">
      </div>
      <div class="int">
        <input  id="showPwd"  type="text" class="hui" name="showPwd" value="{$P.loginStaticDatas.loginStr_no_3}">
        <input id="password" type="password" name="password"  style="display:none">
      </div>
      <a class="submitbtn btn btn-blue" id="loginbtn"  href="javascript:;">{$P.loginStaticDatas.loginStr_no_4}</a>
      <div class="selectNationality selected" id="selectNationality" trans_value="index_56">{$P.loginStaticDatas.loginStr_no_5}</div>
      <div class="clr"></div>
    </div>
    <div class="tips">
      <P class="tip1"><a href="javascript:;" target="_blank">{$P.loginStaticDatas.loginStr_no_6}</a>
        <a href="javascript:;"  target="_blank">{$P.loginStaticDatas.loginStr_no_7}</a></P>
     <P trans_value="index_58" style="padding:20px  20px 0px 20px;">{$P.loginStaticDatas.loginStr_no_8}</P>
    </div>
  </div>
  <!--  未登录结束-->
  <!--已登录-->
  <div id="login_ok" style="display:none;">
    <h4>{$P.loginStaticDatas.loginStr_ok_1}</h4>
    <div class="loginblock2">
      <div class="fl fillet10"><img class="fillet10" id="accout_img" src="" width="150" height="150" ></div>
      <div class="fr">
        <table  class="fillet4">
          <tr>
            <td align="right" class="row1 col1" >{$P.loginStaticDatas.loginStr_ok_2}</td>
            <td  class="row1" id="accout"></td>
          </tr>
          <tr>
            <td align="right" class="col1">{$P.loginStaticDatas.loginStr_ok_3}</td>
            <td id="email"></td>
          </tr>
         
        </table>
        <div class="isAnonymousLogon" id="isAnonymousLogon">
          <p class="checkboxblock">
            <span checkbox_state="false" class="checkbox"></span>
           <span class="white">{$P.loginStaticDatas.loginStr_ok_6}</span>
          </P>
          <p class="isAnonymousLogonDes">{$P.loginStaticDatas.loginStr_ok_8}</p>
        </div>
      </div>
      <a href="javascript:;" class="btn-small btn-blue logout"  id="logoutbtn">{$P.loginStaticDatas.loginStr_ok_4}</a>
      <P>{$P.loginStaticDatas.loginStr_ok_5}</P>
    </div>
  </div>
</div>
