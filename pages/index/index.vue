<template>
	<view class="content">
		<button @click="toEditor">点击编辑</button>
		<view class="text-area" v-html="content">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: `<p style="text-align: left;"><span style="color: rgb(136, 136, 136); font-size: 14px;">表单组件&nbsp;/&nbsp;</span><span style="color: rgb(0, 0, 0); font-size: 14px;">editor</span></p><p style="line-height: 2;"><strong style="font-size: 18px;">editor</strong></p><p style="text-align: left;">基础库&nbsp;2.7.0&nbsp;开始支持，低版本需做<span style="color: rgb(90, 216, 166);">兼容处理</span>。</p><p><br></p><p>富文本编辑器，可以对图片、文字进行编辑。</p><p><br></p><p>编辑器导出内容支持带标签的&nbsp;html和纯文本的&nbsp;text，编辑器内部采用&nbsp;delta&nbsp;格式进行存储。</p><p><br></p><p>通过 setContents 接口设置内容时，解析插入的&nbsp;html&nbsp;可能会由于一些非法标签导致解析错误，建议开发者在小程序内使用时通过&nbsp;delta&nbsp;进行插入。</p><p><br></p><p>富文本组件内部引入了一些基本的样式使得内容可以正确的展示，开发时可以进行覆盖。需要注意的是，在其它组件或环境中使用富文本组件导出的html时，需要额外引入&nbsp;这段样式，并维护&lt;ql-container&gt;&lt;ql-editor&gt;&lt;/ql-editor&gt;&lt;/ql-container&gt;的结构。</p><p><br></p><p>图片控件仅初始化时设置有效。</p><p><br></p><p>相关&nbsp;api：&nbsp;<strong>EditorContext</strong></p><p><br></p><p>属性	类型	默认值	必填	说明	最低版本</p><p>read-only	boolean	false	否	设置编辑器为只读	2.7.0</p><p>placeholder	string&nbsp;否	提示信息	2.7.0</p><p>show-img-size	boolean	false	否	点击图片时显示图片大小控件	2.7.0</p><p>show-img-toolbar	boolean	false	否	点击图片时显示工具栏控件	2.7.0</p><p>show-img-resize	boolean	false	否	点击图片时显示修改尺寸控件	2.7.0</p><p>bindready	eventhandle&nbsp;否	编辑器初始化完成时触发	2.7.0</p><p>bindfocus	eventhandle&nbsp;否	编辑器聚焦时触发，event.detail&nbsp;=&nbsp;{html,&nbsp;text,&nbsp;delta}	2.7.0</p><p>bindblur	eventhandle&nbsp;否	编辑器失去焦点时触发，detail&nbsp;=&nbsp;{html,&nbsp;text,&nbsp;delta}	2.7.0</p><p>bindinput	eventhandle&nbsp;否	编辑器内容改变时触发，detail&nbsp;=&nbsp;{html,&nbsp;text,&nbsp;delta}	2.7.0</p><p>bindstatuschange	eventhandle&nbsp;否	通过&nbsp;Context&nbsp;方法改变编辑器内样式时触发，返回选区已设置的样式	2.7.0</p><p>编辑器内支持部分&nbsp;HTML&nbsp;标签和内联样式，不支持class和id</p><p><br></p><p>支持的标签</p><p>不满足的标签会被忽略，&lt;div&gt;会被转行为&lt;p&gt;储存。</p><p><br></p><p>类型	节点</p><p>行内元素	&lt;span&gt;&nbsp;&lt;strong&gt;&nbsp;&lt;b&gt;&nbsp;&lt;ins&gt;&nbsp;&lt;em&gt;&nbsp;&lt;i&gt;&nbsp;&lt;u&gt;&nbsp;&lt;a&gt;&nbsp;&lt;del&gt;&nbsp;&lt;s&gt;&nbsp;&lt;sub&gt;&nbsp;&lt;sup&gt;&nbsp;&lt;img&gt;</p><p>块级元素	&lt;p&gt;&nbsp;&lt;h1&gt;&nbsp;&lt;h2&gt;&nbsp;&lt;h3&gt;&nbsp;&lt;h4&gt;&nbsp;&lt;h5&gt;&nbsp;&lt;h6&gt;&nbsp;&lt;hr&gt;&nbsp;&lt;ol&gt;&nbsp;&lt;ul&gt;&nbsp;&lt;li&gt;</p><p>支持的内联样式</p><p>内联样式仅能设置在行内元素或块级元素上，不能同时设置。例如&nbsp;font-size&nbsp;归类为行内元素属性，在&nbsp;p&nbsp;标签上设置是无效的。</p><p><br></p><p>类型	样式</p><p>块级样式	text-align&nbsp;direction&nbsp;margin&nbsp;margin-top&nbsp;margin-left&nbsp;margin-right&nbsp;margin-bottom</p><p>padding&nbsp;padding-top&nbsp;padding-left&nbsp;padding-right&nbsp;padding-bottom&nbsp;line-height&nbsp;text-indent</p><p>行内样式	font&nbsp;font-size&nbsp;font-style&nbsp;font-variant&nbsp;font-weight&nbsp;font-family</p><p>letter-spacing&nbsp;text-decoration&nbsp;color&nbsp;background-color</p><p>Bug&nbsp;&amp;&nbsp;Tip</p><p>tip:&nbsp;使用&nbsp;catchtouchend&nbsp;绑定事件则不会使编辑器失去焦点(2.8.3)</p><p>tip:&nbsp;插入的&nbsp;html&nbsp;中事件绑定会被移除</p><p>tip:&nbsp;formats&nbsp;中的&nbsp;color&nbsp;属性会统一以&nbsp;hex&nbsp;格式返回</p><p>tip:&nbsp;粘贴时仅纯文本内容会被拷贝进编辑器</p><p>tip:&nbsp;插入&nbsp;html&nbsp;到编辑器内时，编辑器会删除一些不必要的标签，以保证内容的统一。例如&lt;p&gt;&lt;span&gt;xxx&lt;/span&gt;&lt;/p&gt;会改写为&lt;p&gt;xxx&lt;/p&gt;</p><p>tip:&nbsp;编辑器聚焦时页面会被上推，系统行为以保证编辑区可见</p><p>示例代码</p><p style="text-align: left;">在开发者工具中预览效果</p>`
							}
		},
		onUnload() {
			uni.$off('save') //在此生命周期里销毁保存事件的监听
		},
		methods: {
			toEditor() {
				uni.navigateTo({
					url: '/pages/editor/index?item=' + encodeURIComponent(JSON.stringify({
						content: this.content
					}))
				})
				uni.$on('save', res => { //开启监听保存事件
					console.log(res)
					this.content = res.html
				})
			}

		}
	}
</script>

<style>
	.content {}
</style>
