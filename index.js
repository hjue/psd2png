var PSD = require('psd');
var file = process.argv[2] ;
var start = new Date();

if (!file)
{
  console.log('Usage: psd2png psdfile');
  process.exit();

}

var fs = require('fs');

var text = '';
if(!fs.existsSync('./output')){
  fs.mkdirSync('./output');
}

PSD.open(file).then(function (psd) {
  var type, fonts = [];
  psd.tree().descendants().forEach(function (node) {
    if (node.isGroup()) return true;
    node.saveAsPng("./output/" + node.name + ".png").catch(function (err) {
      console.log(err.stack);
    });
    type = node.get('typeTool');
    if (!type) return;
    if(type.textValue.length>6){
      text += type.textValue + "\n";
    }
  });
  fs.writeFileSync("./output/text.txt",text)
  console.log("Finished!");
});

