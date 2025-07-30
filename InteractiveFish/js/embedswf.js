function embedSWF(swfURL, divID, args){
        
        var flashVars = "";
        var bgcolor = "FFFFFF";
        var h = 200;
        var w = 350;
        var flashID = "flashID";
        var version = "9";
        var wmode = "opaque";
        
        if(args.flashVars != undefined)
            flashVars = args.flashVars;
            
        if(args.bgcolor != undefined)
            bgcolor = args.bgcolor;
        
        if(args.h != undefined)
            h = args.h;
        
        if(args.w != undefined){
            w = args.w;
        }

        if(args.wmode != undefined){
            wmode = args.wmode;
        }
        
        if(args.flashID != undefined)
            flashID = args.flashID;
            
        if(args.version != undefined)
            version = args.version;
        
        var up_backgroundColor = getPref("up_backgroundColor", flashVars);
        
        if(up_backgroundColor != "")
            bgcolor = up_backgroundColor;
        
        var so = new SWFObject(swfURL, flashID, w, h, version, "#"+ bgcolor);
        
        //addLink.href = addURL+flashVars;
        
        if(flashVars == "")
            flashVars = "up_backgroundColor="+bgcolor;
        
        //embedTxt.value = embedCode + ' bgcolor="'+ bgcolor +'" flashvars="'+ flashVars +'" />';
        if(args.scale != undefined)
            so.addParam("scale", args.scale);
        
        if(args.salign != undefined)
            so.addParam("salign", args.salign);
            
        so.addParam("flashvars", flashVars);

        if(wmode != "")
            so.addParam("wmode", "opaque");
        
        so.write(divID);
    }
    
	
    function getPref(pref,flashVars){
        var prefs = flashVars;
        var s1 = prefs.indexOf(pref);
        var val = "";
        
        if(s1 != -1){
            s1 += pref.length+1;
            val = prefs.substring(s1,prefs.length);
            val = val.substring(0,val.indexOf("&"));
        }
        
        return val;    
    }