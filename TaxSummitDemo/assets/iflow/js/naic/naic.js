/*! New York State Department of Taxation & Finance External Applications
 *  @description  Iflow External Applications
 *  @version      4.2.55.REL20180514
 *  @copyright    2018 New York State Department of Taxation & Finance
 */

PLUGIN.namespace("nestedCategories"),PLUGIN.nestedCategories=function(options){var breadcrumbsWrapper,separator,nextCategoryButton,prevCategoryButton,categoryChoiceWrapper,resultWrapper,centralDisplay,categoryListWrapper,descWrapper,INITIAL_NESTED_CATEGORIES=null,ERROR_MESSAGES={standard:"An error has occurred",ajaxError:uiMethods.ajax.oDefaultSettings.sErrorMessage,retrievingOptions:"An error occurred while retrieving the options.",selectOption:"Please select one of the options."},_du={addClass:uiUtil.css.addClass,removeClass:uiUtil.css.removeClass,hasClass:uiUtil.css.hasClass,getStyleValue:uiUtil.css.getStyleValue,query:uiUtil.query,queryOne:uiUtil.queryOne,event:{add:uiUtil.attachEvent,getTarget:uiUtil.getHTMLObjFromEvent,trigger:uiEvents.trigger},extend:uiUtil.extend,typeOf:uiUtil.typeOf,logError:uiUtil.errorHandling.jsLog.addEntry,hasStrAttr:function(elem,attr){try{return!(!elem.hasAttribute||!elem.hasAttribute(attr))||"string"==typeof elem[attr]}catch(e){return!1}}},dataStore=[],settings=_du.extend(!0,{},{classPrefix:"",resultProps:[]},options),DEFAULT_CATEGORY_OBJECT={id:"",desc:"",name:"",parentId:""},_events={},_category={},_description={},_breadcrumbs={},_results={},_util={};return _events._init=function(){try{_du.event.add(document.body,"click",_events._onBodyClick),_du.event.add(document.body,"change",_events._onBodyChange),_du.event.add(document.body,"resizecentraldisplay",_util._resizeCentralDisplay),_du.event.add(window,"resize",_events._onWindowResize),_du.event.trigger(document.body,"resizecentraldisplay")}catch(e){_du.logError(e,arguments)}},_events._onBodyClick=function(evt){try{var targ=_du.event.getTarget(evt);_du.hasClass(targ,"visibleLabel")&&"object"==typeof uiMethods?uiMethods.hiddenLabels.events.onLabelClick(evt):_du.hasClass(targ,"rbDynamicResizable")?_description._display(evt):_du.hasClass(targ,"nc-next-category")?_category._load(evt):_du.hasClass(targ,"nc-prev-category")?_breadcrumbs._onPrevButtonClick(evt):_du.hasClass(targ,"nc-read-more")?_du.hasClass(targ,"nc-opened")?_description._collapse(evt):_description._expand(evt):_du.hasStrAttr(targ,"data-parent-id")&&_breadcrumbs._onItemClick(evt)}catch(e){_du.logError(e,arguments)}},_events._onBodyChange=function(evt){try{_du.hasClass(_du.event.getTarget(evt),"rbDynamicResizable")&&_description._display(evt)}catch(e){_du.logError(e,arguments)}},_events._onWindowResize=function(evt){try{_du.query(".nc-long-desc").forEach(function(elem){_util._getElementDimension(elem,"height")}),_du.event.trigger(document.body,"resizecentraldisplay")}catch(e){_du.logError(e,arguments)}},_category._setInitial=function(array){INITIAL_NESTED_CATEGORIES=array},_category._load=function(evt){try{var id,i,isResult,radio=_du.query('input[type="radio"]').filter(function(el){return el.checked});if(!radio.length)return _util._displayPageError(ERROR_MESSAGES.selectOption),!1;for(_util._clearPageErrors(),id=radio[0].getAttribute("data-desc-id"),isResult=!1,i=dataStore.length;i--;)if(dataStore[i].id===id&&"true"===dataStore[i].isendcode){isResult=!0;break}_breadcrumbs._add(id),isResult?_results._display(dataStore[i]):_category._retrieve(id)}catch(e){_du.logError(e,arguments)}},_category._retrieve=function(parentId){try{PLUGIN.spinwheel.start(nextCategoryButton),_du.addClass(centralDisplay,settings.classPrefix+"loading"),uiMethods.ajax.execute({sUrl:"IFlowAjaxGatewayServlet",sMethod:"POST",oParams:"optionPicked="+parentId+"&jadeAction=NAIC_PBAC01_GETNEXTOPTIONS_ACTION",onSuccess:_category._onAjaxSuccess,onError:_category._onAjaxError,onComplete:_category._onComplete})}catch(e){_du.logError(e,arguments),PLUGIN.spinwheel.stop()}},_category._onAjaxSuccess=function(xmlHTTP,opts){try{var parentId,categories=JSON.parse(xmlHTTP.responseText);if(!categories||"array"!==_du.typeOf(categories.data.NAICData))return _util._displayPageError(ERROR_MESSAGES.ajaxError),!1;categories=categories.data.NAICData,parentId=/optionPicked=([^&]+)&/.exec(opts.oParams)[1],categories.forEach(function(cat){var alreadyStored=!1;if("object"!==_du.typeOf(cat))return!1;cat.parentId=parentId,cat=_du.extend(!0,{},DEFAULT_CATEGORY_OBJECT,cat),dataStore.forEach(function(d){d.id===cat.id&&(alreadyStored=!0)}),alreadyStored||dataStore.push(cat)}),_category._display(parentId),_util._setCentralDisplayValue("")}catch(e){_du.logError(e,arguments)}},_category._onAjaxError=function(xmlHTTP,opts){try{_util._displayPageError(ERROR_MESSAGES.ajaxError)}catch(e){_du.logError(e,arguments)}},_category._onComplete=function(xmlHTTP,opts){try{_du.removeClass(centralDisplay,settings.classPrefix+"loading"),PLUGIN.spinwheel.stop(nextCategoryButton)}catch(e){_du.logError(e,arguments)}},_category._getById=function(id){try{var cat=null;return dataStore.forEach(function(c){cat||id!==c.id||(cat=c)}),cat}catch(e){_du.logError(e,arguments)}},_category._getByParentId=function(parentId){try{var cat=null;return dataStore.forEach(function(c){cat||parentId!==c.parentId||(cat=c)}),cat}catch(e){_du.logError(e,arguments)}},_category._display=function(parentId){try{parentId||(parentId=""),_breadcrumbs._printHTML(),_category._printHTML(parentId),_du.event.trigger(document.body,"seldepradiosadded"),_util._clearPageErrors()}catch(e){_du.logError(e,arguments)}},_category._printHTML=function(parentId){try{var html="",i=0;dataStore.forEach(function(cat){var radioId;cat.parentId===parentId&&(html+='<div class="linePn labelXXS"><div class="labelPn"><div class="labelWrap"></div></div><div class="dataPn selDepFldsWrapper"><div class="selDepFields"><div class="rBtnWrapper" aria-controls="'+(radioId="rb"+parentId+"_"+i)+'_depFields"><input type="radio" name="category_'+parentId+'" id="'+radioId+'" data-desc-id="'+cat.id+'" class="rbDynamic rbDynamicResizable" value="'+radioId+'" tabindex="1"><div class="visibleLabel">'+cat.name+'</div><label for="'+radioId+'" id="'+radioId+'_label" class="hidden">'+cat.name+' Additional fields are revealed when this option is selected.</label></div><div id="'+radioId+'_depFields" class="fieldWrapper hidden" aria-hidden="true" aria-live="polite" aria-expanded="false" role="region" aria-describedby="'+radioId+'_label"><div class="nc-long-desc" id="'+cat.id+'_desc"></div></div></div></div></div>',i++)}),categoryListWrapper.innerHTML=html}catch(e){_du.logError(e,arguments)}},_description._display=function(evt){try{var container,descObj,descId=_du.event.getTarget(evt).getAttribute("data-desc-id");_description._collapse(_du.query(".nc-read-more").filter(function(elem){return _du.hasClass(elem,"nc-opened")})[0]),descObj=_category._getById(descId),_util._setCentralDisplayValue(_description._trimText(descObj.desc)),(container=document.getElementById(descObj.id+"_desc"))&&!container.innerHTML&&(container.innerHTML=_description._formatAsHTML(descObj.desc),64<_util._getElementDimension(container,"height")&&(_du.addClass(container,"nc-truncated"),container.parentNode.innerHTML+='<div class="nc-read-more">Show more</div>'))}catch(e){_du.logError(e,arguments)}},_description._expand=function(evt){try{var readMore=_du.event.getTarget(evt),longDesc=_du.queryOne(".nc-long-desc",readMore.parentNode);longDesc.style.maxHeight=longDesc.getAttribute("data-true-height")+"px",_du.removeClass(longDesc,"nc-truncated"),readMore.innerHTML="Show less",_du.addClass(readMore,"nc-opened")}catch(e){_du.logError(e,arguments)}},_description._collapse=function(o){try{var readMore,longDesc;if("element"===_du.typeOf(o))readMore=o;else{if("object"!==_du.typeOf(o)||"string"!==_du.typeOf(o.type))return!1;readMore=o.target}longDesc=_du.queryOne(".nc-long-desc",readMore.parentNode),_du.addClass(longDesc,"nc-truncated"),longDesc.style.maxHeight="",readMore.innerHTML="Show more",_du.removeClass(readMore,"nc-opened")}catch(e){_du.logError(e,arguments)}},_description._trimText=function(text){try{return text.replace(/^(?:\s|\\n)+|(?:\s|\\n)+$/g,"")}catch(e){_du.logError(e,arguments)}},_description._formatAsHTML=function(text){try{return _description._trimText(text).replace(/\\n/g,"<br>").replace(/\n/g,"<br>")}catch(e){_du.logError(e,arguments)}},_breadcrumbs._list=[],_breadcrumbs._add=function(id){try{var item=_category._getById(id);item&&_breadcrumbs._list.push(item)}catch(e){_du.logError(e,arguments)}},_breadcrumbs._printHTML=function(){try{var html="",endHtml="";if(!_breadcrumbs._list.length)return _du.addClass(breadcrumbsWrapper,"hidden"),_du.addClass(prevCategoryButton,"hidden"),_du.addClass(separator,"hidden"),!0;_breadcrumbs._list.forEach(function(item){html+='<div class="nc-nested-item">',html+='<a data-parent-id="'+item.parentId+'"',html+=">"+item.name+"</a>",endHtml+="</div>"}),_du.removeClass(prevCategoryButton,"hidden"),breadcrumbsWrapper.innerHTML=html+endHtml,_du.removeClass(breadcrumbsWrapper,"hidden"),_du.removeClass(separator,"hidden")}catch(e){_du.logError(e,arguments)}},_breadcrumbs._onPrevButtonClick=function(evt){try{var breadcrumb=_du.query(".nc-nested-item");breadcrumb.length&&(breadcrumb=(breadcrumb=breadcrumb[breadcrumb.length-1]).getElementsByTagName("a")[0],_breadcrumbs._selectItem(breadcrumb.getAttribute("data-parent-id")))}catch(e){_du.logError(e,arguments)}},_breadcrumbs._onItemClick=function(evt){try{var targ=_du.event.getTarget(evt);_breadcrumbs._selectItem(targ.getAttribute("data-parent-id"))}catch(e){_du.logError(e,arguments)}},_breadcrumbs._selectItem=function(parentId){try{var newList,searchId,cat=_category._getByParentId(parentId);_du.removeClass(categoryChoiceWrapper,"hidden"),_du.addClass(resultWrapper,"hidden"),""===parentId?_breadcrumbs._list=[]:(newList=[],searchId=parentId,_breadcrumbs._list.forEach(function(bc){bc.parentId===searchId?searchId=bc.id:bc.id===cat.id?searchId=bc.id:newList.push(bc)}),_breadcrumbs._list=newList),_category._display(parentId),_du.event.trigger(document.body,"resizecentraldisplay"),_util._clearPageErrors(),_util._setCentralDisplayValue("")}catch(e){_du.logError(e,arguments)}},_results._display=function(obj){try{_breadcrumbs._printHTML(),settings.resultProps.forEach(function(prop){_du.queryOne(".nc-results-display-"+prop).innerHTML=obj[prop].replace(/^GR_/,"")}),_du.addClass(categoryChoiceWrapper,"hidden"),_du.removeClass(resultWrapper,"hidden")}catch(e){_du.logError(e,arguments)}},_util._setCentralDisplayValue=function(val){try{if("string"!=typeof val)return!1;void 0!==centralDisplay.value?centralDisplay.value=val:centralDisplay.innerHTML=val,_du.event.trigger(document.body,"resizecentraldisplay")}catch(e){_du.logError(e,arguments)}},_util._resizeCentralDisplay=function(){try{var optionsHeight,dataDiv;if(window.matchMedia&&!window.matchMedia("(min-width: 830px)").matches)return;dataDiv=_du.queryOne(".dataPn",descWrapper),optionsHeight=categoryListWrapper.clientHeight,dataDiv.style.height=Math.max(100,optionsHeight-25.6-_du.queryOne(".labelPn",descWrapper).clientHeight)+"px"}catch(e){_du.logError(e,arguments)}},_util._displayPageError=function(message){try{message=message||ERROR_MESSAGES.standard,uiMethods.iFlowMessages.oJSON=JSON.stringify({iFlowMessages:{pageMessages:[{type:"error",description:message}]}}),uiMethods.iFlowMessages.display()}catch(e){_du.logError(e,arguments)}},_util._clearPageErrors=function(message){try{var i,messages=[];for(i in ERROR_MESSAGES)ERROR_MESSAGES.hasOwnProperty(i)&&messages.push(ERROR_MESSAGES[i]);_du.query(".msgError").forEach(function(listItem){-1<messages.indexOf(_du.queryOne("p",listItem).innerHTML)&&listItem.parentNode.removeChild(listItem)})}catch(e){_du.logError(e,arguments)}},_util._getElementDimension=function(elem,prop){try{var trueValue=0,wasHidden=_du.hasClass(elem,"hidden");return elem&&prop&&"element"===_du.typeOf(elem)&&"string"==typeof prop&&/^height$|^width$/.test(prop)?(_du.addClass(elem,"invisible"),wasHidden&&_du.removeClass(elem,"hidden"),trueValue=function(el,prop){var val="-1";try{val=parseFloat(window.getComputedStyle(el)[prop])}catch(e){val=el.currentStyle[prop]}return val}(elem,prop),isNaN(trueValue)?trueValue=-1:elem.setAttribute("data-true-height",trueValue),_du.removeClass(elem,"invisible"),wasHidden&&_du.addClass(elem,"hidden"),trueValue):-1}catch(e){_du.logError(e,arguments)}},{init:function _init(){try{breadcrumbsWrapper=_du.queryOne(".nc-nested-item-wrapper"),separator=_du.queryOne(".nc-separator"),resultWrapper=_du.queryOne(".nc-results-wrapper"),centralDisplay=_du.queryOne(".nc-central-display"),categoryListWrapper=_du.queryOne(".nc-category-list"),categoryChoiceWrapper=_du.queryOne(".nc-selection-wrapper"),prevCategoryButton=_du.queryOne(".nc-prev-category"),nextCategoryButton=_du.queryOne(".nc-next-category"),descWrapper=_du.queryOne(".nc-description-wrapper"),_init.arguments[0]&&"array"===_du.typeOf(_init.arguments[0])&&_init.arguments[0].length?(_category._setInitial(_init.arguments[0]),INITIAL_NESTED_CATEGORIES.forEach(function(cat){dataStore.push(_du.extend(!0,{},DEFAULT_CATEGORY_OBJECT,cat))})):_util._displayPageError(ERROR_MESSAGES.retrievingOptions),_category._display(),_du.addClass(_du.queryOne(".selDepFldsWrapper"),"selectedRB"),_du.query(".nc-long-desc").forEach(function(el){el.innerHTML=el.innerHTML.replace(/\n/g,"<br>").replace(/^<br>/,""),64<_util._getElementDimension(el,"height")&&(_du.addClass(el,"nc-truncated"),el.parentNode.innerHTML+='<div class="read-more">Show more</div>')}),_du.removeClass(_du.queryOne(".selDepFldsWrapper"),"selectedRB"),!PLUGIN.spinwheel&&nextCategoryButton&&Modernizr.load({load:uiGlobal.assets.urls.spinwheel}),_events._init()}catch(e){_du.logError(e,arguments)}}}}({classPrefix:"naics-",resultProps:["id","desc","name"]});