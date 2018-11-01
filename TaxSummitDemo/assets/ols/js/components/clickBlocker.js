/*! Feta
 *  @description  Framework for External Applications, RT Cluster
 *  @version      0.3.6.REL20180925
 *  @copyright    2018 New York State Office of Information Technology Services
 */

define(['jquery'], function ($) {
    // const NAMESPACE = 'clickBlocker';
    // const VERSION = '1.0.0';

    const SUFFIX = "blocker";
    const CLASS_NAMES = {
        blocker: "feta-click-blocker",
        wrapper: "feta-click-blocker-wrapper",
    };

    ////////////////////
    // Public methods //
    ////////////////////

    const addClickBlocker = ($container) => {
        //if the wrapper is present, there is already a blocker active.
        if($container.hasClass(CLASS_NAMES.wrapper)){
            return;
        }

        $container.addClass(CLASS_NAMES.wrapper);

        //TODO: if click blocker is being applied to a 'large' element, add a larger spinner and loading please wait message. Doing this can shift css selector of form.click-blocker-wrapper to just adding the class to teh click blocker itself for sizes/styles. Other options can then be added as needed, size + message etc.

        const $blocker = $('<div/>', {
                            'id': $container[0].id +"_"+ SUFFIX,
                            'class': CLASS_NAMES.blocker,
                            // 'html': '<p>Loading, Please Wait.</p>' //Message for large spinner.
                        });
        $container.append($blocker);
    };

    const removeClickBlocker = ($container) => {
        $container.find('.'+CLASS_NAMES.blocker).remove();
        $container.removeClass(CLASS_NAMES.wrapper);
    };

    //////////////////////////////////////////
    // Expose public properties and methods //
    //////////////////////////////////////////

    return {
        addClickBlocker,
        removeClickBlocker,
    };
});
