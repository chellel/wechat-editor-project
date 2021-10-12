<script>
		import Vue from 'vue'
		export default {
			onLaunch: function() {
				console.log('App Launch')
				const e = uni.getSystemInfoSync()
				let isIphoneX = (e.platform == 'devtools' || this.isIos) && e.safeArea.top == 44
				Vue.prototype.iphoneXBottomH = isIphoneX ? 34 : 0
			},
			onShow: function() {
				console.log('App Show')
			},
			onHide: function() {
				console.log('App Hide')
			}
		}
	</script>

	<style>
		@import url('@/styles/common.scss');
		
		* {
			box-sizing: border-box;
			padding: 0;
			margin: 0;
		}

		/*每个页面公共css */
	</style>
