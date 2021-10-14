#### 自定义富文本编辑器
照着腾讯文档小程序开发了微信小程序富文本编辑器组件，这几天做个整理，如有这个需求可以前往腾讯文档小程序操作看看实际效果。毕竟参照的是微信自家小程序，无法做到百分百效果，只能按现有开放api尽可能实现。  

项目地址：https://github.com/chellel/wechat-editor-project  
效果  

![富文本编辑器.jpg](https://upload-images.jianshu.io/upload_images/18829662-5793fe6fcb61c4ec.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![微信小程序富文本编辑器1.png](https://upload-images.jianshu.io/upload_images/18829662-a7dcdf2401b10126.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/375)

![微信小程序富文本编辑器2.png](https://upload-images.jianshu.io/upload_images/18829662-5a032afc456fc103.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/375)


![微信小程序富文本编辑器3.png](https://upload-images.jianshu.io/upload_images/18829662-3da640fe7e44ef94.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/375)


**editor富文本编辑器组件官方文档**
https://developers.weixin.qq.com/miniprogram/dev/component/editor.html


#### 关于editor开发注意事项：
##### 1、包装成组件时，bindready编辑器初始化完成时触发，通过选择器选择时，需要将选择器的选择范围更改为当前component中。
```
wx.createSelectorQuery().select('#editor').context(function (res) {
that.editorCtx = res.context
}).exec()
```

```
wx.createSelectorQuery().in(this).select('#editor').context(function (res) {
that.editorCtx = res.context
}).exec()
```

##### 2、页面调用组件时，组件不能与editor同名，即定义一个新的组件名，正确引用：
  ```
import cuEditor from '@/components/cu-editor/cu-editor'

<cu-editor></cu-editor>
  ```

否则会受到小程序css影响。小程序本身editor标签有css样式：
editor {
    display: block;
    position: relative;
    box-sizing: border-box;
    -webkit-user-select: text;
    user-select: text;
    outline: 0;
    overflow: hidden;
    width: 100%;
    height: 200px;
    min-height: 200px;
}

##### 3、监听键盘调起时，注释wx.pageScrollTo 直接执行
that.updatePosition(keyboardHeight)
that.editorCtx.scrollIntoView()

```
uni.onKeyboardHeightChange(res => {
        let keyboardHeight = that.keyboardHeight;
        if (res.height === keyboardHeight) return;

        this.keyboardHeight = res.height;
        const duration = res.height > 0 ? res.duration * 1000 : 0;
        keyboardHeight = res.height;
        setTimeout(() => {
          uni.pageScrollTo({
            scrollTop: 0,
            success() {
              that.updatePosition(keyboardHeight);
              that.editorCtx.scrollIntoView(); //使得编辑器光标处滚动到窗口可视区域内
            }
          });
        }, duration);
      });
```

##### 4、setContents设置编辑器内容时，会自动聚集到编辑器中，并滚动到窗口可视区域内，需执行完后调用pageScrollTo滚动回顶部，哦避免闪屏，使用setTimeout延迟执行
```
setValue(value) {
this.editorCtx.setContents({
html: value,
success: () => {
this.getValue(res => {
this.onEditorInput({ detail: { html: res.html, text: res.text } });
//setContents设置编辑器内容时，会自动聚集到编辑器中，并滚动到窗口可视区域内，需执行完后调用pageScrollTo滚动回顶部，为避免闪屏，使用setTimeout延迟执行
setTimeout(() => {
uni.pageScrollTo({
scrollTop: 0,
})},100)
})
}
})
},


```
##### 其他富文本相关方法，详见官方文档：https://developers.weixin.qq.com/miniprogram/dev/api/media/editor/EditorContext.format.html

##### 修改样式 EditorContext.format

```
this.editorCtx.format('fontSize', '14px');
```

##### 插入文本  EditorContext.insertText

在插入目标文字时，将值设为\n'，可以实现换行
this.editorCtx.insertText({ text: '\n' });


##### 插入图片  EditorContext.insertImage

```

that.editorCtx.insertImage({
                        src: that.uploadHost + json.data.path,
                        data: {
                            id: file.uid
                        },
                        // extClass:'editor-img',
                        extClass:'editor--editor-img', //添加到图片 img标签上的类名为editor-img，设置前缀editor--才生效。部分机型点击图片右边的光标时不灵敏，需在editor-img将图片宽度调小 max-width:98%;
                        // width: '100%',
                        success() {
                            //真机会自动插入一行空格
                            //   that.editorCtx.insertText({ text: '\n' });  //自动插入一个空行，方便用户移动光标
                        }
                    })

...

    .editor-img{
        max-width: 98%!important;
    }



//保存时需处理掉editor--的class前缀

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
```








#### 设置 editor placeholder 样式

  ```
  .ql-editor.ql-blank:before {
       color: #B2B2B2;
       font-style: normal;
    }
  ```



#### 目前仍存在的问题：
##### bug1、editor调用uni.hideKeyboard()隐藏软键盘的api，不能关闭软键盘，，隐藏键盘只能用EditorContext.blur，这样会导致一个问题，见bug2。同时也不支持拉起键盘操作。
**参考：请问editor组件控制拉起键盘操作支持吗？**
https://developers.weixin.qq.com/community/develop/doc/0006eeb6ae8cf0e7f3293e13f56400?highLine=editor%25E6%2598%25BE%25E7%25A4%25BA%25E9%2594%25AE%25E7%259B%2598

**小程序技术专员-sanford2019-09-20**

不支持的。iOS无法通过接口拉起键盘，必须用户点击；安卓则可以。所以，终究是不一致，不行。。

##### bug2、由于隐藏键盘只能用EditorContext.blur，即调用了失焦api。在设置格式面板时，会失去当前焦点光标以及高亮显示状态。

#### 开发富文本编辑器可参考其他文档：
小程序富文本编辑器editor初体验：(https://www.jianshu.com/p/a932639ba7a6)
如果是微信原生开发，将demo组件中的相关dom元素标签和api换成微信原生即可。



