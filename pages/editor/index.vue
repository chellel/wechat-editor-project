<template>
	<view>
    <cu-editor ref="editor" :url="uploadUrl" :formData="fileData" :content="content" @before="uploadBeforeUpload" @update="onUpdate" @save="onSave"></cu-editor>
	</view>
</template>

<script>
  import cuEditor from '@/components/cu-editor/cu-editor'
	import { handleHtmlImage } from '@/components/cu-editor/util'
  
	export default {
    components: {
      cuEditor
    },
		data() {
			return {
				content: '',
				uploadUrl: '',
				fileData: {}
			}
		},
		onLoad(options) {
			if(options.item){
				const item = JSON.parse(decodeURIComponent(options.item));
				item.content ? this.content = item.content : ''
			}
		},
		methods: {
			uploadBeforeUpload: function() {
				this.fileData = {
					timestamp: (Date.parse(new Date())) / 1000
				}
			},
			onUpdate(res) {
				res.html = handleHtmlImage(res.html)
				this.value = res.html
			},
			//保存
			onSave(e) {
				let html = e.html
				var containsImage = html.search(/<img /i) >= 0 //内容是否包含图片标签
				let txt = e.text.replace(/(^\s*)|[\r\n]|(\s*$)/g, "") //去掉换行符和两端空格
				
				uni.$emit('save', {
					html: txt == "" && !containsImage ? txt : html
				})
			}
		}
	}
</script>

<style>

</style>
