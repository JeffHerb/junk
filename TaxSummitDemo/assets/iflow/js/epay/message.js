/*! New York State Department of Taxation & Finance External Applications
 *  @description  Iflow External Applications
 *  @version      4.2.55.REL20180514
 *  @copyright    2018 New York State Department of Taxation & Finance
 */

try{!function(){var _init=function(){var mountNode=document.getElementById("errorMessages");mountNode||(mountNode=document.getElementById("legend"))||(mountNode=document.getElementById("pageInstructions")),mountNode&&_insertWarning(mountNode)},_insertWarning=function(mountNode){var container;(container=document.createElement("div")).setAttribute("tabIndex","1"),uiUtil.css.addClass(container,"error-messages"),uiUtil.css.addClass(container,"pageMsg"),container.innerHTML='<ul class="errorList"><li class="msgWarning"><div class="msgWarningIcon msgIcon">Warning</div><p>We are changing our bank accounts. If you have a debit block on your bank account, see the updated debit block information above.</p></li></ul>',mountNode.parentNode.insertBefore(container,mountNode.nextSibling)};window.attachEvent||"function"!=typeof domready?uiUtil.attachEvent(window,"load",_init):domready(_init)}()}catch(e){}