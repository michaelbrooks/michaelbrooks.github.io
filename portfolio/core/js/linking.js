jQuery(document).ready(function($) {
    
    /**
     * Gets the Portfolio-prefixed class for the given name.
     */
    function psClass(className) {
        return class_prefix + className;
    }
    
    /**
     * Extracts the list of tag classes from the complete class list.
     */
    function getTagClasses(classList) {
        var tagList = new Array();
        var prefix = psClass('tag-');
        for (var i = 0; i < classList.length; i++) {
            if (classList[i].indexOf(prefix) == 0) {
                tagList.push(classList[i]);
            }
        }
        return tagList;
    }
    
    /**
     * Sets the highlight status for the given list of tags
     */
    function setTagsHighlight(tagClasses, highlight) {
        var allTags = $('.' + psClass('tags-label'));
        for (var i = 0; i < tagClasses.length; i++) {
            var tagLabel = allTags.filter('.' + tagClasses[i]);
            setHighlight(tagLabel, highlight);
        }
    }
    
    function setItemsHighlightWith(tagClass, highlight) {
        var itemsWithTag = $('.' + psClass('item')).filter("." + tagClass);
        for (var i = 0; i < itemsWithTag.length; i++) {
            setHighlight(itemsWithTag[i], highlight);
        }
    }
    
    function setHighlight(element, highlight) {
        if (highlight) {
            $(element).addClass(psClass('highlight'));
        }
        else {
            $(element).removeClass(psClass('highlight'));
        }
    }
    
    
    $('.' + psClass('linking')).hover(function(event) {
        var classes = $(this).attr('class').split(/\s+/);
        var tags = getTagClasses(classes);
        if (classes.indexOf(psClass('item')) >= 0) {
            //It is an item
            setTagsHighlight(tags, true);
            setHighlight(this, true);
        }
        else {
            //It must be a tag
            setTagsHighlight(tags, true);
            setItemsHighlightWith(tags[0], true);
        }
    }, function(event) {
        var classes = $(this).attr('class').split(/\s+/);
        var tags = getTagClasses(classes);
        if (classes.indexOf(psClass('item')) >= 0) {
            //It is an item
            setTagsHighlight(tags, false);
            setHighlight(this, false);
        }
        else {
            //It must be a tag
            setTagsHighlight(tags, false);            
            setItemsHighlightWith(tags[0], false);
        }
    });
    
});
    