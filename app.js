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
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{lastTrigger=button;const _p=button.dataset.project;if(_p==='poster'){body.innerHTML=posterCase();dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';return;}if(_p==='psbasic'){body.innerHTML=psbasicCase();dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';return;}if(_p==='portraits'){body.innerHTML=portraitsCase();dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';return;}if(_p==='aivideo'){body.innerHTML=aivideoCase();dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';return;}if(_p==='guide'){body.innerHTML=guideCase();dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';return;}if(_p==='policy'){body.innerHTML=policyCase();bindPolicy();dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';return;}if(_p==='video'){body.innerHTML=videoCase();dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';return;}body.innerHTML=excelCase();body.querySelector("#preview-zoom").addEventListener("click",e=>{const zoom=body.querySelector(".preview-scroll").classList.toggle("is-zoom");e.currentTarget.setAttribute("aria-pressed",String(zoom));e.currentTarget.textContent=zoom?"恢复适应宽度":"放大查看";});body.querySelectorAll("[data-sheet]").forEach(tab=>tab.addEventListener("click",()=>{body.querySelectorAll("[data-sheet]").forEach(b=>b.setAttribute("aria-pressed",String(b===tab)));const img=body.querySelector("#sheet-preview");img.src="assets/excel/latest-"+tab.dataset.sheet+".jpg";img.alt=tab.textContent+"：模拟数据水印预览";body.querySelector("#sheet-caption").textContent=tab.textContent+" · 模拟数据展示";}));dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';}));


var POLICY_CHAPTERS=[["00:01",1,"统考科目"],["00:16",16,"校荐生"],["00:48",48,"自荐生"],["01:08",68,"建档立卡"],["01:34",94,"退役士兵"],["02:10",130,"大赛保送"],["02:39",159,"共同时间"],["02:55",175,"最后提醒"],["03:08",188,"3+2 转段"]];

function bindPolicy(){var v=document.querySelector('#policy-video');if(!v)return;document.querySelectorAll('.chapter-btn').forEach(function(b){b.addEventListener('click',function(){v.currentTime=parseFloat(b.dataset.t)||0;v.play();});});v.addEventListener('timeupdate',function(){var t=v.currentTime;var els=document.querySelectorAll('.chapter-btn');var cur=0;POLICY_CHAPTERS.forEach(function(c,i){if(t>=c[1])cur=i;});els.forEach(function(x,i){x.classList.toggle('on',i===cur);});});}

function posterCase(){return splitCase({
  eyebrow:'01 / 平面设计',
  title:'招生简章 · 三折页',
  desc:'给学校做的一张招生简章：绿色主色压住版面，建筑照片托出真实校园，三个信息区只回答家长最关心的三件事——拿过什么奖、教什么课、往哪升学。成品按印刷厂要求做成 A4 三折：210×285mm、出血 3mm、300dpi、CMYK。',
  shots:[
    {src:'assets/poster/cover.jpg',label:'成品 · 正面',cap:'招生简章 · 印刷成品（A4）',detail:'<p><strong>成品——</strong>上半幅用建筑照片做视觉锚点，绿色色块从折线处切进来，压住下半部的信息区；标题「招生简章 / Admission Brochure」居中，校徽落在左上角。三个板块（奖项荣誉 / 特色课程 / 多语言教育）左侧排文字、右侧配图片证据，底部三枚六边形标签收「小班辅导 / 封闭管理 / 多元升学」。</p>'},
    {src:'assets/poster/print-setup.jpg',label:'印刷设置',cap:'PS 三折页画布 · 210×285mm / 出血 3mm / 300dpi',detail:'<p><strong>印刷设置——</strong>按印刷厂要求建画布：A4 印刷版三折 210×285mm、出血 3mm、300dpi，勾选 CMYK 文档，正反两份分开生成。折页和单页不一样：折线两侧的内容要错开排，不然折完会切到字。</p>'}
  ],
  note:'源文件为分层 PSD 和印刷 PDF（约 36MB），需要可以单独发。这里展示的是印刷导出的单页预览；三折页的外面 / 里面如需要可再补。版式、配色、图片处理都是自己做的；校名、地址、电话为示例信息。'
});}

