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
				content0: '',
				content: `<p><strong style="font-size: 18px;">星际穿越</strong></p><p><img style="max-width:100%;height:auto" src="http://tmp/vaFzFZ25ge6I7ea872e6a256b4c63f37990d296bf7cc.jfif" class="editor-img" data-custom="id=wux-upload--1633919220474-1"></p><p><br></p><p><strong style="font-size: 16px;">基本信息</strong></p><p><br></p><p>《星际穿越》是2014年美英联合制作的科幻电影。该片由克里斯托弗·诺兰执导，马修·麦康纳、安妮·海瑟薇领衔主演。</p><p><br></p><p>该片在物理学家基普·索恩的黑洞理论之上进行改编，主要讲述了一组宇航员通过穿越虫洞来为人类寻找新家园的冒险故事 [1]  。</p><p><br></p><p>该片于2014年11月5日在美国公映，11月7日在英国公映，11月12日在中国大陆公映。并于2020年8月2日在中国大陆重映。</p><p><br></p><p>中文名星际穿越外文名Interstellar其他译名星際啟示錄(中国香港)、星際效應(中国台湾)、星际效应(新加坡)类    型科幻出品公司派拉蒙影业公司、华纳兄弟影业(等)制片地区美国、英国发行公司派拉蒙影业公司(北美)</p><p><br></p><p>华纳兄弟影业(国际)导    演克里斯托弗·诺兰编    剧乔纳森·诺兰、克里斯托弗·诺兰制片人艾玛·托马斯</p><p><br></p><p>克里斯托弗·诺兰</p><p><br></p><p>Lynda Obst主演马修·麦康纳、安妮·海瑟薇、杰西卡·查斯坦片    长169 分钟上映时间2014年11月5日(美国)票    房7.01 亿美元 [2] 对白语言英语色    彩彩色电影分级PG-13imdb编码tt0816692制片成本1.65 亿美元 [2] </p><p><br></p><p>剧情简介编辑 语音</p><p><br></p><p>地球农作物因气候转变及枯萎病而经常失收，曾是美国国家航空航天局的工程师和航天飞机驾驶员的库珀（马修·麦康纳饰）被迫成为农民以协助解决粮食危机。库珀的10岁女儿墨菲（麦肯基·弗依饰）发现其房间书架上的书本无故掉到地上，认为这是幽灵现象。不久后，一场沙尘暴在墨菲房间中留下二进制坐标，二人驱车到达坐标位置后发现那是北美空防司令部（美国国家航空航天局的秘密基地）。</p><p><br></p><p>基地负责人布兰德教授（迈克尔·凯恩饰）向库珀透露土星附近出现了虫洞，认为外星智慧有意协助人类前往遥远星系移居，总署在约十年前已派遣了十二名科学家穿越该虫洞，各自降落在多个被认为有居住可能性的行星上，传送回来的资料显示其中一个以黑洞“卡冈图雅（Gargantua）”为中心的行星系统有三颗星球可能适合殖民。行星以降落的科学家名字命名：米勒（Miller）、埃德蒙斯（Edmunds）和曼恩（Mann）。库珀答允布兰德教授的要求，担任航天器永续号（Endurance）的驾驶员前往执行拉撒路项目（Lazarus mission）：A计划为确认星球适居性后，透过布兰德教授的重力方程协助地球人类前往殖民；B计划为带着多个人类胚胎进行殖民，留在地球的人类则会灭绝。墨菲因担心库珀一去不回而深感愤怒，库珀在二人没有好好道别的情况下离开，他与布兰德教授的女儿艾米莉亚（安妮·海瑟薇饰）、物理学家罗米利（大卫·吉亚斯饰）、地质学家道尔（韦斯·本特利饰）和两个机器人塔斯（TARS）与凯斯（CASE）前往太空登上永续号启程。</p><p><br></p><p>众人先到达米勒星；“卡冈图雅”庞大引力造成的引力时间膨胀使米勒星的一小时约为地球的七年。但众人漏算了前几年收到来自米勒的数据以此星球的时间而言其实只是几小时前，因此除罗米利与塔斯外一众成员乘坐飞艇漫游者号（Ranger）降落星球后，才发现地表只有一片汪洋且经常出现巨型海啸，其海啸的来袭使道尔丧生，并且延误了回程。众人返回永续号后发现对罗米利而言已度过了超过23年的时间。</p><p><br></p><p>众人认为至今只能选择前往余下两个星球的其中一个，经过一番争辩后终决定前往曼恩星。同时墨菲已成长为与库珀离开地球时相同的同龄，她加入了美国国家航空航天局协助布兰德教授解开拯救地球人类所需要的重力方程，但教授在健康恶化弥留之际向墨菲承认A计划只是个谎言，不可能实现。另一方面，科学家曼恩（马特·达蒙饰）被众人从人工睡眠中唤醒后表示，方程因缺乏黑洞引力奇点的数据而无法完成，因此永续号的真正目的并非拯救地球人类，库珀因此十分愤怒与懊悔，打算放弃项目、回到地球寻找家人。在稍后的营地寻找任务中，曼恩破坏了库珀的太空面罩并表示所有宜居数据均为他一手创造的假数据，目的是希望国家航空航天局能派人前来救他。曼恩留下待死的库珀后夺取漫游者号前往永续号，同时罗米利试图从被曼恩拆解的机器人奇普（KIPP）中取得探测资料，触动了陷阱引发爆炸身亡。艾米莉亚救回即将因吸入过多氨气而窒息的库珀，二人乘坐降落艇追赶曼恩。曼恩在与永续号并未完全对接成功的情况下打开气闸，产生的失控减压使他身亡，并导致永续号失控旋转，库珀成功对接永续号使其稳定下来。</p><p><br></p><p>永续号上的资源已不足以返回地球，因此二人驶向“卡冈图雅”，射出塔斯让它收集引力奇点的数据，在接收数据传送回地球后以重力助推前往埃德蒙斯星实行B计划。为减少永续号的质量让艾米莉亚逃生，库珀让自己驾驶的漫游者号于耗尽燃料后分离并进入黑洞，但在漫游者号被毁弹射逃生后，库珀发现自己身处一个非线性流动的第五维度超正方体；库珀至此明白了未来超越了时空并进化到较高文明的人类创造了四维超正方体和虫洞以拯救过去的人类，也明白自己亦是墨菲儿时遇上的幽灵、引导自己参与拉撒路项目（这是一个命定悖论）。库珀把塔斯取得的黑洞数据以引力波透过墨菲的手表传送给她；成人墨菲在回忆此事时终于了发现父亲的讯息，她完成了布兰德教授的方程使人类得以离开地球，前往环绕着土星运行的空间站居住。</p><p><br></p><p>四维超正方体空间在数据传送完毕后关闭，库珀被送离虫洞回到土星附近，被土星宇宙殖民地人员救起。此时他已离开地球91年，理论上而言已是124岁。库珀在空间站上与年老垂死的墨菲重逢，但墨菲不欲父亲目睹自己离世而让他离开，并说服他前往埃德蒙斯星去寻找艾米莉亚。库珀与塔斯搭乘一艘次世代漫游者号前往埃德蒙斯星。 [1] </p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p style="text-align: left;"><br></p>`,
				content1: `<p style="text-align: left;"><span style="color: rgb(136, 136, 136); font-size: 14px;">表单组件&nbsp;/&nbsp;</span><span style="color: rgb(0, 0, 0); font-size: 14px;">editor</span></p><p style="line-height: 2;"><strong style="font-size: 18px;">editor</strong></p><p style="text-align: left;">基础库&nbsp;2.7.0&nbsp;开始支持，低版本需做<span style="color: rgb(90, 216, 166);">兼容处理</span>。</p><p><br></p><p>富文本编辑器，可以对图片、文字进行编辑。</p><p><br></p><p>编辑器导出内容支持带标签的&nbsp;html和纯文本的&nbsp;text，编辑器内部采用&nbsp;delta&nbsp;格式进行存储。</p><p><br></p><p>通过 setContents 接口设置内容时，解析插入的&nbsp;html&nbsp;可能会由于一些非法标签导致解析错误，建议开发者在小程序内使用时通过&nbsp;delta&nbsp;进行插入。</p><p><br></p><p>富文本组件内部引入了一些基本的样式使得内容可以正确的展示，开发时可以进行覆盖。需要注意的是，在其它组件或环境中使用富文本组件导出的html时，需要额外引入&nbsp;这段样式，并维护&lt;ql-container&gt;&lt;ql-editor&gt;&lt;/ql-editor&gt;&lt;/ql-container&gt;的结构。</p><p><br></p><p>图片控件仅初始化时设置有效。</p><p><br></p><p>相关&nbsp;api：&nbsp;<strong>EditorContext</strong></p><p><br></p><p>属性	类型	默认值	必填	说明	最低版本</p><p>read-only	boolean	false	否	设置编辑器为只读	2.7.0</p><p>placeholder	string&nbsp;否	提示信息	2.7.0</p><p>show-img-size	boolean	false	否	点击图片时显示图片大小控件	2.7.0</p><p>show-img-toolbar	boolean	false	否	点击图片时显示工具栏控件	2.7.0</p><p>show-img-resize	boolean	false	否	点击图片时显示修改尺寸控件	2.7.0</p><p>bindready	eventhandle&nbsp;否	编辑器初始化完成时触发	2.7.0</p><p>bindfocus	eventhandle&nbsp;否	编辑器聚焦时触发，event.detail&nbsp;=&nbsp;{html,&nbsp;text,&nbsp;delta}	2.7.0</p><p>bindblur	eventhandle&nbsp;否	编辑器失去焦点时触发，detail&nbsp;=&nbsp;{html,&nbsp;text,&nbsp;delta}	2.7.0</p><p>bindinput	eventhandle&nbsp;否	编辑器内容改变时触发，detail&nbsp;=&nbsp;{html,&nbsp;text,&nbsp;delta}	2.7.0</p><p>bindstatuschange	eventhandle&nbsp;否	通过&nbsp;Context&nbsp;方法改变编辑器内样式时触发，返回选区已设置的样式	2.7.0</p><p>编辑器内支持部分&nbsp;HTML&nbsp;标签和内联样式，不支持class和id</p><p><br></p><p>支持的标签</p><p>不满足的标签会被忽略，&lt;div&gt;会被转行为&lt;p&gt;储存。</p><p><br></p><p>类型	节点</p><p>行内元素	&lt;span&gt;&nbsp;&lt;strong&gt;&nbsp;&lt;b&gt;&nbsp;&lt;ins&gt;&nbsp;&lt;em&gt;&nbsp;&lt;i&gt;&nbsp;&lt;u&gt;&nbsp;&lt;a&gt;&nbsp;&lt;del&gt;&nbsp;&lt;s&gt;&nbsp;&lt;sub&gt;&nbsp;&lt;sup&gt;&nbsp;&lt;img&gt;</p><p>块级元素	&lt;p&gt;&nbsp;&lt;h1&gt;&nbsp;&lt;h2&gt;&nbsp;&lt;h3&gt;&nbsp;&lt;h4&gt;&nbsp;&lt;h5&gt;&nbsp;&lt;h6&gt;&nbsp;&lt;hr&gt;&nbsp;&lt;ol&gt;&nbsp;&lt;ul&gt;&nbsp;&lt;li&gt;</p><p>支持的内联样式</p><p>内联样式仅能设置在行内元素或块级元素上，不能同时设置。例如&nbsp;font-size&nbsp;归类为行内元素属性，在&nbsp;p&nbsp;标签上设置是无效的。</p><p><br></p><p>类型	样式</p><p>块级样式	text-align&nbsp;direction&nbsp;margin&nbsp;margin-top&nbsp;margin-left&nbsp;margin-right&nbsp;margin-bottom</p><p>padding&nbsp;padding-top&nbsp;padding-left&nbsp;padding-right&nbsp;padding-bottom&nbsp;line-height&nbsp;text-indent</p><p>行内样式	font&nbsp;font-size&nbsp;font-style&nbsp;font-variant&nbsp;font-weight&nbsp;font-family</p><p>letter-spacing&nbsp;text-decoration&nbsp;color&nbsp;background-color</p><p>Bug&nbsp;&amp;&nbsp;Tip</p><p>tip:&nbsp;使用&nbsp;catchtouchend&nbsp;绑定事件则不会使编辑器失去焦点(2.8.3)</p><p>tip:&nbsp;插入的&nbsp;html&nbsp;中事件绑定会被移除</p><p>tip:&nbsp;formats&nbsp;中的&nbsp;color&nbsp;属性会统一以&nbsp;hex&nbsp;格式返回</p><p>tip:&nbsp;粘贴时仅纯文本内容会被拷贝进编辑器</p><p>tip:&nbsp;插入&nbsp;html&nbsp;到编辑器内时，编辑器会删除一些不必要的标签，以保证内容的统一。例如&lt;p&gt;&lt;span&gt;xxx&lt;/span&gt;&lt;/p&gt;会改写为&lt;p&gt;xxx&lt;/p&gt;</p><p>tip:&nbsp;编辑器聚焦时页面会被上推，系统行为以保证编辑区可见</p><p>示例代码</p><p style="text-align: left;">在开发者工具中预览效果</p>`
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
