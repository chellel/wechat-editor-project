/**
  * 处理html中的图片地址和宽度
  * resetClass:  是否将class="editor-- 更改为class="
  * EditorContext.setContents时img标签的class会自带一个前缀editor--，如原class="editor-img"，EditorContext.setContents后class="editor--editor-img" */
export const handleHtmlImage = (html = '', resetClass) => {
	var newHtml = html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/ig, function(match, src) {
		let result = match
		//返回每个匹配的字符串
		if(resetClass) result = result.replace(/class=\"(.*)editor--/gi,'class="');
		result = result.replace(/\<img/gi, '<img style="max-width:100%;height:auto"');
		return result;
	});
	return newHtml;
}