/** @preserve
 * New York State Department of Taxation & Finance
 * @description  UI-Only JavaScript code for running on external pages. No deployment is needed for this file. Used as testing for demos/prototypes.
 * @author       UI Support
 * @created      2009-01-18
 * @name         uiscript.js
 * @file         External Applications (iflow) test/prototype JavaScript code
 *
 * Change History (Include major changes/additions only)
 * Date          Author           Description
 * ---------------------------------------------------------------------------------
 * 01/18/2009    Manolo Farfan    Initial baseline.
 * 10/24/2009    Manolo Farfan    Improved coding to being solely Object Oriented
 * 04/29/2011    Craig Patik      Added uiMethods.tooltip() and helper classes,
 *                                    updated console.log() for IE8/9
 * 12/07/2011    Craig Patik      Added uitMethods.sampleCheck()
 * 02/15/2013    Manolo Farfan    Added banner
 * 03/13/2013    Craig Patik      Moved field instructions toggling to script.js
 * 07/19/2013    Manolo Farfan    Added dynamic sections indicators on print
*/

// Update asset file paths to match the S: drive structure since this is a mockup and not DEVM/UTM/Prod
uiGlobal.assetPath = '../../assets/iflow/'; // S: drive path
uiGlobal.sIFLOWImagesPath = uiGlobal.assetPath + 'images/';
uiGlobal.assets.urls.spinwheel = uiGlobal.assetPath + 'js/compiled/spinwheel.js';
uiGlobal.assets.urls.fastclick = uiGlobal.assetPath + 'js/compiled/fastclick.js';
uiGlobal.assets.urls.banner = uiGlobal.assetPath + 'js/compiled/banner.js';

// uNav
uiGlobal.assets.urls.unav.banner = uiGlobal.assets.protocol + '//static-assets.ny.gov/load_global_menu/ajax?iframe=true&target=blank';

// Uncomment this to import the test version of the uNav (only applies when running a server; does not affect HTML files opened from a drive)
// if (document.location.protocol.indexOf('http') !== -1) {
//     uiGlobal.assets.urls.unav.banner = uiGlobal.assets.protocol + '//nygovdev.prod.acquia-sites.com/load_global_menu/ajax?iframe=true&target=blank';
// }

uiGlobal.appCode = '_UI_';

// Events class
// =====================================================================================
var uitEvents = {
    // Methods:
    // --------
    ///<summary>Onload function</summary>
    onLoad: function () {
        try {
            // add method calls here
            uitTest.jumpToHash();
            uitMethods.printSpecial();
            // uitMethods.printDynamic();
        }
        catch (e) {
            console.log(e, 'uitEvents.onLoad');
        }
    }
};

// Main class
// =====================================================================================
var uitMain = {
    // Initialize page
    init: function () {
        try {
            if (window.attachEvent || typeof domready !== 'function') {
                uiUtil.attachEvent(window, 'load', uitEvents.onLoad);
            }
            else {
                domready(uitEvents.onLoad);
            }
        }
        catch (e) {
            console.log(e, 'uitMain.init');
        }
    }
};

/////////////////////
// Google tracking //
/////////////////////