function aivideoCase(){return splitCase({
  eyebrow:'03 / AI 视频',
  title:'AI 短剧《下一页》',
  desc:'14 秒的图书馆夜戏。真正决定成片的不是模型，是提示词工程：先用分镜草图和白模把构图、走位、光位定死，再把参考帧、风格和动作时序拆成结构化提示词，交给即梦一段段生成。',
  shots:[
    {src:'assets/aivideo/cover.jpg',label:'封面',cap:'《下一页》· 图书馆闭馆前',detail:'<p><strong>封面——</strong>一张桌子两端：穿灰卫衣的女生伸手，穿黑开衫的女生坐着抬头，两个人在同一盏灯下。画面按取景器做：时间码、ISO、焦段都是印上去的，提示这是一段拍出来的戏。</p>'},
    {src:'assets/aivideo/prompt-engineering.jpg',label:'提示词工程',cap:'即梦 · 分镜提示词工程（14 秒照片序列，21:9 实拍段）',detail:'<p><strong>提示词工程——</strong>9 张分镜参考帧按镜头顺序排成序列，提示词分三层写：①整体节奏与风格（黑边、取景框 HUD、快门声、白闪）；②以「01_到场」作实拍段最后一帧，保证动作接得上；③每段的时间码、画幅和人物姿态（0–2.5 秒 21:9 实拍、两人第一帧即对视、手扶椅背不再走动）。输出画布固定 16:9，不跟着参考帧漂移。</p>'},
    {src:'assets/aivideo/previs-3.jpg',label:'白模预演',cap:'白模预演 · 先把走位和光位定死',detail:'<p><strong>白模预演——</strong>生成之前先用灰模摆一遍：人物站位、身体朝向、镜头高度、桌上道具的位置都先确定。白模不追求好看，只负责在上模型之前把「构图对不对、动作接不接得上」这两件事解决掉。</p>'}
  ],
  note:'流程：分镜草图 → 3D 白模预演 → 灯光测试 → 结构化提示词 → 即梦生成 → 拼接调色。成片在即梦画布里继续生成：<a href="https://jimeng.jianying.com/ai-tool/ai-canvas/c6905d03-5df5-4c78-b2ba-a87f8e90dc7c" target="_blank" rel="noopener">在即梦打开项目画布 ↗</a>（需登录即梦账号）'
});}

