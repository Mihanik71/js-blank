"use strict";

/**
 * document find document by id in parent
 * @param id
 * @param parent
 * @returns {HTMLElement}
 */
function $id(id, parent){
	if(!parent) parent = document;
	return parent.getElementById(id);
}
/**
 * Find by class
 * @param block
 * @returns {NodeList}
 */
function $byClass(block, parent){
	if(!parent) parent = document;
	return parent.getElementsByClassName(block);
}
/**
 * Remove element
 * @param block
 */
function remove(block){
	block.parentNode.removeChild(block);
}
/**
 * return boolean is mobile
 * @type {{Android: Function, BlackBerry: Function, iOS: Function, Opera: Function, Windows: Function, any: Function}}
 */
var isMobile = {
	Android: function(){
		return navigator.userAgent.match(/Android/i);
	}, BlackBerry: function(){
		return navigator.userAgent.match(/BlackBerry/i);
	}, iOS: function(){
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	}, Opera: function(){
		return navigator.userAgent.match(/Opera Mini/i);
	}, Windows: function(){
		return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
	}, any: function(){
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};
/**
 * ajax class
 */
var ajaxClass = (function(par){
	function createRequest(){
		var req = {};
		if(window.XMLHttpRequest) req = new XMLHttpRequest();
		else
			if(window.ActiveXObject){
				try{
					req = new ActiveXObject('Msxml2.XMLHTTP');
				}catch(e){}
				try{
					req = new ActiveXObject('Microsoft.XMLHTTP');
				}catch(e){}
			}
		return req;
	}
	var req = createRequest();
	if(req){
		req.open("GET", par.url+"&"+par.data, true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send(null);
		req.onreadystatechange = function(){
			if(req.readyState != 4) return;
			if(req.status == 200)
				par.success(req.responseText, par.url);
			else
				par.error(req);
		}
	}
	return req;
});
/**
 * get "GET" parameters in str
 * @param str
 * @returns {{}}
 */
function getParams(str){
	var src = str.split("?");
	var args = src[src.length-1];
	args = args.split("&");
	var parameters = {};
	for(var i = args.length-1; i >= 0; i--){
		var parameter = args[i].split("=");
		parameters[parameter[0]] = parameter[1];
	}
	return parameters;
}
/**
 * return true is id parent el
 * @param el
 * @param id
 * @param lim_count_parent
 * @returns {boolean}
 */
function isParent(el, id, lim_count_parent){
	if(!lim_count_parent)
		lim_count_parent = 10;
	if(el.id){
		if(el.id == id)
			return true;
	}
	var bool = false;
	var parent = el.parentNode;
	var count = 0;
	while(parent != null){
		if(parent.id){
			if(parent.id == id){
				bool = true;
				break;
			}
		}
		parent = parent.parentNode;
		count++;
		if(count > lim_count_parent)
			break;
	}
	return bool;
}