"use strict";
App
    .factory("Common", function ($rootScope, $mdToast, $location, $state,$http, Config, $timeout) {
        var Common = {
            goTo : function (url, data){
	            if (!data){
                    data = {};
	            }
                $state.transitionTo(url, data, {reload: true});
            },
	        isEmpty : function (value){
		        if (value===null){
			        return true;
		        }
		        if (value===undefined){
			        return true;
		        }
		        if (value===""){
			        return true;
		        }
		        return false;
	        },
	        isError : function (obj){
		        if (!this.isEmpty(obj)){
		            if (!this.isEmpty(obj.error)) {
			            return true;
		            }
		        }
		        return false;
	        },
            showMessage: function(text, type) {
	            var objStyle = {};

	            if (type=="freeze"){

		            $mdToast.show({
			            template: "<md-toast style='background-color:#4CAF50;color:#FFFFFF' class='s-110 bold'><span flex>"+text+"</span>  <md-button ng-click='_fn.closeToast()'>OK</md-button></md-toast>",
			            hideDelay: 8000,
			            position:"top right",
			            action:"OK",
			            highlightAction:false
		            });

	            }else{
		            if (type=="error"){
			            objStyle = {
				            bg:"#F44336",
				            color:"#FFFFFF"
			            };
		            }else if (type=="warning"){
			            objStyle = {
				            bg:"#FFEB3B",
				            color:"#000000"
			            };
		            }else{
			            objStyle = {
				            bg:"#4CAF50",
				            color:"#FFFFFF"
			            };
		            }

		            $mdToast.show({
			            template: "<md-toast style='background-color:"+objStyle.bg+";color:"+objStyle.color+"' class='s-110 bold'>"+text+"</md-toast>",
			            hideDelay: 3000,
			            position:"bottom right"
		            });
	            }


            },
            loading: function(bln){
	            	if (bln){
            			$("#container").fadeOut("slow");
	                	$("#loading").fadeIn("slow");
            		}else{
	                	$("#loading").fadeOut("slow");
	                	$("#container").fadeIn("slow");
        			}

	        },
	        getDirectiveTemplateUrl: function(str) {
				return "app/shared/directives/" + str + "View.html";
			}

        };
        return Common;
    });