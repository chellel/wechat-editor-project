/**
  * 处理html中的图片地址和宽度
  * resetClass:  是否将class="editor-- 更改为class="
  * EditorContext.setContents时img标签的class会自带一个前缀editor--，如原class="editor-img"，EditorContext.setContents后class="editor--editor-img" */
export const handleHtmlImage = (html = '', url = '',resetClass) => {
	var newHtml = html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/ig, function(match, src) {
		//返回每个匹配的字符串
		var urlIdx = match.indexOf('src') + 5;
		var fileIdx = match.indexOf('/uploads') != -1 ? match.indexOf('/uploads') : match.indexOf('/_uploads');
		
		var result = match;
		if (fileIdx != -1)
			result = match.substring(0, urlIdx) + url + match.substring(fileIdx, match.length);
		if(resetClass) result = result.replace(/class=\"(.*)editor--/gi,'class="');
		result = result.replace(/\<img/gi, '<img style="max-width:100%;height:auto"');
		return result;
	});
	return newHtml;
}

export default {
	handleHtmlImage
}