<template>
	<view class="editor-container">
		<view id="fixed-top" class="fixed-top" :class="{ 'isFixed': isFixed }">
			<button class="btn btn-primary" @click="save">保存</button>
		</view>
		<view class="fixed-top__place"></view>
		<scroll-view scroll-y :style="{ height: scrollViewHeight + 'px' }">
			<editor id="editor" class="cu-editor" :placeholder="placeholder" :read-only="readOnly"
				:show-img-size="showImgSize" :show-img-toolbar="showImgToolbar" :show-img-resize="showImgResize"
				@statuschange="onStatusChange" @ready="onEditorReady" @input="onEditorInput" @focus="onEditorFocus"
				@blur="onEditorBlur"></editor>
		</scroll-view>
		<view class="fixed-bottom" :hidden="!toolbarShow" :style="{ bottom: fixedBottom + 'px' }" @touchstart.stop="">
			<view class="toolbar selector" :style="{height: toolBarHeight + 'rpx'}">
				<view class="toolbar-item-header" @touchend.stop="changeKeyBoard"><i class="iconfont icon-keyboard"></i>
				</view>
				<view v-for="(icon, index) in ['icon-add', 'icon-textformat', 'icon-align-left']" class="toolbar-item"
					@touchend.stop="changeSwiper(index)">
					<i class="iconfont" :class="[icon, { active: toolBarContentShow && swiperCurrent == index }]"></i>
				</view>

				<view class="toolbar-item" @touchend.stop="formatformat('check')"><i
						class="iconfont icon-list-check"></i></view>
				<view class="toolbar-item" @touchend.stop="formatformat('undo')"><i class="iconfont icon-undo"></i>
				</view>
				<view class="toolbar-item" @touchend.stop="formatformat('redo')"><i class="iconfont icon-redo"></i>
				</view>
				<view class="toolbar-item-footer" @touchend.stop="hideToolbar"><i class="iconfont icon-check"></i>
				</view>
			</view>
			<swiper :hidden="!toolBarContentShow" class="toolbar-content swiper-box"
				:style="{height: toolBarContentHeight + 'rpx'}" :current="swiperCurrent" duration="300">
				<!-- @touchstart.stop="" 禁用手动滑动 -->
				<swiper-item v-for="(page, i) in formatArray" :key="i" class="swiper-item" @touchstart.stop="">
					<template v-if="page.type === 'feature'">
						<view class="feature-items flex">
							<view v-for="(pitem, pindex) in page.array" :key="pindex" class="feature"
								@touchend.stop="formatformat(pitem.name)">
								<view class="icon"><text class="iconfont" :class="'icon-' + pitem.icon"></text></view>
							</view>
						</view>
					</template>

					<template v-else-if="page.type === 'tool'">
						<view v-for="(pitem, pindex) in page.array" :key="pindex" class="tool-items flex">
							<view v-for="(item, index) in pitem.items" :key="index" class="tool-item"
								@touchend.stop="formatformat('format', item, pitem)"
								:class="{ 'ql-active': isActive(item, pitem), noBgColor: pitem.name == 'color' }">
								<view v-if="pitem.name == 'color'" class="color-circle"
									:style="{ 'background-color': item.value }"></view>
								<i v-else-if="pitem.label == 'icon'" class="iconfont" :class="'icon-' + item.icon"></i>
								<text v-else class="txt"
									:style="[{fontSize : pitem.name == 'fontSize' ? item.value : ''}, item.style]">{{ item.title || item.value }}</text>
							</view>
						</view>
					</template>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		handleHtmlImage
	} from './util'

	export default {
		name: 'cuEditor',
		props: {
			//editor属性，提示信息
			placeholder: {
				type: String,
				default: '请输入内容'
			},
			//editor属性，点击图片时显示图片大小控件
			showImgSize: {
				type: Boolean,
				default: false
			},
			//editor属性，点击图片时显示工具栏控件
			showImgToolbar: {
				type: Boolean,
				default: false
			},
			//editor属性，点击图片时显示修改尺寸控件
			showImgResize: {
				type: Boolean,
				default: false
			},
			//编辑器内容，必填
			content: {
				type: String,
				default: ''
			},
			//chooseImage参数，最大文件大小，上传文件前校验是否符合规则，单位MB
			maxSize: {
				type: Number,
				default: 5
			},
			//chooseImage参数，最多可以选择的图片张数
			count: {
				type: Number,
				default: 5
			},
			//chooseImage参数，所选的图片的尺寸
			sizeType: {
				type: Array,
				default() {
					return ['original', 'compressed'] //['original', 'compressed']
				}
			},
			//chooseImage参数，选择图片的来源
			sourceType: {
				type: Array,
				default() {
					return ['album', 'camera']
				}
			},
			//不允许上传的图片类型
			noAllowType: {
				type: Array,
				default() {
					return [] //['gif']
				}
			},
			//uploadFile参数，必填
			url: {
				type: String,
				default: ''
			},
			//uploadFile参数
			header: {
				type: Object,
				default() {
					return {}
				}
			},
			//uploadFile参数
			formData: {
				type: Object,
				default () {
					return {}
				}
			},
			//uploadFile参数
			name: {
				type: String,
				default: 'file'
			}
		},
		data() {
			return {
				isFixed: true,
				iphoneXBottomH: 0,
				scrollHeightDefault: 0,
				keyboardHeight: 0,
				readOnly: true,
				isDefaultFormat: true, // 首次聚集时设置默认格式
				isIos: false,
				inputFocus: false,
				formats: {},
				formatArray: [{
						type: 'feature',
						array: [{
								name: 'chooseImage',
								icon: 'image'
							},
							{
								name: 'chooseImagebyCamera',
								icon: 'photo'
							},
							{
								name: 'insertDivider',
								icon: 'line'
							}
						]
					},
					{
						type: 'tool',
						array: [{
								name: 'text',
								label: 'icon',
								items: [{
										name: 'bold',
										icon: 'bold'
									},
									{
										name: 'italic',
										icon: 'italic'
									},
									{
										name: 'underline',
										icon: 'underline'
									},
									{
										name: 'strike',
										icon: 'strikethrough'
									},
									{
										name: 'backgroundColor',
										value: 'yellow',
										icon: 'fontbgcolor'
									}
								]
							},
							{
								name: 'defaultFormat',
								items: [{
										title: '标题',
										format: {
											fontSize: '18px',
											bold: 'strong'
										},
										style: {
											fontSize: '18px',
											fontWeight: 'bold'
										}
									},
									{
										title: '小标题',
										format: {
											fontSize: '16px',
											bold: 'strong'
										},
										style: {
											fontSize: '16px',
											fontWeight: 'bold'
										}
									},
									{
										title: '正文',
										format: {
											fontSize: '14px'
										},
										style: {
											fontSize: '14px'
										}
									},
									{
										title: '注释',
										format: {
											fontSize: '12px',
											color: '#888888'
										},
										style: {
											fontSize: '12px',
											color: '#888888',
										}
									}
								]
							},
							{
								name: 'fontSize',
								items: [{
										title: '18',
										value: '18px'
									},
									{
										title: '16',
										value: '16px'
									},
									{
										title: '14',
										value: '14px'
									},
									{
										title: '12',
										value: '12px'
									},
									{
										title: '11',
										value: '11px'
									},
									{
										title: '10',
										value: '10px'
									}
								]
							},
							{
								name: 'color',
								items: [{
										value: '#000000'
									},
									{
										value: '#888888'
									},
									{
										value: '#ffffff'
									},
									{
										value: '#f6de41'
									},
									{
										value: '#f68c41'
									},
									{
										value: '#fd3136'
									},
									{
										value: '#5ad8a6'
									}
								]
							}
						]
					},
					{
						type: 'tool',
						array: [{
								name: 'align',
								label: 'icon',
								items: [{
										value: 'left',
										icon: 'align-left'
									},
									{
										value: 'center',
										icon: 'align-center'
									},
									{
										value: 'right',
										icon: 'align-right'
									}
								]
							},
							{
								name: 'text',
								label: 'icon',
								items: [{
										name: 'list',
										value: 'ordered',
										icon: 'orderedlist'
									},
									{
										name: 'list',
										value: 'bullet',
										icon: 'unorderedlist'
									},
									{
										name: 'indent',
										icon: 'outdent',
										value: '+1'
									},
									{
										name: 'indent',
										icon: 'indent',
										value: '-1'
									}
								]
							},
							{
								name: 'lineHeight',
								items: [{
										value: 1
									},
									{
										value: 1.3
									},
									{
										value: 1.5
									},
									{
										value: 2
									},
									{
										value: 3
									}
								]
							}
						]
					}
				],
				curLength: 0,
				swiperCurrent: 0,
				toolbarShow: false,
				toolBarContentShow: false,
				fixedTopHeight: 0, // 顶部工具栏高度
				toolBarHeight: 100, // 工具栏高度
				toolBarContentHeight: 530, // 工具栏内容高度
				progress: true //判断是否监听上传进度变化
			};
		},
		computed: {
			fullToolBarHeight() {
				let height = 0
				this.toolbarShow ? height += this.toolBarHeight : ''
				this.toolBarContentShow ? height += this.toolBarContentHeight : ''
				return uni.upx2px(height)
			},
			scrollHeight() {
				return this.scrollHeightDefault - this.fixedTopHeight - this.fullToolBarHeight;
			},
			scrollViewHeight() {
				let scrollViewHeight = this.scrollHeight - this.keyboardHeight;
				return this.keyboardHeight > 0 ? scrollViewHeight + this.iphoneXBottomH : scrollViewHeight;
			},
			fixedBottom() {
				return this.isIos || this.iphoneXBottomH > 0 ? (this.keyboardHeight > 0 ? this.keyboardHeight :
					this.iphoneXBottomH) : 0
			}
		},
		watch: {
			keyboardHeight(newVal, oldVal) {
				if (newVal > 0) {
					this.toolBarContentShow = false
				}
				// this.updatePosition(newVal)
			},
			toolbarShow(val) {
				if (!val) this.toolBarContentShow = val
			}
		},
		created() {
			this.index = 0
			this.createdAt = Date.now()
			this.getUid = () => `wux-upload--${this.createdAt}-${++this.index}`
			this.uploadTask = {}
			this.tempFilePaths = []
		},
		mounted() {
			const query = wx.createSelectorQuery().in(this)
			query.select('#fixed-top').boundingClientRect(res => {
				this.fixedTopHeight = res.height
			}).exec()

			const system = uni.getSystemInfo({
				success: e => {
					this.isIos = e.platform == 'ios'
					let isIphoneX = (e.platform == 'devtools' || this.isIos) && e.safeArea.top == 44
					this.iphoneXBottomH = isIphoneX ? 34 : 0
					this.scrollHeightDefault = e.windowHeight - 34
				}
			})

			uni.onKeyboardHeightChange(res => {
				let keyboardHeight = this.keyboardHeight
				if (res.height === keyboardHeight) return

				this.keyboardHeight = res.height;
				const duration = res.height > 0 ? res.duration * 1000 : 0
				keyboardHeight = res.height;
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 0,
						success: () => {
							this.updatePosition(keyboardHeight)
							this.editorCtx.scrollIntoView() //使得编辑器光标处滚动到窗口可视区域内
						}
					})
				}, duration)
			})
		},
		beforeDestroy() {
			console.log("editor beforeDestroy")
		},
		methods: {
			isActive(item, pitem) {
				let {
					name,
					value,
					format
				} = item
					!name ? name = pitem.name : ''
				if (format) {
					for (let name in format) {
						if (this.formats[name] !== format[name]) {
							return false
						}
					}
					return true
				} else {
					return value ? this.formats[name] === value : this.formats[name]
				}
			},

			hideKeyboard() {
				// uni.hideKeyboard() //uni-app提供了隐藏软键盘的api，但是没有生效
				this.editorCtx.blur()
			},
			changeSwiper(current) {
				this.toolBarContentShow = true
				this.swiperCurrent = current
				this.hideKeyboard()
			},
			updatePosition(keyboardHeight) {
				this.keyboardHeight = keyboardHeight
			},
			onEditorReady() {
				const that = this
				uni.createSelectorQuery()
					.in(this)
					.select('#editor')
					.context(function(res) {
						that.editorCtx = res.context
						that.setValue(that.content)
						// //设置默认格式
						// // that.editorCtx.format('header', '4')
						// that.editorCtx.format('fontSize', '14px')
						// that.editorCtx.format('align', 'left')
						// that.editorCtx.format('lineHeight', '1.3')
						//setContents设置内容后editor会自动聚焦，解决：先设置read_only为true,赋值后再把read_only属性设置为false
						that.readOnly = false
					})
					.exec()
			},
			onEditorInput(e) {
				let {
					html,
					text
				} = e.detail
				this.curLength = text.length - 1
			},
			onEditorFocus(e) {
				this.toolbarShow = true
				this.inputFocus = true
				if (this.isDefaultFormat) {
					//设置默认格式
					this.editorCtx.format('fontSize', '14px')
					this.editorCtx.format('align', 'left')
					this.isDefaultFormat = false
				}
			},
			onEditorBlur() {
				this.editorCtx.blur()
				this.updatePosition(0)
				this.inputFocus = false
			},
			changeKeyBoard() {
				this.toolBarContentShow = false
				this.hideKeyboard()
			},
			hideToolbar() {
				this.hideKeyboard()
				this.toolbarShow = false
			},
			// 修改默认样式
			formatDefault(format) {
				for (let name in format) {
					this.editorCtx.format(name, format[name])
				}
				if (format.bold) {
					this.editorCtx.format('bold', true)
				} else if (this.formats.bold) {
					this.editorCtx.format('bold', '')
				}
				this.editorCtx.format('lineHeight', '') //选择默认样式时，取消当前行高的选择
			},
			formatformat(bind, item = {}, pitem = {}) {
				item.name = item.name || pitem.name || ''
				let {
					name,
					value
				} = item
				switch (bind) {
					case 'format': //改变文本样式
						if (!name) return
						if (name == 'defaultFormat') { //选择标题样式时，取消当前字号的选择
							this.formatDefault(item.format)
						} else {
							this.editorCtx.format(name, value)
						}
						break
					case 'removeFormat': //删除字体样式
						this.editorCtx.removeFormat()
						break
					case 'insertDate': //插入时间
						var date = new Date()
						var formatDate = `${date.getFullYear()} 年${date.getMonth() + 1} 月${date.getDate()} 日`;
						this.editorCtx.insertText({
							text: formatDate
						})
						break
					case 'check': //设置当前行为待办列表格式
						this.editorCtx.format('list', 'check')
						break
					case 'undo': //撤销操作
						this.editorCtx.undo()
						break
					case 'redo': //恢复操作
						this.editorCtx.redo()
						break
					case 'insertDivider': //添加分割线
						this.editorCtx.insertDivider()
						break
					case 'clear': //清除内容
						this.editorCtx.clear()
						break
					case 'chooseImage': //插入相册图片
						this.chooseImage()
						break;
					case 'chooseImagebyCamera': //拍摄
						this.chooseImage(true)
						break
				}
			},
			onStatusChange(e) {
				this.formats = e.detail
				console.log(this.formats)
			},
			chooseImage(onlyCamera) {
				const success = res => {
					this.tempFilePaths = res.tempFiles.map(item => ({
						url: item.path,
						size: item.size,
						type: item.path.substring(item.path.lastIndexOf('.') + 1, item.path.length),
						uid: this.getUid()
					}))
					// 当前插入图片src地址直接使用临时路径，如果对接接口上传，更改为使用【上传文件】代码片段：

					/* 直接插入临时图片地址 start */

					this.tempFilePaths.forEach(file => {
						this.insertImage(file.url, file)
					})

					/* 直接插入临时图片地址 end */


					/* 上传文件 start */

					// this.$emit('before', res)
					// this.verifyFile()
					// this.$nextTick(() => {
					// 	this.uploadFile(this.tempFilePaths.length)
					// })

					/* 上传文件 end */

				}

				const {
					count,
					sizeType
				} = this
				setTimeout(() => {
					uni.chooseImage({
						count,
						sizeType,
						sourceType: onlyCamera ? ['camera'] : this.sourceType,
						success
					})
				}, 100)
			},
			insertImage(src, file) {
				var that = this
				that.editorCtx.insertImage({
					src,
					data: {
						id: file.uid
					},
					// extClass:'editor-img',
					extClass: 'editor--editor-img', //添加到图片 img标签上的类名为editor-img，设置前缀editor--才生效。部分机型点击图片右边的光标时不灵敏，需将样式editor-img宽度调小 max-width:98%;从而在图片右侧中留出部分位置供用户点击聚集。
					success(e) {
						//真机会自动插入一行空格
					}
				})
			},
			/**
			 * 上传文件，支持多图递归上传
			 */
			uploadFile(uploadCount, curIndex) {
				if (!this.tempFilePaths.length) return
				const {
					url,
					name,
					header,
					formData,
					progress
				} = this
				const file = this.tempFilePaths.shift()
				curIndex ? (file.index = curIndex + 1) : (file.index = 1)
				let {
					uid,
					url: filePath
				} = file
				if (!url || !filePath) return

				this.uploadTask[uid] = uni.uploadFile({
					url,
					filePath,
					name,
					header,
					formData,
					success: res => this.onSuccess(file, res),
					fail: res => this.onFail(file, res),
					complete: res => {
						delete this.uploadTask[uid]
						this.$emit('complete', res)
						//同时选择多图上传时，只校验第一张图片大小，多图递归上传需逐一校验
						if (!this.tempFilePaths.length) return
						this.verifyFile()
						this.uploadFile(uploadCount, file.index)
					}
				})
				// 判断是否监听上传进度变化
				if (progress) {
					this.uploadTask[uid].onProgressUpdate(res => this.onProgress(file, res, uploadCount))
				}
			},
			/**校验图片格式和大小是否符合规则 */
			verifyFile() {
				var {
					size: tempFilesSize,
					type
				} = this.tempFilePaths[0] //获取图片的大小，单位B
				this.noAllowType.map(item => {
					if (type == item) {
						uni.showToast({
							title: `不支持上传${item}图片`,
							icon: 'none'
						})
						this.tempFilePaths.shift()
					}
				})

				if (tempFilesSize / 1024 > this.maxSize * 1024) {
					uni.showToast({
						title: '上传图片不能大于' + this.bytesToSize(this.maxSize * 1024 * 1024) + '!',
						icon: 'none'
					})
					this.tempFilePaths.shift()
				}
			},
			onSuccess(file, res) {
				//按照接口自行处理数据，insertImage的src参数为接口返回的图片地址
				/**
				 * 示例数据:
				   res = {
				   	data: '{"code":0,"msg":"上传成功","data":{"path":"https://xxx.com/images/upload/1.png"}}'
				   }
				*/
				let json = JSON.parse(res.data)
				if (json.code == 0) {
					this.insertImage(json.data.path, file)
				} else {
					uni.showToast({
						title: '图片上传失败',
						icon: 'none'
					})
				}
			},
			onFail(file, res) {
				uni.showToast({
					title: '图片上传失败！',
					icon: 'none'
				})
			},
			/**
			 * 监听上传进度变化的回调函数
			 * @param {Object} file 文件对象
			 * @param {Object} res 请求响应对象
			 * @param {Number} uploadCount 选择图片总数量
			 */
			onProgress(file, res, uploadCount) {
				if (res.progress != 100) {
					uni.showToast({
						title: `正在上传图片${file.index}/${uploadCount}`,
						icon: 'none'
					})
				}

				const targetItem = {
					...file,
					progress: res.progress,
					res
				}
				const info = {
					file: targetItem
				}

				this.$emit('progress', info)
			},
			bytesToSize: function(bytes) {
				if (bytes === 0) return '0 B'
				var k = 1024,
					sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
					i = Math.floor(Math.log(bytes) / Math.log(k))

				return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
			},
			setValue(value) {
				if (this.editorCtx) {
					this.editorCtx.setContents({
						html: value,
						success: () => {
							this.getContents(res => {
								this.onEditorInput({
									detail: {
										html: res.html,
										text: res.text
									}
								})
								this.$emit('update', res)
							})
						}
					})
				}
			},
			getContents(callback) {
				//由于获取编辑器内容getContents为异步，因此需要使用callback回调
				this.editorCtx.getContents({
					success: res => {
						callback(res)
					}
				})
			},
			save() {
				this.editorCtx.getContents({
					success: res => {
						console.log(res)
						res.html = handleHtmlImage(res.html, true)
						this.$emit('save', res)
						uni.showToast({
							title: '保存成功',
							icon: 'none'
						})
					},
					complete: res => {
						console.log('getContents complete')
					}
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	@import 'iconfont.wxss';

	$bg-color: #f7f7f7;
	$bg-color-hover: #eaeaea;
	$main-color: #5b8ff9;

	.fixed-top {
		position: fixed;
		top: -88rpx;
		line-height: 88rpx;
		border-bottom: solid 1rpx #F1F1F1;
		padding: 0 30rpx;
		box-sizing: border-box;
		transition: all 0.3s ease;
		background-color: #FFFFFF;
		z-index: 999;

		&.isFixed {
			top: 0;
		}

		.btn {
			width: 100%;
			position: relative;
			border: 0 !important;
			border-radius: 6rpx;
			padding-left: 0;
			padding-right: 0;
			overflow: visible;
			float: right;
			width: 100rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 24rpx;
			margin: 14rpx 0;
			text-align: center;
		}

		.btn-primary {
			background: #5677fc !important;
			color: #fff;
		}

		.btn-primary:hover {
			opacity: 0.8;
		}
	}

	.fixed-top,
	.fixed-top__place {
		width: 100%;
		height: 88rpx;
	}

	.flex {
		display: flex;
	}

	.editor-container {}

	.cu-editor {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		font-size: 28rpx;
		line-height: 1.5;
		overflow: auto;
		padding: 40rpx 35rpx;
		min-height: unset !important;
	}

	.editor-img {
		max-width: 98% !important;
	}

	.ql-active {
		background-color: $bg-color-hover;

		.color-circle {
			border: solid 1px;
		}
	}

	.noBgColor {
		background-color: none !important;
	}

	.fixed-bottom {
		position: fixed;
		left: 0;
		width: 100%;
		right: 100%;
		bottom: 0;
		z-index: 99999;
	}

	.toolbar {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1rpx solid #e5e5e5;
		border-left: none;
		border-right: none;
		background: #fff;

		.iconfont {
			display: inline-block;
			cursor: pointer;
			font-size: 40rpx;
			text-align: center;
			position: relative;

			&.active::after {
				content: '';
				left: 0;
				bottom: 0;
				width: 100%;
				position: absolute;
				height: 6rpx;
				border-bottom: solid 6rpx #000000;
			}
		}

		.toolbar-item {
			height: 100rpx;
			line-height: 100rpx;
			flex: 1;
			text-align: center;

			&:active {
				opacity: 0.4;
			}
		}

		.toolbar-item-header,
		.toolbar-item-footer {
			width: 108rpx;
			text-align: center;
		}

		.toolbar-item-header {
			border-right: solid 1rpx $uni-border-color;
		}

		.toolbar-item-footer {
			border-left: solid 1rpx $uni-border-color;
			color: #5b8ff9;
			font-weight: bold;
		}
	}

	.toolbar-content {
		background-color: #ffffff;
	}

	.swiper-item {
		box-sizing: border-box;
		padding: 0 30rpx;
	}

	.tool-items {
		background-color: $bg-color;
		color: #323232;
		height: 80rpx;
		line-height: 80rpx;
		margin: 32rpx 0;
		border-radius: 16rpx;
		overflow: hidden;

		.tool-item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;

			&:active {
				background-color: $bg-color-hover;
			}

		}

		.iconfont {
			display: inline-block;
			width: 80rpx;
			height: 80rpx;
			line-height: 80rpx;
			cursor: pointer;
			font-size: 40rpx;
			text-align: center;
		}

		.color-circle {
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
		}

		.txt {
			font-size: 14px;
		}
	}

	.feature {
		margin: 30rpx;
		text-align: center;

		.icon {
			background-color: $bg-color;
			width: 120rpx;
			height: 120rpx;
			line-height: 120rpx;
			color: #323232;
			margin-bottom: 10rpx;

			&:active {
				background-color: $bg-color-hover;
			}

			.iconfont {
				font-size: 42rpx;
			}
		}
	}
</style>
