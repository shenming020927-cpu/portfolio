(()=>{
'use strict';
const $=id=>document.getElementById(id);
function get(key){try{return localStorage.getItem(key)}catch{return null}}
function set(key,value){try{value===null?localStorage.removeItem(key):localStorage.setItem(key,value)}catch{}}
const themeKey='shengxue-theme',profileKey='shengxue-local-profile';
const saved=get(themeKey),system=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
function applyTheme(mode){document.documentElement.dataset.theme=mode;const dark=mode==='dark';$('themeControl').setAttribute('aria-pressed',String(dark));$('themeControl').setAttribute('aria-label',dark?'切换为日间模式':'切换为夜间模式');$('themeText').textContent=dark?'日间模式':'夜间模式'}
applyTheme(saved==='dark'||saved==='light'?saved:system);
$('themeControl').onclick=()=>{const mode=document.documentElement.dataset.theme==='dark'?'light':'dark';applyTheme(mode);set(themeKey,mode)};
let timer;function toast(text){$('siteToast').textContent=text;$('siteToast').hidden=false;clearTimeout(timer);timer=setTimeout(()=>{$('siteToast').hidden=true},3500)}
let name=get(profileKey)||'';function renderProfile(){$('loginText').textContent=name?name:'登录';$('profileTitle').textContent=name?'本地体验资料':'登录 · 本地体验';$('localNickname').value=name;$('logoutControl').hidden=!name;$('saveProfile').textContent=name?'保存昵称':'进入体验'}renderProfile();
$('loginControl').onclick=()=>{$('profileDialog').showModal();$('localNickname').focus()};
$('profileForm').onsubmit=e=>{e.preventDefault();if(!$('profileForm').reportValidity())return;name=$('localNickname').value.trim();if(!name){$('localNickname').setCustomValidity('请输入昵称');$('localNickname').reportValidity();return}set(profileKey,name);renderProfile();$('profileDialog').close();toast('已保存本地体验昵称')};
$('localNickname').oninput=()=>{$('localNickname').setCustomValidity('')};
$('logoutControl').onclick=()=>{name='';set(profileKey,null);renderProfile();$('profileDialog').close();toast('已退出本地体验')};
const local=location.protocol==='file:'||['localhost','127.0.0.1','::1','[::1]'].includes(location.hostname);
const publicURL=location.href;
$('shareControl').onclick=()=>{$('shareDialog').showModal();$('shareDescription').textContent=local?'当前网页在你的电脑上，尚未发布。别人无法通过本机路径访问。发布为公开网址后，这里就能分享链接；现在可以复制页面介绍。':'复制当前页面链接，或调用设备的系统分享菜单。';$('shareValue').value=local?'升学观察：行情数据、投档线查询、报考资格与流程。当前为本地演示，需由作者提供公开网址或完整网页文件夹。':publicURL;$('copyShare').textContent=local?'复制页面介绍':'复制链接';$('nativeShare').hidden=local||!navigator.share};
$('copyShare').onclick=async()=>{const field=$('shareValue');try{if(!navigator.clipboard?.writeText)throw Error('fallback');await navigator.clipboard.writeText(field.value);toast(local?'已复制页面介绍':'已复制链接')}catch{field.focus();field.select();let copied=false;try{copied=document.execCommand('copy')}catch{}toast(copied?'已复制':'请选中文字，按 ⌘C 或 Ctrl+C 复制')}};
$('nativeShare').onclick=async()=>{try{await navigator.share({title:document.title,url:publicURL})}catch(e){if(e.name!=='AbortError')toast('系统分享暂不可用，请复制链接')}};
document.querySelectorAll('[data-close-dialog]').forEach(b=>b.onclick=()=>$(b.dataset.closeDialog).close());
})();
