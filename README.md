# 不时不食

面向苏州人的全年时令食物时间轴。顺着月份与二十四节气上下浏览，查看本地食物的上市时间和最佳赏味期。

## 在线访问

[https://arrow36.github.io/bushibushi-suzhou/](https://arrow36.github.io/bushibushi-suzhou/)

## 主要体验

- 上下滚动、拖动整年时间轴，移动端支持触控操作
- 月份与节气共用一套纵向刻度
- 用浅色带表示上市期，深色带表示最佳赏味期
- 菜牌随时间轴浮现，并与对应食物的色带连接
- 点击左上角品牌或右下角圆形按钮，可回到当前时节

## 当前收录

冬笋、太湖白鱼、洞庭山碧螺春、马兰头、香椿、东山白沙枇杷、吴中杨梅、翠冠梨、鸡头米、鲜藕、红菱、阳澄湖大闸蟹、冬酿酒。

上市时间以苏州本地公开报道为参考；当年暂无可靠报道时，暂用常年节令数据。

## 本地开发

需要 Node.js 22.13.0 或更高版本。

    npm install
    npm run dev

验证正式构建：

    npm run build

## GitHub Pages

生成静态页面：

    npm run build:pages

推送到 main 分支后，.github/workflows/deploy-pages.yml 会自动构建并发布 GitHub Pages。

## 目录说明

- app/：页面组件、食物数据与视觉样式
- public/：手绘食物插画与站点图标
- github-pages/：静态站点入口
- .github/workflows/：GitHub Pages 自动部署配置
