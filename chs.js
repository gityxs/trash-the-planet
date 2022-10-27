/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com
 @idle games : http://www.gityx.com
 @QQ Group : 627141737

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Achievement Gotten!": "成就达成！",
    "(it's all really good)": "（一切都很好）",
    "% complete": "％ 完成",
    "Continue": "继续",
    "Cost:": "成本：",
    "Enable music and SFX?": "启用音乐和 SFX？",
    "Loading": "正在加载",
    "Start over": "重来",
    "This Game Is Haunted": "这个游戏闹鬼",
    "You can enable or disable audio in the options menu at any time": "您可以随时在选项菜单中启用或禁用音频",
    "You need to enable JavaScript to run this app.": "您需要启用 JavaScript 才能运行此应用程序。",
    "– Day": "– 天",
    "A human is mad": "一个人疯了",
    "Across the back lawn": "穿过后草坪",
    "Act": "行为",
    "Act I": "第一幕",
    "And they're making a terrible bang": "他们正在发出可怕的爆炸声",
    "And when you next look around": "当你下次环顾四周时",
    "Autosave": "自动保存",
    "Back to Title Screen": "返回标题屏幕",
    "Dialogue Speed:": "对话速度：",
    "Food": "食物",
    "Game Paused": "游戏暂停",
    "Gather Food": "收集食物",
    "Gather Trash": "收集垃圾",
    "Global Business Level:": "全球业务水平：",
    "Hold": "抓住",
    "How to Gather Trash and Influence Raccoons": "如何收集垃圾和影响浣熊",
    "In your search, you find some trash. Its appeal is undeniable.": "在您的搜索中，您会发现一些垃圾。它的吸引力是不可否认的。",
    "in-game to view keyboard controls (where available)": "在游戏中查看键盘控制（如果可用）",
    "Jobs": "工作",
    "Level": "等级",
    "Load": "加载",
    "Medium": "中等",
    "Music:": "音乐：",
    "Off": "关",
    "On": "开",
    "or": "或",
    "Our treasure. No bin, can, or dumpster is safe.": "我们的宝藏。没有垃圾桶、罐头或垃圾箱是安全的。",
    "Press": "按",
    "Raccoons assigned": "分配的浣熊",
    "reached...": "到达...",
    "Scared by the human's big sound": "被人类的大声音吓到了",
    "SFX:": "音效：",
    "Show teeth, rip and gnash": "显示牙齿，撕裂和咬牙切齿",
    "Sort Trash": "分类垃圾",
    "Take off in a dash": "快速起飞",
    "Tense and Trashy": "紧张和垃圾",
    "That you're near their pad": "你在他们的垫子附近",
    "The good stuff.": "好东西。",
    "The human is holding their ground": "人类坚守阵地",
    "to open/close the Options screen": "打开/关闭选项屏幕",
    "To snatch trash, but suddenly: CLANG": "抢垃圾，却突然：CLANG",
    "Toggle Full Screen": "切换全屏",
    "Trash": "垃圾",
    "unassigned": "未分配",
    "Volume:": "体积：",
    "What does this crisis demand?": "这场危机需要什么？",
    "With cutie panache": "带着可爱的华丽",
    "You act in a flash": "你一闪而过",
    "You approach the cans with the gang": "你和那帮人一起接近罐头",
    "You consider the options at hand": "您考虑手头的选择",
    "You put it in your mouth and then digest it.": "你把它放在嘴里，然后消化它。",
    "You're the leader of a group of raccoons looking for food to survive.": "你是一群浣熊寻找食物生存的领导者。",
    "Your friends are all gone": "你的朋友都走了",
    "As you gather more trash, you start naturally sorting it by type.": "随着您收集更多垃圾，您自然会开始按类型对其进行分类。",
    "Bones": "骨头",
    "Cloth": "布",
    "Do-it-yourself xylophone kit.": "自己动手做的木琴套件。",
    "Eating food rules, so get enough for everybody.": "饮食规则，所以每个人都吃饱。",
    "Full of the complex smell of human expression.": "充满了人类表情的复杂气味。",
    "Hats, airplanes, cuts, subpoenas — there's nothing you can't make outta this stuff.": "帽子、飞机、剪裁、传票——没有什么是你做不到的。",
    "It's like rock but a little bit more upset.": "这就像摇滚，但有点心烦意乱。",
    "It's the gang. Right now, 5 out of 5 are doing stuff, and 0 are chilling. New raccoons arrive in 16 seconds.": "是帮派 现在，五分之五的人在做事，0 人在发冷。 新浣熊在 16 秒内到达。",
    "It's the gang. Right now, 5 out of 5 are doing stuff, and 0 are chilling. New raccoons won't join until you've got food saved up and a well-sorted trash pile.": "是帮派 现在，五分之五的人在做事，0 人在发冷。 新浣熊不会加入，除非你有食物储备和分类良好的垃圾堆。",
    "Lasts forever. Couldn't possibly cause any problems down the line.": "永远持续下去。 不可能导致任何问题。",
    "Metal": "金属",
    "Paper": "纸",
    "Plastic": "塑料",
    "Portable tree essence.": "便携树精。",
    "Raccoons": "浣熊",
    "Time to take out the trash...and place it neatly into discrete piles.": "是时候把垃圾拿出来了……把它整齐地堆成一堆。",
    "Time Until Raccoons Eat": "浣熊吃东西的时间",
    "Wood": "木头",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    // 图标代码，不能汉化
    "Jacorb's Games": "Jacorb's Games",
    "© 2019–2021": "© 2019–2021",
    "Y": "Y",
    "v2.1.0": "v2.1.0",
    "o": "o",
    "N": "N",
    "es": "",
    "Ctrl": "Ctrl",
    "X": "X",
    "Option": "Option",
    "Tab": "Tab",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "By Jacorb90": "By Jacorb90",
    "content_copy": "content_copy",
    "library_books": "library_books",
    "discord": "discord",
    "drag_handle": "drag_handle",
    "edit": "edit",
    "forum": "forum",
    "content_paste": "content_paste",
    "delete": "delete",
    "info": "info",
    "settings": "settings",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'Git游戏': 'Git游戏',
    'QQ群号': 'QQ群号',
    'x': 'x',
    'QQ群号:': 'QQ群号:',
    '* 启用后台游戏': '* 启用后台游戏',
    '更多同类游戏:': '更多同类游戏:',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "\n": "\n",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Shift-Click to Toggle Tooltips: ": "Shift-单击以切换工具提示：",
    "Save File ": "保存文件 ",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "  ",
    " ": " ",
    "\n": "\n",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)\-([\d\.]+)\-([\d\.]+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^\(([\d\.]+)\/([\d\.]+)\)$/,
    /^成本(.+)$/,
    /^\(([\d\.]+)\%\)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)K$/,
    /^([\d\.]+)M$/,
    /^([\d\.]+)B$/,
    /^([\d\.]+) K$/,
    /^([\d\.]+) M$/,
    /^([\d\.]+) B$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^\+([\d\.,]+)$/,
    /^\-([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^([\d\.,]+) \/ ([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^e([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Your (.+) raccoons will eat (.+) food in (.+) seconds. Make sure you have enough food on hand. Hungry raccoons can't work quickly and new raccoons won't join a community that has no food.$/, '你的 $1 只浣熊将在 $3 秒内吃掉 $2 食物。 确保手头有足够的食物。 饥饿的浣熊不能快速工作，新的浣熊不会加入没有食物的社区。'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
    [/^Recruit (.+) Raccoons$/, '招募 $1 只浣熊'],
	[/^Scenario (\d+) of (\d+)$/, '场景 $1 \/ $2'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^([\d\.]+) elves$/, '$1 精灵'],
    [/^([\d\.]+)d ([\d\.]+)h ([\d\.]+)m$/, '$1天 $2小时 $3分'],
    [/^([\d\.]+)e([\d\.,]+) elves$/, '$1e$2 精灵'],
    [/^([\d\.,]+) elves$/, '$1 精灵'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Req: (.+) elves$/, '要求：$1 精灵'],
    [/^Req: (.+) \/ (.+) elves$/, '要求：$1 \/ $2 精灵'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);