<template>
	<view class="container">
		<view :style="{paddingBottom: iphoneXBottomH + 'px'}">
			<view class="btn-area">
				<button class="btn btn-primary" @click="toEditor">编辑</button>
			</view>
			<view class="text-area" v-html="content"></view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iphoneXBottomH: this.iphoneXBottomH,
				title: '',
				content: ''
			}
		},
		onLoad(options) {
			if (options.item) {
				let item = JSON.parse(decodeURIComponent(options.item))
				this.title = item.title
				this.content = item.content
			}
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
			},
		}
	}
</script>

<style lang="scss">
	.text-area {
		padding: 30rpx;
	}

	.btn-area {
		height: 88rpx;
		border-bottom: solid 1rpx #F1F1F1;
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;

		.btn {
			float: right;
			width: 100rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 24rpx;
			margin: 14rpx 0;
			text-align: center;
		}
	}
</style>