uitMain.trackingSetup = function () {
    // Log to console instead (does not send to Google)
    if (!/\.gov$/.test(document.location.host)) { // This is the opposite of the test that determines whether to load the GA script in `modules/analytics.js`
        // Define our own GA that just logs to the console
        window.ga = function (a, b, category, action, label, value, isNonInteraction) {
            // Events
            if (a === 'send' && b === 'event') {
                // Must have at least category and action
                if (typeof category !== 'string' || typeof action !== 'string') {
                    alert('Bad event tracking! Must supply category and action');
                    return false;
                }

                category = uiUtil.trim(category).toLowerCase();
                action = uiUtil.trim(action);

                // Make sure the category and action are not empty strings
                if (!category.length || !action.length) {
                    alert('Bad event tracking! See console');
                    try { if (DEBUG_TRACKING) { console.error('Bad event tracking: "', category, '", "', action, '", "', label, '", ', value, ', ' + isNonInteraction); } } catch(e) {}
                    return false;
                }

                // No label
                if (typeof label !== 'string' || uiUtil.trim(label).length < 1) {
                    try { if (DEBUG_TRACKING) { console.info('Tracked event: "' + category  + '", "' + action + '"'); } } catch(e) {}
                }
                else {
                    label = uiUtil.trim(label);

                    // All components
                    if (typeof value === 'number' && value > -1) {
                        try { if (DEBUG_TRACKING) { console.info('Tracked event: "' + category + '", "' + action + '", "' + label + '", ' + value, + ', ' + isNonInteraction); } } catch(e) {}
                    }
                    // No value
                    else {
                        try { if (DEBUG_TRACKING) { console.info('Tracked event: "' + category + '", "' + action + '", "' + label + '", ' + isNonInteraction); } } catch(e) {}
                    }
                }
                // Log event
                // console.info('[GA Event] ', Array.prototype.slice.call(arguments));
            }
            // Some other request
            // else { console.log('[GA] ', Array.prototype.slice.call(arguments)); }
        };

        // Process queue
        if (uiGlobal.trackingQueue.length) {
            var ev = uiGlobal.trackingQueue.pop();
            var i = 0;

            while (ev && i < 100) {
                ga('send', 'event', ev.category, ev.action, ev.label, ev.value, ev.isNonInteraction);
                // console.info('popped from queue ', ev);
                ev = uiGlobal.trackingQueue.pop();
                i++;
            }
        }
    }
};

if (window.attachEvent || typeof domready !== 'function') {
    // `domready` sometimes jumps the gun on `window.attachEvent` browsers (IE7-9).
    // Those browsers would fall back to `window.onload` anyway.
    uiUtil.attachEvent(window, 'load', uitMain.trackingSetup);
}
else {
    domready(uitMain.trackingSetup);
}

