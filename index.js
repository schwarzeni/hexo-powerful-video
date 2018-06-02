const fs = require('fs');
const path = require('path');

hexo.extend.tag.register('video', function(args, content) {
  if (args[0] === null) {
    console.error('>>>>>>>错误：请填写视频的名');
    throw new Error('缺少视频名')
  }

  if (hexo.config['plry'] == null ||
      hexo.config['plry']['js'] == null ||
      hexo.config['plry']['css'] == null) {
        console.error('>>>>>>>错误：请填写plry的js,css,svg文件路径，官网：https://plyr.io/');
        throw new Error('缺少plry的js,css,svg路径')
      }

  var jsPath = hexo.config['plry']['js'];
  var cssPath = hexo.config['plry']['css'];
  var svgPath = hexo.config['plry']['svg'];
  var filename = args[0]

  createDir()

  var insertHtml = `

  <div id="video_wrapper" class="container">
  </div>
  <script src="/hexo-powerful-video/util.js"></script>
  <script>
    var p = new PowerfulVideo('video_wrapper')
    p.init({filename: '${filename}'}, {'iconUrl': '${svgPath}'})
  </script>

  <link rel="stylesheet" href="${cssPath}">
  <script src="${jsPath}"></script>
  <script>
  	p.initPlyr('#player');
  </script>`
  return insertHtml
}, {ends: true})

function createDir() {
  const source_dir = hexo.source_dir;
  const thirdpartyjsDirPath = path.join(source_dir, 'hexo-powerful-video')
  const thirdpartyjsPath = path.join(source_dir, 'hexo-powerful-video', 'util.js')

  if (!fs.existsSync(thirdpartyjsDirPath)) {
    fs.mkdirSync(thirdpartyjsDirPath)
  }
  if (fs.existsSync(thirdpartyjsPath)) {
    fs.unlinkSync(thirdpartyjsPath)
  }
  fs.copyFileSync(
    path.join(__dirname, 'util.js'),
    thirdpartyjsPath
  )
}
