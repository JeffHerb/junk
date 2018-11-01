/*! New York State Department of Taxation & Finance External Applications
 *  @description  Iflow External Applications
 *  @version      4.2.55.REL20180514
 *  @copyright    2018 New York State Department of Taxation & Finance
 */

!function(){var pageBegin='<div id="pageContainer"><a href="#main" id="skipnav">skip navigation</a>',beforeTitle='<div id="pageHeader"><h1 id="main">',afterTitle='</h1></div><div class="hr" id="hr"></div><div id="pageInstructions"><div id="errorPageMessage">',pageEnd='</div></div><div class="buttonGroup center"><input type="button" class="button" onclick="javascript:window.close();" value="Close" tabindex="1"></div></div>',content='<p class="text">The Department of Taxation and Finance conducts information technology maintenance during the following time periods:</p><div class="text center"><div class="tableDiv"><div class="w50 float-left rt">Monday through Saturday:</div><div class="float-left">4:00 am - 6:00 am</div></div><div class="tableDiv"><div class="w50 float-left rt">Sundays:</div><div class="float-left">9:00 pm - 10:00 pm</div></div></div><p class="text spaceL">If you have received this message during one of these time periods, please try again after the maintenance is completed and all services are restored.</p><p class="text">If you are receiving this message outside of these time periods, we invite you to <a href="http://tax.custhelp.com/app/ask/c/119/question_type/74" target="_blank" title="This will open a new window to Individual Taxpayer Answer Center">inform us of the problem</a>. Please include information concerning the specific services you are experiencing issues with. This feedback will assist us in improving the performance of our Web site and electronic services.</p>';function _setup(){try{var html;return html=pageBegin,html+=beforeTitle,document.title?html+=uiUtil.trim(document.title)||"&nbsp;":html+="&nbsp;",html+=afterTitle+content+pageEnd,html+=uiIncludes.footer.renderXHTML({returnHTML:!0}),document.body.innerHTML=html,uiResponsive.setup(),!0}catch(e){return uiUtil.errorHandling.jsLog.addEntry(e,arguments),!1}}try{if(!(document&&document.body&&document.body.getElementsByTagName))throw new Error("Document not ready, cannot render page yet");_setup(),setTimeout(uiIncludes.banners.display,10)}catch(e){window.attachEvent||"function"!=typeof domready?(uiUtil.attachEvent(window,"load",_setup),uiUtil.attachEvent(window,"load",uiIncludes.banners.display)):(domready(_setup),domready(uiIncludes.banners.display))}}();