// Methods class
// =====================================================================================
var uitMethods = {
    // Local variables/subclasses:
    // ---------------------------

    // Methods:
    // --------

    banner: {
        // Legacy method, code moved to uiIncludes.header.setup()
        display: function () {
            try {
                // uiIncludes.banners.display();
            }
            catch (e) {
                console.log(e, 'uitMethods.banner.display');
            }
        },

        renderRSTTBanner: function () {
            try {
                var html = '<style type="text/css">.non-dtf #bannerMain{width:100 %;position:relative}.non-dtf .bannerLeft{display:none}.non-dtf .bannerRight{min-height:56px;height:56px;margin-left:16px;background-size:311px 56px}.non-dtf .bannerBlock{padding-top:1.4em}.non-dtf .bannerBlock.last-child{font-size:10px;padding-top:.8em;text-align:right}.non-dtf .bannerNames{border-top:0;float:none;text-align:right;position:relative;top:0;top:3px\\9;*top:1px;right:16px} .non-dtf .bannerNames a,.non-dtf .bannerNames a span,.non-dtf .bannerNames a:visited,.non-dtf .bannerNames a:visited span{text-align:center;color:#fff}.non-dtf .bannerNames a:hover,.non-dtf .bannerNames a:hover span,.non-dtf .bannerNames a:visited:hover,.non-dtf .bannerNames a:visited:hover span{color:#ddd;text-decoration:none}.non-dtf .bannerNames a span{padding-right:27px} @media \\0screen { .non-dtf .bannerNames{top: 0;}}</style><!-- Banners --><div id="bannerContainer" class="non-dtf"><!-- Banner Inner Container [Start] --><div id="banner"><!-- 2011 OFT banner [Start] --><div id="nysbanner"><div style="height: 28px; background-color: #003366;"><a href="https://www.ny.gov/" target="_blank"><img style="float: left; border:none;" src="../../images/nysbanner_img1.png" alt="NY.gov Portal">  </a><a href="http://www.nysegov.com/citGuide.cfm?superCat=102&amp;cat=449&amp;content=main" target="_blank"><img style="float: left;border:none;" src="../../images/nysbanner_img2.png" alt="State Agency Listing">  </a><!-- search graphic--><a href="#" onclick="document.getElementById(\'sw_searchbox\').style.display=\'block\'; document.getElementById(\'searchgraphic\').style.display=\'none\'; document.getElementById(\'searchbox\').focus(); return false;" target="_blank"><img id="searchgraphic" style="float:right; border:none; display:block;" src="../../images/nysbanner_img3.png" alt="Search all of NY.gov">  </a><!--state wide search box--><form id="sw_searchbox" style="float: right; margin-right: 0.5em; display: none; background: transparent;" action="http://www.search.its.ny.gov/search" target="_blank" method="get"><p><input value="date:D:L:d1" name="sort" type="hidden"><input value="xml_no_dtd" name="output" type="hidden"><input value="UTF-8" name="ie" type="hidden"><input value="UTF-8" name="oe" type="hidden"><input value="default_frontend" name="client" type="hidden"><input value="default_frontend" name="proxystylesheet" type="hidden"><input value="default_collection" name="site" type="hidden"><label for="searchbox" style="display:none;">Enter your search terms</label><input type="text" size="15" name="q" maxlength="256" id="searchbox" title="Search"><input type="submit" id="searchbutton" style="height: auto !important;padding: 0.1em 0.25em !important;font-size: 1.05em !important;margin-left:0.2em !important;font-family: " segoe="" ui ",=" " "helvetica="" neue ",=" " tahoma,=" " arial=" " !important;"="" value="Search NY.GOV"></p> </form><!--end wide search box-->  </div>  </div><!-- 2011 OFT banner [End] --><!-- DTF Banner main pieces [Start] --><div id="bannerMain"> <!-- Banner block for department\'s, commissioner\'s text, links and search --> <div class="bannerRight"> <!-- Block for department\'s and commissioner\'s text --> <div class="bannerBlock"> <div class="bannerNYSDTF"> <!-- <div class="bannerNYS"><a href="https://www.tax.ny.gov/" title="This will open a new window to the New York State Department of Taxation and Finance home page" target="_blank">New York State</a></div> --> <div class="bannerDepartment"><a href="https://www.tax.ny.gov/" title="This will open a new window to the New York State Department of Taxation and Finance home page" target="_blank">New York State Unified Applications</a></div></div></div> <!-- Block for links and search --> <div class="bannerBlock last-child"> <div class="bannerNames"><a href="https://www.governor.ny.gov/" target="_blank" title="This will open a new window to the New York State\'s governor home page" id="bannerNameGovernor">Andrew M. Cuomo<br><span class="italicized">Governor</span></a></div></div></div>  <!-- Block for links and search [End] --></div><!-- DTF Banner main pieces [End] --></div><!-- Banner Inner Container [End] --></div>';

                document.write(html);
            }
            catch (e) {}
        }
    },

    printSpecial: function _printSpecial() {
        try {
            // Always display value-dependent fields on print
            uiUtil.css.addRule('@media print { [aria-expanded="false"] { display: block !important; } }');

            // // Hide uNav during printing for certain apps
            // if (/\b(PBWF|PBWM)_/.test(window.location.href)) {
            //     uiUtil.css.addRule('@media print { #nygovBanner, #nygovFooter {display: none;} }');
            //     console.log('no banner printing');
            // }
        }
        catch (e) {
            console.log(e, 'uitMethods.printSpecial');
        }
    },

    // Add indicators for dynamic sections on print
    printDynamic: function _printDynamic() {
        try {
            var dynamicSections = uiUtil.query('.valueDepRadiosWrapper, .valueDepDropdown, .selDepFields', document),
                i = dynamicSections.length,
                dynamicElem = null,
                wrapper = null,
                span = null;

            // add print css
            uiUtil.css.addRule('@media print { .valueDepRadiosWrapper, .valueDepDropdown, .selDepFields { position:relative; } .printDynamic { display:inline !important; position:absolute; top:6px; left:0; width:250px; height:1em; color:#fff; background:transparent url("' + uiGlobal.sIFLOWImagesPath + 'printDynamic.png") top left no-repeat; z-index:1000; } .printDynamic span { position:absolute; top:0; left:0; width:0.95em; margin:0; background-color:#080; line-height:normal; font-weight:normal; text-align:left !important; text-indent:2px; } .printDynamic .arrow-right { position:relative; top:0; left:0.95em; width:0; height:0; border-top:4px solid transparent; border-bottom:4px solid transparent; border-left:4px solid #080; margin-top:0.4em; } }');

            // loop through dynamic sections and get positioning
            while ((i -= 1) >= 0) {
                dynamicElem = dynamicSections[i];
                console.log(i + ') ' + dynamicElem.className);
                span = document.createElement('SPAN');
                span.setAttribute('class', 'hidden printDynamic');
                span.innerHTML = '<span>D</span><div class="arrow-right"></div>';

                if (dynamicElem.tagName !== 'FIELDSET') {
                    wrapper = uiUtil.getParentElem(dynamicElem, '.linePn fieldset .group');
                }
                else {
                    wrapper = uiUtil.query('.line, .linePn', dynamicElem)[0];
                }

                wrapper.appendChild(span);
                span = null;
            }
        }
        catch (e) {
            console.log(e, 'uitMethods.printDynamic');
        }
    },

    // Write errors to the console when viewing files locally
    setupErrorLogging: function _setupErrorLogging() {
        var method;

        if (typeof console !== 'undefined' && typeof console.log !== 'undefined' && (window.location.hostname === 'localhost' || (document.location.protocol === 'file:' && document.location.pathname.indexOf('e-mpire') === -1))) {
            method = console.error ? 'error' : 'log';

            // Redefine error logging function since it can't write to a log file anyway
            uiUtil.errorHandling.jsLog.addEntry = function (a, b) {
                console[method](a, b);
            };
        }
    }
};