function psbasicCase(){return splitCase({
  eyebrow:'03 / 平面设计',
  title:'平面设计 · 招生海报',
  desc:'这张是给招生场景做的落地稿：黄底墨绿撞色、巨字压在座椅图上，下沿撕纸边，猫是单独抠出来贴进去的。练的是撞色控制、蒙版边缘和抠图。其余几张练习收在下面的相册里。',
  shots:[
    {src:'assets/ps/poster-rebel.jpg',label:'招生海报',cap:'招生海报 · 撞色大字报与抠图',detail:'<p><strong>招生海报——</strong>黄底墨绿撞色、巨字「招生！」压在座椅图上，下沿做撕纸边，橘猫是单独抠出来贴进去的。练撞色控制、图层蒙版边缘和抠图（毛发处保留一点杂边反而自然）。</p>'},
  ],
  albumFit:'contain',
  album:[
    {src:'assets/ps/poster-ten.jpg',cap:'海报仿作 · 蓝白渐变版式临摹'},
    {src:'assets/ps/color-card.jpg',cap:'调色拆解 · 主色板与色相一致性'},
    {src:'assets/ps/wallpaper.jpg',cap:'壁纸 · 长图配色练习'},
  ],
  note:'主图是招生落地稿，相册里是练习作品；版式参考了原作，调色参数和配色是自己重算的。'
});}
function portraitsCase(){
 const pair=(id)=>{
   const f=(state)=>`<figure><a href="assets/portraits/${id}-${state}.jpg" target="_blank" rel="noopener" aria-label="查看大图（新窗口）"><img src="assets/portraits/${id}-${state}.jpg" alt="${id} · ${state==='before'?'修改前':'修改后'}" loading="lazy"></a><figcaption>${state==='before'?'修改前':'修改后'}<span>查看大图 ↗</span></figcaption></figure>`;
   return `<div class="portrait-pair">${f('before')}${f('after')}</div>`;
 };
 return `<div class="dialog-content portrait-details"><div class="eyebrow">03 / 图像作品</div><h2 id="dialog-title">人像与纪实修图 · 修改前后对照</h2><p class="description">三组都是同一张图的修改前后对照，左修改前、右修改后，点照片可看大图。看调色方向、皮肤处理、背景分离各自把原片推到了哪里。</p>
  <section class="portrait-section"><h3><span>01</span> 持花人像</h3><p class="note">人像调色与修图：肤色提亮、暗部压住、整体偏暖</p>${pair('flower')}</section>
  <section class="portrait-section"><h3><span>02</span> 秋日街角 · 环卫工</h3><p class="note">纪实调色：压黄、冷灰、暗部提亮</p>${pair('street')}</section>
  <section class="portrait-section"><h3><span>03</span> 人物抠图</h3><p class="note">背景分离：横构图原片到竖版纯色背景成片</p>${pair('cutout')}</section>
  </div>`;
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
        +'<a id="shot-preview-link" href="'+first.src+'" target="_blank" rel="noopener" aria-label="查看大图（新窗口）">'
        +'<img id="shot-preview-img" src="'+first.src+'" alt="'+(first.cap||'')+'"></a>'
        +'<figcaption id="shot-preview-cap">'+(first.cap||'')+'</figcaption>'
      +'</figure></div>'
    +'</div>'
    +(o.album&&o.album.length?('<div class="album"><h3>相册 · 其他练习</h3><div class="album-grid'+(o.albumFit==='contain'?' is-contain':'')+'">'+o.album.map(function(a){return '<figure><a href="'+a.src+'" target="_blank" rel="noopener" aria-label="查看大图（新窗口）"><img src="'+a.src+'" alt="'+a.cap+'" loading="lazy"></a><figcaption>'+a.cap+'</figcaption></figure>';}).join('')+'</div></div>'):'')
    +'<p class="note">'+o.note+'</p>'
  +'</div>';
}
function guideCase(){return splitCase({
  eyebrow:'01 / 信息产品',
  title:'升学指南 · 专升本信息服务站',
  desc:'把散在各处的升学信息收拢成三个能查的模块：民办校查询（小学 / 初中 / 高中）、专升本行情数据、专升本投档线查询。点左侧按钮，右边看大图、下面读这一屏在讲什么。',
  shots:[
    {src:'assets/guide-private.jpg',label:'民办校查询 · 小初高',cap:'民办校查询 · 小初高 · 省市区三级筛选，逐校看范围与名额',detail:'<p><strong>民办校查询 · 小学 / 初中 / 高中——</strong>31 个省级行政区、289 条逐校记录：每所学校的小学／初中／高中分别写清“招生范围”和“对外招生名额”，可按省、市、区三级筛选，也能按学段只看有对外计划的学校。原文写明的跨区人数单独标出来，没公布的写“未单列”，不做估算。<a href="site/private.html" target="_blank" rel="noopener">打开查询页 ↗</a></p>'},
    {src:'assets/guide-shot1.jpg',label:'行情数据 · 专升本',cap:'行情数据 · 专升本 · 三年趋势，报考涨、公办缩',detail:'<p><strong>行情数据 · 专升本——</strong>把 2024—2026 三年报考人数、招生计划、公办/民办占比做进一张趋势图，先看今年整体是变难还是变容易，再决定冲哪类学校。</p>'},
    {src:'assets/guide-shot3.jpg',label:'投档线查询 · 专升本',cap:'投档线查询 · 专升本 · 按年份/院校/专业筛选',detail:'<p><strong>投档线查询 · 专升本——</strong>按年份、院校、专业三维筛选，直接回答“我这个专业多少分能上”。表里含院校、专业、投档最低分，可按分数从高到低排序。</p>'},
  ],
  note:'点击左侧任意按钮，右侧大图与下方说明会一起切换到对应模块；数据为静态，每年政策变动靠人工更新；专升本部分仅覆盖山东，民办校部分为全国 31 个省级行政区。'
});}
function policyCase(){
  return `<div class="dialog-content video-details">
  <div class="eyebrow">02 / 视频作品</div>
  <h2 id="dialog-title">招生政策 · 3 分钟像素讲解</h2>
  <p class="description">政策原文我整理过，信息是对的，但学生不看。于是设计虚拟形象「小书」，把六类考生的流程拍成像素风讲解片，按身份切章节。</p>

  <figure class="video-cover"><img src="site/assets/eligibility-poster.jpg" alt="招生政策像素讲解片封面：小书与六类考生章节"><figcaption>成片封面 · 1280×720 · 时长 03:20</figcaption></figure>

  <section class="detail-section">
    <h3 class="section-tag">虚拟形象 · 小书</h3>
    <div class="char-block">
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
  </section>


  <p class="note">边界：像素风降低门槛，但严肃政策仍需配文字版；3 分钟塞 9 个点偏密，真实场景应拆成 3 条短视频；未测完播率，章节跳转是解法但暂无数据验证；这里只放封面，成片与分镜不再铺开。</p>
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
    if(img){img.src=btn.dataset.full;img.alt=btn.dataset.cap||'';
      var link=wrap.querySelector('#shot-preview-link');if(link)link.href=btn.dataset.full;}
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
    if(tab.dataset.before||tab.dataset.after){
      var cb=row.querySelector('.cover-before'),ca=row.querySelector('.cover-after');
      if(cb&&tab.dataset.before){cb.src=tab.dataset.before;cb.alt=(tab.dataset.cap||'')+' · 修改前';}
      if(ca&&tab.dataset.after){ca.src=tab.dataset.after;ca.alt=(tab.dataset.cap||'')+' · 修改后';}
    }else{
      var cover=row.querySelector('.protected-cover');
      if(cover){cover.src=tab.dataset.cover;cover.alt=tab.dataset.cap||'';}
    }
    var cap=row.querySelector('.visual-caption');
    if(cap){cap.innerHTML=(tab.dataset.cap||tab.textContent)+'<span>↗</span>';}
    row.querySelectorAll('.work-tab').forEach(function(b){b.classList.toggle('is-active',b===tab);});
  });
});
