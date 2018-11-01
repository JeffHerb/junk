/*! New York State Department of Taxation & Finance External Applications
 *  @description  Iflow External Applications
 *  @version      4.2.55.REL20180514
 *  @copyright    2018 New York State Department of Taxation & Finance
 */

uiResponsive.banner=function(){var CLASSES_hidden="hidden",CLASSES_navContainer="nav-container",CLASSES_globalNav="global-nav",CLASSES_siteBar="site-bar",CLASSES_active="active",CLASSES_activeMenu="active-site-menu",CLASSES_activeGovBar="active-gov-bar",IDS_globalNav="global-nav",IDS_mobileGovBar="mobile-gov-bar",IDS_mobileSiteMenu="mobile-site-menu",IDS_uNavBanner="nygov-universal-navigation-frame",ATTRIBUTES_active="data-active",HTML={siteBar:'<div class="site-wrap"><div class="site-functions"><ul class="mobile-functions"><li><a href="#" id="'+IDS_mobileGovBar+'" class="mobile-icons '+IDS_mobileGovBar+'" data-active="'+CLASSES_activeGovBar+'"><span class="accessibility-text">Open New York State Navigation</span></a></li></ul></div><div class="site-title"><a href="//tax.ny.gov" onclick="PLUGIN.tracking.trackEvent(\'BannerResponsive\',\'Link click\',\'Agency title\');" target="_blank" class="site-logo"><span class="site-title-line-1">Department of </span><span class="site-title-line-2">Taxation and Finance</span></a></div><div class="site-functions"><ul class="mobile-functions"><li><a href="#" id="'+IDS_mobileSiteMenu+'" class="mobile-icons mobile-menu-button" data-active="'+CLASSES_activeMenu+'">Menu</a></li></ul></div></div>'},uNavBannerLastHeight=86,siteBar=null,navContainer=null,uNavBanner=null,du={browser:uiUtil.browser,query:uiUtil.query,queryOne:uiUtil.queryOne,matches:uiUtil.matches,addCSSRule:uiUtil.css.addRule,getParentElem:uiUtil.getParentElem,trim:uiUtil.trim,extend:uiUtil.extend,breakpoints:uiResponsive.getBreakpoints(),logError:uiUtil.errorHandling.jsLog.addEntry,event:{stop:uiUtil.stopEvent}},priv={};return priv.setupPage=function(){return uiIncludes.banners.renderUNav(),priv.insertBanner(),document.documentElement.classList.remove("banner-loading"),document.getElementById(IDS_mobileSiteMenu),document.getElementById(IDS_mobileGovBar),document.getElementById(IDS_globalNav),navContainer=du.queryOne("."+CLASSES_navContainer),uNavBanner=document.getElementById(IDS_uNavBanner),document.body.addEventListener("click",priv.onBodyClick,!1),du.query(".nav-container .noresponsive-link a").forEach(function(a){a.addEventListener("click",uiResponsive.events.onDesktopRequestClick,!1)}),window.addEventListener("resize",priv.updateUNavSize,!1),!0},priv.teardown=function(noDesktopBanner){var banner;return noDesktopBanner||((banner=document.getElementById("bannerContainer"))&&(banner.innerHTML=""),uiIncludes.banners.display({bRenderNavHeader:!1,doInsert:!0})),priv.removeBanner(),document.body.removeEventListener("click",priv.onBodyClick,!1),window.removeEventListener("resize",priv.updateUNavSize,!1),!0},priv.insertBanner=function(){var navContainer,menuList,listItem,anchor,referenceElement,nav=document.createElement("nav"),bannerObj=uiIncludes.banners.oBannerJSON.bannerSection;return(siteBar=document.createElement("header")).className=CLASSES_siteBar,siteBar.innerHTML=HTML.siteBar,nav.id=IDS_globalNav,nav.className=CLASSES_globalNav,(navContainer=document.createElement("div")).classList.add(CLASSES_navContainer),navContainer.classList.add(CLASSES_hidden),menuList=document.createElement("ul"),[uiIncludes.modeToggleLinks.desktop].concat(priv.getNavHeaderLinks()).concat(bannerObj.bannerLinks).forEach(function(bannerLink){!uiIncludes.banners.oDefaultSettings.bRenderDTFBanner&&/support|contactUs/.test(bannerLink.id)||(listItem=document.createElement("li"),anchor=document.createElement("a"),bannerLink.cssClass&&bannerLink.cssClass.split(" ").forEach(function(c){listItem.classList.add(c)}),anchor.href=bannerLink.url,anchor.setAttribute("title",bannerLink.title),anchor.setAttribute("target",uiGlobal.sTargetEnum[bannerLink.target]),anchor.addEventListener("click",priv.trackMenuLink),anchor.innerHTML=bannerLink.label,listItem.appendChild(anchor),menuList.appendChild(listItem))}),navContainer.appendChild(menuList),nav.appendChild(navContainer),referenceElement=document.getElementById("pageContainer"),document.body.insertBefore(siteBar,referenceElement),document.body.insertBefore(nav,referenceElement),!0},priv.removeBanner=function(){return du.query(".site-bar, #"+IDS_globalNav).forEach(function(elem){elem.parentNode.removeChild(elem)}),!0},priv.getNavHeaderLinks=function(){var navLinks=[],bannerLinkObj={id:"",cssClass:"",label:"",url:"",title:"This will open a new window to the ",target:"blank"};return du.query("#navHeader a").forEach(function(a){var obj=du.extend(!0,{},bannerLinkObj);obj.id=a.innerHTML.toLowerCase().replace(/\W/g,"_"),obj.label=a.innerHTML,obj.url=a.href,obj.title+=obj.label+" page",navLinks.push(obj)}),navLinks},priv.updateUNavSize=function(){var newHeight=0,currHeight=parseInt(uNavBanner.style.height,10);return(isNaN(currHeight)||currHeight<86)&&(currHeight=86),currHeight!==uNavBannerLastHeight&&(newHeight=(uNavBannerLastHeight=currHeight)-2,du.addCSSRule(".bp-main ."+CLASSES_activeGovBar+" .site-bar {top: "+newHeight+"px !important;}"),du.addCSSRule(".bp-main ."+CLASSES_activeGovBar+" .gov-bar {height: "+newHeight+"px !important;}"),du.addCSSRule(".bp-main.responsive .gov-bar, .bp-main .site-bar {-webkit-transition-duration: 300ms;transition-duration: 300ms;}"),!0)},priv.onBodyClick=function(evt){var activeClass,targ=evt.target;if(targ.getAttribute(ATTRIBUTES_active)){if((activeClass=targ.getAttribute(ATTRIBUTES_active))!==CLASSES_activeGovBar||document.body.classList.contains(CLASSES_activeGovBar)||priv.updateUNavSize(),activeClass!==CLASSES_activeMenu&&(evt.preventDefault(),du.event.stop(evt)),priv.onActiveElementClick(targ),activeClass!==CLASSES_activeMenu)return!1}else"INPUT"!==targ.nodeName&&priv.onOutsideDropdownClick(evt,targ)},priv.trackMenuLink=function(evt){PLUGIN.tracking.trackEvent("BannerResponsive","Link click",du.trim(evt.target.textContent))},priv.removeOtherActive=function(active){var classToRemove=active.getAttribute(ATTRIBUTES_active);document.body.classList.remove(active.getAttribute(ATTRIBUTES_active)),classToRemove===CLASSES_activeMenu&&priv.specialEvents(classToRemove,!1),du.query("."+CLASSES_active,siteBar).forEach(function(elem){elem.classList.remove(CLASSES_active)})},priv.specialEvents=function(activeClass,isNowActive){activeClass===CLASSES_activeMenu?(document.body.style.minHeight="",isNowActive?(uiAnimate.height.expand(navContainer),PLUGIN.tracking.trackEvent("BannerResponsive","Menu","Open")):uiAnimate.height.collapse(navContainer)):isNowActive&&activeClass===CLASSES_activeGovBar&&PLUGIN.tracking.trackEvent("BannerResponsive","uNav","Open")},priv.onOutsideDropdownClick=function(){var activeElems=du.query("."+CLASSES_active);return!!activeElems.length&&(priv.closeOpenDropDown(activeElems),!0)},priv.closeOpenDropDown=function(activeElems){void 0===activeElems&&(activeElems=du.query("."+CLASSES_active)),activeElems.forEach(function(elem){var classes=du.trim(elem.getAttribute(ATTRIBUTES_active));0<classes.length&&classes.split(" ").forEach(function(className){document.body.classList.remove(className),className===CLASSES_activeGovBar?PLUGIN.tracking.trackEvent("BannerResponsive","uNav","Close"):className===CLASSES_activeMenu&&PLUGIN.tracking.trackEvent("BannerResponsive","Menu","Close")}),elem.classList.remove(CLASSES_active)}),priv.specialEvents(CLASSES_activeMenu,!1)},priv.onActiveElementClick=function(targ){var activeClass=targ.getAttribute(ATTRIBUTES_active),activeElems=du.query("."+CLASSES_active);return 0<activeElems.length&&activeElems[0].getAttribute(ATTRIBUTES_active)!==targ.getAttribute(ATTRIBUTES_active)&&priv.removeOtherActive(activeElems[0]),document.body.classList.contains(activeClass)?(activeClass===CLASSES_activeGovBar&&(uiUtil.browser.isAndroidBrowser&&setTimeout(function(){document.documentElement.classList.remove("delay-show-nygovBanner")},10),PLUGIN.tracking.trackEvent("BannerResponsive","uNav","Close")),document.body.classList.remove(activeClass),targ.classList.remove(CLASSES_active),document.body.classList.remove("active-sub-menu"),priv.specialEvents(activeClass),activeClass===CLASSES_activeMenu&&PLUGIN.tracking.trackEvent("BannerResponsive","Menu","Close")):(document.body.classList.add(activeClass),targ.classList.add(CLASSES_active),priv.specialEvents(activeClass,!0),uiUtil.browser.isAndroidBrowser&&activeClass===CLASSES_activeGovBar&&setTimeout(function(){document.documentElement.classList.add("delay-show-nygovBanner")},400)),!1},{setup:function(){return du.browser.isResponsive?(du.browser.isSmallScreen||window.innerWidth<=du.breakpoints.main.maxWidth?domready(priv.setupPage):"undefined"!=typeof enquire&&enquire.register("screen and (max-width: "+du.breakpoints.main.maxWidth+"px)",{deferSetup:!0,setup:function(){domready(priv.setupPage)}}),!0):(document.documentElement.classList.remove("banner-loading"),!1)},teardown:function(noDesktopBanner){"boolean"!=typeof noDesktopBanner&&(noDesktopBanner=!1),priv.teardown(noDesktopBanner)}}}();