uitMethods.setupErrorLogging();

// Temporary class (to test functionality)
// =====================================================================================
var uitTest = {
    // Methods:
    // --------

    // [TODO: Needed? If not remove it or move to Recycle/recycle.js: Manolo: Ask if this will ever go or not]
    ///<summary>Limits textarea objects to a specific amount of characters</summary>
    ///<param name="oTextarea" type="object">The sender object</param>
    ///<param name="iLimit" type="integer">The amount of characters allowed inside the object</param>
    ///<param name="bAlert" type="boolean">Display an alert if entered number of characters is exceeded</param>
    setTextLimit: function (oTextarea, iLimit, bAlert) {
        try {
            // Make sure sender object is passed
            if (typeof oTextarea == 'undefined') {
                return true;
            }

            // iLimit must exist, be numeric and => 0
            if (typeof iLimit == 'undefined') {
                return true;
            }

            if (isNaN(parseInt(iLimit, 10))) {
                return true;
            }

            if (iLimit < 0) {
                return true;
            }

            // If bAlert is not sent, set to false
            if (typeof bAlert === 'undefined') {
                bAlert = false;
            }

            if (oTextarea.value.length > iLimit) {
                if (bAlert) {
                    alert('You have entered the maximum number of characters allowed.\n\nMaximum characters allowed: ' + iLimit);
                }
                oTextarea.value = oTextarea.value.substring(0, iLimit);
            }
            return true;
        }
        catch (e) {
            console.log(e, 'uitTest.setTextLimit');
        }
    },

    // Check for hashtag and automatically scroll down to that group/header
    jumpToHash: function () {
        try {
            if (window.location.hash.length > 1) {
                var sLoc = window.location.hash.substr(1).replace(/\-/g, ' ').replace(/\_/g, ' ').toLowerCase();
                if (document.getElementById(sLoc)) { /* browser already scrolled down */
                    return true;
                }
                var aElems = uiUtil.query('h2, h4, label', document);
                //aElems.concat(uiMethods.getElementsByClassName(document,'div','float-left labelLong labelCenter labelShort labelTiny labelLeft'));
                var i = aElems.length;
                while (i--) {
                    if (aElems[i].innerHTML.toLowerCase().indexOf(sLoc) === 0) {
                        aElems[i].scrollIntoView();
                        return true;
                    }
                }
            }
        }
        catch (e) {
            console.log(e, 'uitTest.jumpToHash');
        }
    },

    logError: function (e, args) {
        var t = (new Date().getTime()) % 1000;
        console.log('Log ' + t + ': ', e);
        console.log('Log ' + t + ' arguments: ', args);
        if (uiUtil.browser.sName === 'Internet Explorer') {
            console.log(e);
            console.log(e.message);
            console.log(e.description);
            console.log(e.number);
            console.log(e.name);
            console.log(e.fileName);
            console.log(e.lineNumber);
            console.log(e.stack);
            console.log(uiUtil.errorHandling.jsLog.getStackTrace(e, args));
            console.log(args.callee.caller);
        }
    }
};


// Initializes
uitMain.init();
// [End]


