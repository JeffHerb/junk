/*! New York State Department of Taxation & Finance External Applications
 *  @description  Iflow External Applications
 *  @version      4.2.55.REL20180514
 *  @copyright    2018 New York State Department of Taxation & Finance
 */

try{window.epay||(window.epay={}),window.epay.ccbrowser=function(){var DEFAULT_TEXT="If you wish to pay by credit card or debit card you will need to use a different web browser or upgrade this web browser.",scriptTag=null,_init=function(){if(!uiUtil.browser.isOldIE)return!0;(scriptTag=document.getElementById("epay-credit-card-message"))?_hideCreditCardButton():_insertWarning()},_insertWarning=function(msgText){var mountNode,container;if((mountNode=document.getElementById("errorMessages"))||(mountNode=document.getElementById("legend"))||(mountNode=document.getElementById("pageInstructions")),!mountNode)return!0;(container=document.createElement("div")).setAttribute("tabIndex","1"),uiUtil.css.addClass(container,"error-messages"),uiUtil.css.addClass(container,"pageMsg"),epay.ccbrowser.warningText&&(msgText=epay.ccbrowser.warningText),msgText||(msgText=DEFAULT_TEXT),container.innerHTML='<ul class="errorList"><li class="msgWarning"><div class="msgWarningIcon msgIcon">Warning</div><p>'+msgText+"</p></li></ul>",mountNode.parentNode.insertBefore(container,mountNode.nextSibling)},_hideCreditCardButton=function(){var msgText,group=uiUtil.getParentElem(scriptTag,".group"),messageWrapper=document.createElement("div"),messagePara=document.createElement("p");group&&uiUtil.query("*",group).forEach(function(elem){"H4"!==elem.nodeName&&uiUtil.css.addClass(elem,"hidden")}),epay.ccbrowser.warningText&&(msgText=epay.ccbrowser.warningText),msgText||(msgText=DEFAULT_TEXT),messagePara.innerHTML=msgText,uiUtil.css.addClass(messagePara,"text"),uiUtil.css.addClass(messageWrapper,"groupInstructions"),messageWrapper.appendChild(messagePara),group?group.appendChild(messageWrapper):_insertWarning()};return window.attachEvent||"function"!=typeof domready?uiUtil.attachEvent(window,"load",_init):domready(_init),{getVersion:function(){return"1.0.0.REL20160616"}}}()}catch(e){}