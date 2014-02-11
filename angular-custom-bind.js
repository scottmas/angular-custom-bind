angular.module("customBind", []).factory('customBind', ['$rootScope',

    function($rootScope) {

        return {
            set: function bindFn(delim1, delim2, trigger){
                delim1 = delim1.replace(/(\}|\/|\]|\[|\$|\\(?!\\))/g,"\\$1"); //add slashes to regex special chars
                delim2 = delim2.replace(/(\}|\/|\]|\[|\$|\\(?!\\))/g,"\\$1"); //add slashes to regex special chars
                //We don't want the same delimiters and trigger being set multiple times
                var memoize = JSON.stringify(arguments);
                if(bindFn[memoize])
                    return;
                else
                    bindFn[memoize] = true;

                //On event, go through DOM and compile all delimited text attributes
                $rootScope.$on(trigger, function(){

                    var startTime = (new Date()).getTime();
                    walkDOM(angular.element('[ng-app]')[0], function(node){
                        var scope;
                        var patt = new RegExp(delim1 + "(.*?)" + delim2, "g");

                        //Look for bindings in text nodes
                        if(node.wholeText && node.wholeText.trim().length > 0){
                            scope = angular.element(node).scope();
                            var changed = false;
                            node.textContent = node.textContent.replace(patt, function(outer, inner, index){
                                var a = node.textContent;
                                var replaceValue = scope.$eval(inner);
                                replaceValue = replaceValue ? replaceValue : "";
                                changed = true;
                                return replaceValue;
                            })
                        }

                        //And in dom attributes (strings only)
                        if(node.attributes && node.attributes.length != 0){
                            scope = angular.element(node).scope();

                            for(var i = 0; i < node.attributes.length; i++){
                                var thisAttr = node.attributes[i].nodeValue;

                                if(thisAttr && thisAttr.length > 0 && thisAttr.indexOf("[[") != -1){ //This is a much quicker check than the replace check
                                    node.attributes[i].nodeValue = thisAttr.replace(patt, function(outer, inner, index){
                                        var replaceValue = scope.$eval(inner);
                                        replaceValue = replaceValue ? replaceValue : "";
                                        return replaceValue;
                                    })
                                }
                            }
                        }

                    })

                    var endTime = (new Date()).getTime();

                    console.debug(endTime - startTime)
                });
            }
        };

        //Todo A DOM Tree walker might be faster than this.
        function walkDOM(node,func) {
            func(node);
            node = node.firstChild;
            while(node) {
                walkDOM(node,func);
                node = node.nextSibling;
            }

        };



    }])