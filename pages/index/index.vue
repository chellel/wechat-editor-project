<template>
	<view class="container">
		<view>
			<text class="hello-text">uni-app内置组件，展示样式仅供参考，文档详见：</text>
		</view>
		<view class="cell-panel">
			<view v-for="(item, index) in list" :key="index" class="cell-item" @click="toPage(item)">
				<!-- <view class="cell-hd"></view> -->
				<view class="cell-bd">{{item.title}}</view>
				<view class="cell-ft"></view>
			</view>
		</view>
		<button @click="toEditor">点击编辑</button>
		<view class="text-area" v-html="content">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						title: '页面一',
						path: '/pages/document/index'
					},
					{
						title: '页面一',
						path: ''
					}
				],
				content0: '',
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
			},
			toPage(item) {
				uni.navigateTo({
					url: item.path
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.content {}

	.cell-item {
		display: flex;
		align-items: center;
		height: 88rpx;
		line-height: 88rpx;

		.cell-bd {
			flex: 1;
		}

		.cell-ft {}
	}



	.cell-ft {
		position: relative;
		height: 100%;
		
		&::after {
			content: " ";
			display: inline-block;
			height: 10rpx;
			width: 10rpx;
			border-width:  2rpx  2rpx  0  0 ;
			border-color: #b4b4b4;
			border-style: solid;
			transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
			position: absolute;
			top: 44rpx;
			right: 22rpx;
		}

		.down::after {
			border-width: 0 2rpx 2rpx 0;
			margin-top: -6rpx;
		}
	}
</style>
