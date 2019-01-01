/**
*	MeowCat Storage Download Redirecter
*	@projectName: Storage-Server
*	@author: MlgmXyysd
*	@version: 1.0.0
*	@license: GNU General Public License v3.0
*	@date: 2018/12/20 18:46
*	@fileName: main.js
*	Copyright &copy; 2013-2019 MeowCat Studio Powered by MlgmXyysd All Rights Reserved.
*/
"use strict";
/**
*	GetQueryString
*	Get URL query.
*	@param [String]name Query name you want to get.
*	@return String
*/
var GetQueryString=function(name) {
	let reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
	let r=window.location.search.substr(1).match(reg);
	if (r!=null) {
		return unescape(r[2]);
	}
	return null;
}
var fullLink=link+query+queryName+"="+defaultPath;
var path=GetQueryString(pageQuery);
if (path!=null) {
	location.href=fullLink+path;
} else {
	location.href=fullLink;
}