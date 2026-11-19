'use strict';
function excelCase(){return `<div class="dialog-content excel-details"><div class="eyebrow">01 / Excel 作品</div><h2 id="dialog-title">自制 Excel 采购表</h2><p class="description">通过采购业务场景，将数据整理、公式计算、跨表关联和统计汇总应用到一份工作簿中。</p><section class="protected-gallery" aria-label="工作表展示"><h3>工作表预览</h3><p class="note">2026/11/04 更新 · 7 张工作表，12 个展示视图。全部为个人练习模拟数据，保留示例联系人及电话；图片含姓名水印，宽表按主题拆分。仅展示部分行列，完整 Excel 与公式不公开下载。</p><div class="preview-tabs" role="group" aria-label="切换工作表"><button type="button" data-sheet="02" aria-pressed="true">采购计划表 · 需求与周期</button><button type="button" data-sheet="03" aria-pressed="false">采购计划表 · 交期提醒</button><button type="button" data-sheet="04" aria-pressed="false">合同表</button><button type="button" data-sheet="05" aria-pressed="false">采购表</button><button type="button" data-sheet="06" aria-pressed="false">物料跟踪表 · 进度</button><button type="button" data-sheet="07" aria-pressed="false">物料跟踪表 · 数量与交期</button><button type="button" data-sheet="08" aria-pressed="false">到货入库表 · 收货</button><button type="button" data-sheet="09" aria-pressed="false">到货入库表 · 质检与入库</button><button type="button" data-sheet="10" aria-pressed="false">供应商信息</button><button type="button" data-sheet="11" aria-pressed="false">物料仓库信息</button><button type="button" data-sheet="12" aria-pressed="false">采购面板 · 总览看板</button><button type="button" data-sheet="13" aria-pressed="false">采购面板 · 明细与筛选</button></div><button type="button" id="preview-zoom" aria-pressed="false">放大查看</button><figure><div class="preview-scroll"><img id="sheet-preview" src="assets/excel/latest-02.jpg" alt="采购计划表 · 需求与周期：模拟数据水印预览"></div><figcaption id="sheet-caption">采购计划表 · 需求与周期 · 模拟数据展示</figcaption></figure><p class="note">预览依据文件保存值整理，未重新计算公式；此处用于展示设计与应用思路，不代表已完成业务准确性验证。</p></section><h3>包含的工作表</h3><ul><li><strong>采购计划表：</strong>整理物料需求、供货提前期与安全周期，计算最晚下单时间。</li><li><strong>合同表：</strong>整理合同相关信息，关联采购业务记录。</li><li><strong>采购表：</strong>记录采购单号、物料、数量、单价与供应商等信息。</li><li><strong>物料跟踪表：</strong>跟踪交期、到货数量、未到货数量及到货状态。</li><li><strong>到货入库表：</strong>记录分批收货、检验结果与入库情况。</li><li><strong>物料仓库信息：</strong>维护物料名称、规格、单位与库位等基础信息。</li><li><strong>供应商信息：</strong>维护供应商基础资料，供其他工作表查找引用。</li></ul><h3>应用到的 Excel 函数与功能</h3><ul><li><strong>IF：</strong>判断空值与业务条件，输出对应的状态或计算结果。</li><li><strong>XLOOKUP：</strong>跨表查找并匹配物料、供应商等信息。</li><li><strong>SUM 系列函数：</strong>对数量、金额求和，并按条件进行汇总。</li><li><strong>FILTER：</strong>动态筛选已填写的采购明细，让记录随源数据变化而更新。</li><li><strong>条件格式：</strong>根据交期、到货等条件设置颜色提醒。</li><li><strong>数据有效性：</strong>通过下拉选项、输入限制等方式规范数据录入。</li><li><strong>数据透视表：</strong>对采购数据分类汇总，从不同维度查看统计结果。</li></ul><p class="note">个人练习作品。预览依据工作簿已保存数据整理，非完整工作簿；全部数据为模拟数据，不提供源文件下载。</p></div>`;}
function videoCase(){return policyCase();}
const $=s=>document.querySelector(s);
const menuToggle=$('#menu-toggle');
const nav=$('#site-nav');
function toggleMenu(open){nav.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'收起导航':'展开导航');}
menuToggle.addEventListener('click',()=>toggleMenu(nav.hidden));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
document.addEventListener('click',e=>{if(!e.target.closest('.masthead'))toggleMenu(false);});
document.addEventListener('keydown',e=>{if(e.key==='Escape')toggleMenu(false);});
const dialog=$('#project-dialog');
const body=$('#dialog-body');
let lastTrigger=null;
const baseRows=[{order:'CG261001',material:'WL001',name:'螺母 M8',qty:500,received:200},{order:'CG261002',material:'WL002',name:'轴承 6204',qty:100,received:100},{order:'CG261004',material:'WL004',name:'电机外壳',qty:60,received:0}];
function escapeText(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('visible'),3000);}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});document.querySelectorAll('.work-card').forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter);}));
$('#share').addEventListener('click',async()=>{const url=location.href.split('#')[0];try{await navigator.clipboard.writeText(url);toast('作品集链接已复制，可以分享给别人了。');}catch{if(navigator.share){try{await navigator.share({title:'董加伟 / David 的作品集',url});}catch{toast('已取消分享。');}}else{window.prompt('复制这个作品集链接：',url);}}});
function closeDialog(){const v=dialog.querySelector('video');if(v)v.pause();dialog.close();}
$('#close-dialog').addEventListener('click',closeDialog);
dialog.addEventListener('close',()=>{const v=dialog.querySelector('video');if(v)v.pause();document.body.style.overflow='';if(lastTrigger)lastTrigger.focus();});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{lastTrigger=button;const _p=button.dataset.project;if(_p==='psbasic'){body.innerHTML=psbasicCase();dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';return;}if(_p==='portraits'){body.innerHTML=portraitsCase();dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';return;}if(_p==='aivideo'){body.innerHTML=aivideoCase();dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';return;}if(_p==='guide'){body.innerHTML=guideCase();dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';return;}if(_p==='policy'){body.innerHTML=policyCase();bindPolicy();dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';return;}if(_p==='video'){body.innerHTML=videoCase();dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';return;}body.innerHTML=excelCase();body.querySelector("#preview-zoom").addEventListener("click",e=>{const zoom=body.querySelector(".preview-scroll").classList.toggle("is-zoom");e.currentTarget.setAttribute("aria-pressed",String(zoom));e.currentTarget.textContent=zoom?"恢复适应宽度":"放大查看";});body.querySelectorAll("[data-sheet]").forEach(tab=>tab.addEventListener("click",()=>{body.querySelectorAll("[data-sheet]").forEach(b=>b.setAttribute("aria-pressed",String(b===tab)));const img=body.querySelector("#sheet-preview");img.src="assets/excel/latest-"+tab.dataset.sheet+".jpg";img.alt=tab.textContent+"：模拟数据水印预览";body.querySelector("#sheet-caption").textContent=tab.textContent+" · 模拟数据展示";}));dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';}));


function guideCase(){return `<div class="dialog-content"><div class="eyebrow">01 / 信息产品</div><h2 id="dialog-title">升学指南 · 专升本信息服务站</h2><p class="description">专升本的答案散在三四个地方：政策文件、招生计划、往年投档表、学校通知。学生要来回翻，翻完还不确定自己理解得对不对。这个东西做的就是把它们收拢成三个能查的模块。</p><ul class="case-notes"><li><strong>行情数据：</strong>2024—2026 报考与招生走势，先判断整体难度。</li><li><strong>投档线查询：</strong>2022—2026 按年份、院校、专业筛选，回答"我这个专业多少分能上"。</li><li><strong>资格与流程：</strong>六类考生身份逐条拆——能不能报、什么时候报、和谁一起录。</li></ul><h3>真实页面（可直接操作）</h3><iframe src="site/index.html" title="升学指南真实页面" style="width:100%;height:640px;border:1px solid var(--line);background:#fff" loading="lazy"></iframe><p class="note">筛选、切换、查询都能点，不是截图。也可以 <a href="site/index.html" target="_blank" rel="noopener">在新窗口打开完整站点 \u2197</a></p><h3>几个具体决策</h3><ul class="case-notes"><li><strong>先做查询，不做文章。</strong>文章解决"不知道"，查询解决"不确定"——学生卡在后者。</li><li><strong>投档线按院校+专业双筛选。</strong>专升本录取是院校和专业绑定的，只给学校等于没答问题。</li><li><strong>六类身份各自独立。</strong>能不能兼报、考不考试、什么时候报完全不同，混着讲必然出错。</li><li><strong>不做分数预测。</strong>预测没有依据，宁可给去年真实分数，也不给假判断。</li></ul><h3>我知道的问题</h3><ul class="case-notes"><li>数据是静态的，每年政策变动靠人工更新，没有自动同步。</li><li>只覆盖山东，其他省份规则不同，不能直接搬。</li><li>没做过用户可用性测试，结构是按我对学生的理解设计的。</li></ul></div>`}

var POLICY_CHAPTERS=[["00:01",1,"统考科目"],["00:16",16,"校荐生"],["00:48",48,"自荐生"],["01:08",68,"建档立卡"],["01:34",94,"退役士兵"],["02:10",130,"大赛保送"],["02:39",159,"共同时间"],["02:55",175,"最后提醒"],["03:08",188,"3+2 转段"]];

function policyCase(){var chs=POLICY_CHAPTERS.map(function(c,i){return '<button type="button" class="chapter-btn" data-t="'+c[1]+'"><span class="ct">'+c[0]+'</span><span class="cn">'+c[2]+'</span></button>';}).join('');return `<div class="dialog-content"><div class="eyebrow">02 / 视频作品</div><h2 id="dialog-title">招生政策 · 3 分钟像素讲解</h2><p class="description">政策原文我整理过，信息是对的，但学生不看。于是设计虚拟形象「小书」，把六类考生的流程拍成像素风讲解片，按身份切章节，点哪段看哪段。</p><figure class="video-player"><video id="policy-video" controls playsinline preload="metadata" poster="site/assets/eligibility-poster.jpg"><source src="site/assets/eligibility-2026-v9.mp4" type="video/mp4">当前浏览器不支持视频播放。</video></figure><p class="note">1280×720 · 时长 03:20 · 完整配音与字幕</p><h3>按身份跳转</h3><div class="chapter-grid">`+chs+`</div><h3>同一个体系里的第二件东西：民办校查询</h3><p class="description">讲解片解决「听不懂」，查询解决「查不到」。把 31 个省级行政区的民办与国际学校招生范围、对外招生名额做成一张能查的表：先选省份，再选城市和区，最后看学校；每所学校的小学 / 初中 / 高中分别写清招生范围和名额。</p><figure class="video-player" style="aspect-ratio:auto"><img src="assets/guide-private.jpg" alt="民办校查询页面：省市区三级筛选、逐校招生范围与名额" style="width:100%;display:block"></figure><p class="note">289 条逐校记录 · 94 个区县 · 省市区三级联动 + 学段筛选 · <a href="site/private.html" target="_blank" rel="noopener">单独打开查询页 ↗</a></p><h3>为什么拍成视频</h3><ul class="case-notes"><li><strong>政策类内容有两种读者：</strong>要核对的人（会看表格）和要听懂的人（只看视频）。只做文字等于放弃后者，而后者是大多数。</li><li><strong>章节按"你是哪种人"切，不按文件顺序切。</strong>学生一进来就能跳到自己那一段。</li><li><strong>一步只给一个信息点。</strong>像素风细节少，画面里多放一个元素，观众就不知道该看哪儿。</li></ul><h3>我知道的问题</h3><ul class="case-notes"><li>像素风降低门槛，但严肃政策用卡通形象，可信度会打折——所以视频旁边必须配文字版。</li><li>3 分钟塞 9 个信息点偏密，真实场景应该拆成 3 条 1 分钟短视频。</li><li>没测过完播率，章节跳转是我对"看不下去"的解法，但没有数据证明有效。</li></ul></div>`}

function bindPolicy(){var v=document.querySelector('#policy-video');if(!v)return;document.querySelectorAll('.chapter-btn').forEach(function(b){b.addEventListener('click',function(){v.currentTime=parseFloat(b.dataset.t)||0;v.play();});});v.addEventListener('timeupdate',function(){var t=v.currentTime;var els=document.querySelectorAll('.chapter-btn');var cur=0;POLICY_CHAPTERS.forEach(function(c,i){if(t>=c[1])cur=i;});els.forEach(function(x,i){x.classList.toggle('on',i===cur);});});}

function aivideoCase(){return splitCase({
  eyebrow:'04 / AI 视频',
  title:'AI 短片《下一页》',
  desc:'一场夜戏，从白模预演到成片：先用灰模把机位、走位、光位定死，再让 AI 出片。AI 视频最难的不是画质，是人物在每个镜头里长得一样、动作接得上——这套流程就是为了控制这件事。',
  shots:[
    {src:'assets/aivideo/cover.jpg',label:'封面',cap:'《下一页》· 图书馆闭馆前',detail:'<p><strong>封面——</strong>一张桌子两端：穿灰卫衣的女生伸手，穿黑开衫的女生坐着抬头，两个人在同一盏灯下。画面按取景器做：时间码、ISO、焦段都是印上去的，提示这是一段拍出来的戏。</p>'},
    {src:'assets/aivideo/scene.jpg',label:'场景 · 外景',cap:'主场景 · 图书馆之外',detail:'<p><strong>主场景——</strong>全片的亮部只有图书馆一处，人物从暗里走向光。夜景最难的是让「亮」有依据：霓虹都在远处，近处只有一排路灯和一栋楼。</p>'},
    {src:'assets/aivideo/previs-2.jpg',label:'灰模 · 人物',cap:'灰模预演 · 夜里的背影',detail:'<p><strong>白模预演——</strong>不贴图、不打光，先用灰模把人物的位置、朝向、镜头距离定下来。这一步不关心好不好看，只关心人站在画面哪儿、往哪儿动。</p>'},
    {src:'assets/aivideo/previs-3.jpg',label:'灰模 · 动作',cap:'灰模预演 · 低头瞬间',detail:'<p>关键动作先在灰模里对时间点：低头、停住、抬眼。动作幅度得和镜头运动匹配，不然成片里人的动作会「飘」。</p>'},
    {src:'assets/aivideo/previs-1.jpg',label:'灰模 · 近景',cap:'灰模预演 · 人物近景',detail:'<p>近景这一档最考验构图：脸放在画面哪个位置、边缘留多少空间，先在灰模里排好，再交给 AI 生成，跨镜头才不走形。</p>'},
    {src:'assets/aivideo/render-1.jpg',label:'渲染 · 墙面',cap:'渲染测试 · 阵列墙面与暗部',detail:'<p><strong>渲染测试——</strong>夜景戏最怕死黑。先在没有人的纯场景里试片：这一帧看的是阵列墙面的高光与暗部层次，亮部有没有过曝、暗处会不会塌成一整块黑。</p>'},
    {src:'assets/aivideo/render-2.jpg',label:'渲染 · 地面',cap:'渲染测试 · 地面反光与光比',detail:'<p>用最简单的几何体先把光比跑通：地面反光多强、边缘黑位落在哪。地面不对，夜景看起来就像贴图。</p>'},
    {src:'assets/aivideo/render-3.jpg',label:'渲染 · 极暗帧',cap:'渲染测试 · 极暗帧',detail:'<p>压到最暗的一帧，看灰阶在哪儿塌掉、地平线还剩不剩。先知道极限，AI 出片时暗部才敢往下压。</p>'}
  ],
  note:'流程：手绘分镜 → 3D 白模预演 → 灯光测试 → AI 生成 → 拼接调色。白模与测试帧来自 3D 预演，成片在即梦画布里继续生成：<a href="https://jimeng.jianying.com/ai-tool/ai-canvas/c6905d03-5df5-4c78-b2ba-a87f8e90dc7c" target="_blank" rel="noopener">在即梦打开项目画布 ↗</a>（需登录即梦账号）'
});}

function psbasicCase(){return splitCase({
  eyebrow:'03 / 平面设计',
  title:'平面设计 · 海报与调色',
  desc:'这一组是练手：把别人的版式拆开、把一张图的颜色拆开，再自己拼回去。四件东西分别练排版层级、撞色与抠图、调色判断和长图配色。点左侧按钮看大图。',
  shots:[
    {src:'assets/ps/poster-ten.jpg',label:'海报仿作',cap:'十分海报 · 蓝白渐变版式临摹',detail:'<p><strong>海报仿作——</strong>临摹一张讲稿封面：左侧把「十分」两个字放大成视觉锚点，右侧留白放招新海报本体，蓝白渐变打底、少量星点提亮。练的是字号层级和主次：一张图里只允许一个东西最大。</p>'},
    {src:'assets/ps/poster-rebel.jpg',label:'招生海报',cap:'招生海报 · 撞色大字报与抠图',detail:'<p><strong>招生海报——</strong>黄底墨绿撞色、巨字「招生！」压在座椅图上，下沿做撕纸边，橘猫是单独抠出来贴进去的。练撞色控制、图层蒙版边缘和抠图（毛发处保留一点杂边反而自然）。</p>'},
    {src:'assets/ps/color-card.jpg',label:'调色拆解',cap:'拆色卡 · 主色板与色相一致性',detail:'<p><strong>调色拆解——</strong>写了个脚本把一张图按区域采样 HSL、算阴影到高光的色相偏移、再出主色板，每天拆一张。练的是「看一张图能说出它偏什么色、哪块被单独推过」，而不是凭感觉拖滑块。</p>'},
    {src:'assets/ps/wallpaper.jpg',label:'壁纸',cap:'壁纸 · 长图配色练习',detail:'<p><strong>壁纸——</strong>把同一套配色搬到 16:10 的长图上，练大面积色块的过渡和留白，和小尺寸海报的取舍完全不同：越大的图越要敢空。</p>'},
  ],
  note:'四件都是练习作品，不是商单；版式参考了原作，调色参数和配色是自己重算的。'
});}
function portraitsCase(){
 const works=[['flower','持花人像','调色与修图'],['street','秋日街角 · 环卫工','纪实调色：压黄、冷灰、暗部提亮'],['cutout','人物抠图','背景分离与纯色背景成片']];
 return `<div class="dialog-content portrait-details"><div class="eyebrow">03 / 图像作品</div><h2 id="dialog-title">人像与纪实修图 · 修改前后对照</h2><p class="description">三组个人练习，左修改前、右修改后并排对照：人像两组、街头纪实一组。点击照片可在新窗口查看大图。</p>${works.map(([id,title,note],i)=>`<section class="portrait-section"><h3><span>0${i+1}</span> ${title}</h3><p class="note">${note}</p><div class="portrait-pair">${['before','after'].map((state)=>`<figure><a href="assets/portraits/${id}-${state}${id==='dress'&&state==='after'?'-v2':''}.jpg" target="_blank" rel="noopener" aria-label="查看${title}${state==='before'?'修改前':'修改后'}大图（新窗口）"><img src="assets/portraits/${id}-${state}${id==='dress'&&state==='after'?'-v2':''}.jpg" alt="${title} · ${state==='before'?'修改前':'修改后'}" loading="lazy"></a><figcaption>${state==='before'?'修改前':'修改后'}<span>查看大图 ↗</span></figcaption></figure>`).join('')}</div></section>`).join('')}</div>`;
}

/* 作品详情：分栏按钮交互（左=缩略按钮+当前模块说明，右=放大图；两作品统一风格） */
function splitCase(o){
  var tabs=o.shots.map(function(it,i){
    return '<button type="button" class="shot-btn'+(i===0?' is-active':'')+'" data-idx="'+i+'" data-full="'+it.src+'" data-cap="'+it.cap+'">'
      +'<img src="'+it.src+'" alt="'+(it.label||'')+'" loading="lazy">'
      +'<span class="shot-btn-label">'+(it.label||it.cap)+'</span>'
      +'</button>';
  }).join('');
  var details=o.shots.map(function(it,i){
    return '<div class="shot-detail'+(i===0?' is-show':'')+'" data-idx="'+i+'">'+it.detail+'</div>';
  }).join('');
  var first=o.shots[0];
  return '<div class="dialog-content work-split-wrap">'
    +'<div class="eyebrow">'+o.eyebrow+'</div>'
    +'<h2 id="dialog-title">'+o.title+'</h2>'
    +'<p class="description">'+o.desc+'</p>'
    +'<div class="work-split">'
      +'<div class="work-left">'
        +'<div class="shot-tabs">'+tabs+'</div>'
        +'<div class="work-includes"><h3>这一屏在讲什么</h3><div class="shot-detail-stack">'+details+'</div></div>'
      +'</div>'
      +'<div class="work-right"><figure class="shot-preview">'
        +'<img id="shot-preview-img" src="'+first.src+'" alt="'+(first.cap||'')+'">'
        +'<figcaption id="shot-preview-cap">'+(first.cap||'')+'</figcaption>'
      +'</figure></div>'
    +'</div>'
    +'<p class="note">'+o.note+'</p>'
  +'</div>';
}
function guideCase(){return splitCase({
  eyebrow:'01 / 信息产品',
  title:'升学指南 · 专升本信息服务站',
  desc:'把散在各处的升学信息收拢成四个能查的模块：专升本行情、投档线、报考资格流程，以及全国民办与国际学校的招生范围与对外名额。点左侧按钮，右边看大图、下面读这一屏在讲什么。',
  shots:[
    {src:'assets/guide-shot1.jpg',label:'行情数据',cap:'行情数据 · 三年趋势，报考涨、公办缩',detail:'<p><strong>行情数据——</strong>把 2024—2026 三年报考人数、招生计划、公办/民办占比做进一张趋势图，先看今年整体是变难还是变容易，再决定冲哪类学校。</p>'},
    {src:'assets/guide-shot3.jpg',label:'投档线查询',cap:'投档线查询 · 按年份/院校/专业筛选',detail:'<p><strong>投档线查询——</strong>按年份、院校、专业三维筛选，直接回答“我这个专业多少分能上”。表里含院校、专业、投档最低分，可按分数从高到低排序。</p>'},
    {src:'assets/guide-shot4.jpg',label:'资格与流程',cap:'资格与流程 · 视频按身份跳章节',detail:'<p><strong>资格与流程——</strong>六类考生身份（统考/校荐/自荐/建档立卡/退役士兵/大赛保送）逐条拆：能不能报、什么时候报、和谁一起录，并配视频按身份跳章节。</p>'},
    {src:'assets/guide-private.jpg',label:'民办校查询',cap:'民办校查询 · 省市区三级筛选，逐校看范围与名额',detail:'<p><strong>民办校查询——</strong>31 个省级行政区、289 条逐校记录：每所学校的小学／初中／高中分别写清“招生范围”和“对外招生名额”，可按省、市、区三级筛选，也能按学段只看有对外计划的学校。原文写明的跨区人数单独标出来，没公布的写“未单列”，不做估算。<a href="site/private.html" target="_blank" rel="noopener">打开查询页 ↗</a></p>'},
  ],
  note:'点击左侧任意按钮，右侧大图与下方说明会一起切换到对应模块；数据为静态，每年政策变动靠人工更新；专升本部分仅覆盖山东，民办校部分为全国 31 个省级行政区。'
});}
function policyCase(){
  var chs=POLICY_CHAPTERS.map(function(c,i){return '<button type="button" class="chapter-btn" data-t="'+c[1]+'"><span class="ct">'+c[0]+'</span><span class="cn">'+c[2]+'</span></button>';}).join('');
  return `<div class="dialog-content video-details">
  <div class="eyebrow">02 / 视频作品</div>
  <h2 id="dialog-title">招生政策 · 3 分钟像素讲解</h2>
  <p class="description">政策原文我整理过，信息是对的，但学生不看。于是设计虚拟形象「小书」，把六类考生的流程拍成像素风讲解片，按身份切章节，点哪段看哪段。</p>

  <section class="detail-section">
    <h3 class="section-tag">虚拟形象 · 小书</h3>
    <div class="char-block">
      <figure class="char-fig"><img src="assets/policy-frame1.jpg" alt="虚拟形象「小书」人物设定"></figure>
      <div class="char-text">
        <p>「小书」是这条讲解片的串场讲解员——一个像素风小人，负责把每一类考生的流程讲清楚。政策内容严肃又容易枯燥，用稳定的虚拟角色能把九段流程串成一条线，观众记住的是“小书讲的第几类”，而不是一堆零散的知识点。</p>
        <ul class="case-notes">
          <li><strong>统一画风：</strong>固定像素配色与造型，全片视觉一致，先把打开门槛降下来。</li>
          <li><strong>角色即线索：</strong>六类考生由同一个角色串讲，身份切换不跳戏。</li>
          <li><strong>讲出人味：</strong>把“政策条款”转成“小书跟你讲”，家长学生才听得进去。</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="detail-section">
    <h3 class="section-tag">流程介绍 · 怎么做出来的</h3>
    <ol class="process-steps">
      <li><em>01</em><div><b>角色设定</b>先定「小书」的像素造型与配色，定下全片视觉基调。</div></li>
      <li><em>02</em><div><b>分镜脚本</b>按六类考生身份拆成 9 个章节，一步只给一个信息点。</div></li>
      <li><em>03</em><div><b>视频生成</b>用 AI 首尾帧生成像素风成片，1280×720，含配音与字幕。</div></li>
    </ol>
    <div class="process-gallery">
      <figure><img src="assets/policy-frame1.jpg" alt="角色设定 · 小书"><figcaption>角色设定 · 小书</figcaption></figure>
      <figure><img src="assets/policy-frame2.jpg" alt="分镜脚本 · 9 章"><figcaption>分镜脚本 · 9 章</figcaption></figure>
      <figure><img src="assets/policy-frame3.jpg" alt="视频生成 · 成片"><figcaption>视频生成 · 成片</figcaption></figure>
    </div>
  </section>

  <section class="detail-section">
    <h3 class="section-tag">时间轴 · 跳到你关心的部分</h3>
    <figure class="video-player"><video id="policy-video" controls playsinline preload="metadata" poster="site/assets/eligibility-poster.jpg"><source src="site/assets/eligibility-2026-v9.mp4" type="video/mp4">当前浏览器不支持视频播放。</video></figure>
    <p class="note">1280×720 · 时长 03:20 · 完整配音与字幕</p>
    <div class="chapter-grid">`+chs+`</div>
    <p class="note">点击章节后，视频从对应位置播放；播放时右侧章节会高亮你正在看的那一段。</p>
  </section>


  <p class="note">边界：像素风降低门槛，但严肃政策仍需配文字版；3 分钟塞 9 个点偏密，真实场景应拆成 3 条短视频；未测完播率，章节跳转是解法但暂无数据验证。</p>
</div>`;
}
dialog.addEventListener('click',function(e){
  var btn=e.target.closest('.shot-btn');
  if(btn){
    var wrap=btn.closest('.work-split');
    if(!wrap)return;
    var idx=btn.dataset.idx;
    var img=wrap.querySelector('#shot-preview-img');
    var cap=wrap.querySelector('#shot-preview-cap');
    if(img){img.src=btn.dataset.full;img.alt=btn.dataset.cap||'';}
    if(cap){cap.textContent=btn.dataset.cap||'';}
    wrap.querySelectorAll('.shot-btn').forEach(function(b){b.classList.toggle('is-active',b===btn);});
    wrap.querySelectorAll('.shot-detail').forEach(function(d){d.classList.toggle('is-show',d.dataset.idx===idx);});
    return;
  }
});
/* 首页卡片：点模块按钮切换右侧“真实页面”截图（与弹窗按钮一致） */
document.querySelectorAll('.work-tab').forEach(function(tab){
  tab.addEventListener('click',function(){
    var row=tab.closest('.project-row');
    if(!row)return;
    var cover=row.querySelector('.protected-cover');
    if(cover){cover.src=tab.dataset.cover;cover.alt=tab.dataset.cap||'';}
    var cap=row.querySelector('.visual-caption');
    if(cap){cap.innerHTML=tab.textContent+'<span>↗</span>';}
    row.querySelectorAll('.work-tab').forEach(function(b){b.classList.toggle('is-active',b===tab);});
  });
});
