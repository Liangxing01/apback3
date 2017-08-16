
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  /** 清除内外边距 **/
body, h1, h2, h3, h4, h5, h6, hr, p,blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea,
th, td, img{
     border:medium none;margin: 0;padding: 0;box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6 { font-size: 100%; }
input:focus , button:focus{ outline: none; }
em{font-style:normal;}
/** 重置列表元素 **/
ul, ol { list-style: none; }
/** 重置超链接元素 **/
a { text-decoration: none; color:#333;}
a:hover { text-decoration: none; }
a:visited{ text-decoration: none; }
/** 重置图片元素 **/
img{ border:0px;}
/** 重置表格元素 **/
table { border-collapse: collapse; border-spacing: 0; }
*{ box-sizing: border-box; }

</style>
