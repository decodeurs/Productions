/**
 * Create a "database" from a Google SpreadSheet
 * @class Gselper (Google Spreadsheet Helper) reprensent a SpreadSheet as a database
 * @param Object p_option
 * 
 * 
 * @important Don't forget to make your spreadsheet PUBLIC
 *      Dependances : 
 *          - jQuery 1.4+
 *           
 * @author <a href="mailto:pierre.romera@gmail.com">Pierre Romera</a>
 * @version 1.0.0
 */
function Gselper(/** Object */ p_option) {
    
    var that   = this, 
        // options
        option = {
            autoLoad   : true, // load the document automaticly
            key        : "",   // document key
            worksheet  : "",   // document worksheet (od5, od6, etc)
            onComplete : null  // function to call after the document loading (and parsing)
        },
        // document loaded
        gDoc = {},
        // data extracted from the document
        data = [];
    
    
    /**
     * @function contructor
     * @public
     * 
     * @return Object
     */
    this.init = function() {

        // record options
    	for (var i in p_option) {
                // if the option exit
                if( option.hasOwnProperty(i) ) {
                    // we record it
                    option[i] = p_option[i];
                }
        }
	
        if(!!option.autoLoad) that.load( option.onComplete );
        
        return that;
    }
    
        
    /**
     * @function Return true if the document is loaded (else return false)
     * @public
     * @return Boolean 
     */
    this.isLoaded = function () {
        return !! data.length > 0;
    }
    
    
    /**
     * @function load the document and store data
     * @public     
     * 
     * @param Function p_callback
     * @return Object
     */
    this.load = function(p_callback) {
        
        // key required
        if(option.key == "" || typeof option.key != "string") return false;
        // worksheet required too
        if(option.worksheet == "" || typeof option.worksheet != "string") return false;
        
        var docUrl = "http://spreadsheets.google.com/feeds/list/"+option.key+"/"+option.worksheet+"/public/values?alt=json&callback=?";        
        $.getJSON(docUrl, function(p_document) {
        
            // store the document
            gDoc = p_document;
            
            // parse the document (to extract data)
            if( !! that.parse() )
                // callback function
                if(typeof p_callback == "function") p_callback.call(that);
        });
        
        return that;
    }
    
    /**
     * @function parse document to organise it
     * @public     
     * @return Object
     */
    this.parse = function() {
        
        if(typeof gDoc            != "object" 
        || typeof gDoc.feed       != "object" 
        || typeof gDoc.feed.entry != "object"         
        || gDoc.feed.entry.length == 0) return false;
        
        
        
        // empty the data table
        data = [];
        
        // forn each entry
        $.each(gDoc.feed.entry, function(i, entry) {
                        
            var row = {}
            
            // for each property of the current entry
            $.each(entry, function(propName, prop) {
                
                // if the property is a cell
                if( /^(gsx\$)(.+)/.test(propName) )
                    
                    // extract the name and the value
                    row[ /^(gsx\$)(.+)/.exec(propName)[2] ] = prop["$t"];                    
            });
    
            // record the row
            data.push(row);
            
        });                
        
        return that;
    }    
    
    /**
     * @function Return a line from the data set or the data set itself
     * @public     
     * @param Integer index optional
     * @return Array or Object or Boolean
     */
    this.get = function(index) {        
        
        // there are no index specified, we get all of the data
        if(typeof index == "undefined")
            // if data set is loaded
            return that.isLoaded() ? data : false;                    
        
        // there are an index specified, we get just the right line
        else if(typeof index == "number" && index < data.length)
            // if data set is loaded
            return that.isLoaded() ? data[index] : false;            
        
        else false;
    }

    this.init();
    
}