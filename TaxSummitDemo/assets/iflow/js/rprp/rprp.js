/*! New York State Department of Taxation & Finance External Applications
 *  @description  Iflow External Applications
 *  @version      4.2.55.REL20180514
 *  @copyright    2018 New York State Department of Taxation & Finance
 */

var rprp=function(){var JADE_ACTION_aba="RPIR_DIRD01_RETRIEVE_BANK_NAME_ACTION",abaInput=null,abaBankNameDiv=null,abaBankNameInput=null,_priv={},_init=function(){try{_priv._getAbaNumberInit()}catch(e){uiUtil.errorHandling.jsLog.addEntry(e,arguments)}};return _priv._getAbaNumberInit=function(){try{if(abaInput=document.getElementById("ROUTING_NUMBER"))return uiUtil.attachEvent(abaInput,"blur",_priv._getAbaNumber),abaBankNameDiv=document.getElementById("bankNameDiv"),abaBankNameInput=document.getElementById("BANK_NAME"),!0}catch(e){uiUtil.errorHandling.jsLog.addEntry(e,arguments)}},_priv._getAbaNumber=function(){try{var settings,routingNum=uiUtil.trim(abaInput.value);routingNum.length?(settings={sUrl:"IFlowAjaxGatewayServlet",iTimeout:"",sMethod:"POST",oParams:"ROUTING_NUMBER="+routingNum+"&jadeAction="+JADE_ACTION_aba,sSpinElemId:"acctInfoGrp",onSuccessXtra:_priv._getAbaNumberAjaxSuccess,onError:_priv._getAbaNumberAjaxError,onTimeout:_priv._getAbaNumberAjaxError},uiMethods.ajax.execute(settings),uiMethods.buttons.mutex.disableAll()):_priv._getAbaNumberClearBankName()}catch(e){uiUtil.errorHandling.jsLog.addEntry(e,arguments)}},_priv._getAbaNumberAjaxSuccess=function(xhr){var response=null;try{"SUCCESS"===(response=JSON.parse(xhr.responseText)).status?(abaBankNameDiv.innerHTML=response.data.BANK_NAME,abaBankNameInput.value=response.data.BANK_NAME,uiUtil.setFocus("ACCOUNT_NUMBER")):/INVALID_CONTRACT|ERROR/.test(response.status)?_priv._getAbaNumberClearBankName():"FORWARD"===response.status&&(window.location.href=response.forwardPage)}catch(e){uiUtil.errorHandling.jsLog.addEntry(e,arguments)}finally{uiMethods.buttons.mutex.enableAll(),response&&response.userMessages&&(uiMethods.iFlowMessages.oJSON=response.userMessages,uiMethods.iFlowMessages.display())}},_priv._getAbaNumberAjaxError=function(){try{window.location.href="error.jsp"}catch(e){uiUtil.errorHandling.jsLog.addEntry(e,arguments)}},_priv._getAbaNumberClearBankName=function(){try{abaBankNameDiv.innerHTML="",abaBankNameInput.value=""}catch(e){uiUtil.errorHandling.jsLog.addEntry(e,arguments)}},window.attachEvent||"function"!=typeof domready?uiUtil.attachEvent(window,"load",_init):domready(_init),{setCalendarCustomMinDate:function(idList,month,day,yearsAgo){try{var startDate,configs=[],ids=uiUtil.trim(idList,",").split(",");yearsAgo="number"==typeof yearsAgo?yearsAgo:120,startDate=(month=month||"01")+"/"+(day=day||"01")+"/"+((new Date).getFullYear()-yearsAgo),ids.forEach(function(id){configs.push({inputId:id,minDate:startDate})}),PLUGIN.calendar.customize({datePickers:configs})}catch(e){uiUtil.errorHandling.jsLog.addEntry(e,arguments)}},getVersion:function(){return"1.5.0.REL20131113"}}}();