var uitLegacy = {

    // Modal Overlay removed 3/20/12 by CP
    modalDiv: {
        bImagesPreloaded: false, // Flag to ensure images are only preloaded once per full-page load
        bBlock: false, // True means that any submission after the first one should be blocked

        ///<summary>Sets up modal divs</summary>
        pageSetup: function () {
            try {
                uitLegacy.modalDiv.events.pageSetup();
            }
            catch (e) {
                uiUtil.errorHandling.jsLog.addEntry(e, arguments);
            }
        },

        events: {
            pageSetup: function () {
                try {
                    // Local variables
                    var fSubmitTest = function (oElem) {
                            return oElem.type === 'submit';
                        },
                        aSubmit = uiUtil.query('input.hasOverlay', document, {
                            filter: fSubmitTest
                        }),
                        iSubmit = aSubmit.length;

                    // Adds event to open modal div to prevent duplicate submissions
                    // Loops through any submit-type button that match the criteria for displaying an overlay
                    while (iSubmit--) {
                        // Attaches onsubmit event to submit button's form
                        uiUtil.attachEvent(aSubmit[iSubmit].form, 'submit', uitLegacy.modalDiv.events.onSubmit);
                    }

                    // Preload images if any buttons were found
                    if (aSubmit.length && !uitLegacy.modalDiv.bImagesPreloaded) {
                        uiMethods.preloader.addAsset('<img src="' + uiGlobal.sIFLOWImagesPath + 'ajaxLoader.gif" alt="">');
                        uiMethods.preloader.addAsset('<img src="' + uiGlobal.sIFLOWImagesPath + 'modalBg.png" alt="">');
                        uitLegacy.modalDiv.bImagesPreloaded = true;
                    }
                }
                catch (e) {
                    uiUtil.errorHandling.jsLog.addEntry(e, arguments);
                }
            },

            ///<summary>Called when a form is submitted</summary>
            ///<param name="eEvt" type="DOM Event" required="true">The DOM Event</param>
            onSubmit: function (eEvt) {
                try {
                    if (uitLegacy.modalDiv.bBlock === false) {
                        // Set flag to block any further duplicate submissions
                        uitLegacy.modalDiv.bBlock = true;
                        uitLegacy.modalDiv.submitDisplay();
                    }
                    else {
                        // Cancel any other submissions after the first one was fired
                        uiUtil.stopEvent(eEvt);
                    }
                }
                catch (e) {
                    uiUtil.errorHandling.jsLog.addEntry(e, arguments);
                }
            }
        },

        ///<summary>Creates and displays modal window for submission buttons</summary>
        ///<remarks>Solution to prevent multiple submissions</remarks>
        submitDisplay: function () {
            try {
                var oDiv = document.createElement('div'),
                    aButtons = document.getElementsByTagName('input'),
                    iButtons = aButtons.length,
                    oElem = null;

                // Create overlay div
                oDiv.setAttribute('id', 'modalOverlay');
                oDiv.setAttribute('tabIndex', '1');
                oDiv.innerHTML = '<div class="msg"><p>We\'re processing your request...</p><p>Please wait!</p><p><img src="' + uiGlobal.sIFLOWImagesPath + 'ajaxLoader.gif" alt=""></p></div>';

                // Disable all page buttons to avoid resubmissions (submit and button types only based on UI patterns)
                while (iButtons--) {
                    oElem = aButtons[iButtons];

                    if (oElem.type === 'submit' || oElem.type === 'button') {
                        oElem.disabled = true;
                    }
                }

                // Add overlay div to page and set focus on it for accessibility purposes
                document.body.appendChild(oDiv);
                oDiv.style.display = 'block';
                oDiv.focus();
            }
            catch (e) {
                uiUtil.errorHandling.jsLog.addEntry(e, arguments);
            }
        }
    }
};

// Enable console.log()
try {
    // Browsers with no console, or when running on network drives or web servers
    if ((!/file\:\/\/\/(\w\:|users)/i.test(window.location.href) && window.location.hostname !== 'localhost') || !/function|object/i.test(typeof console)) {
        window.console = {
            log: function () {
                return; // Dummy function so calls to console.log() won't throw errors
            }
        };
    }
    else {
        // IE9
        if (typeof console.log === 'object' && Function.prototype.bind && console) {
            ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd']
                .forEach(function (method) {
                    console[method] = this.call(console[method], console);
                }, Function.prototype.bind);
        }
        // IE8
        else if (!Function.prototype.bind && typeof console !== 'undefined' && typeof console.log === 'object') {
            Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
        }
    }
}
catch (e) {}
