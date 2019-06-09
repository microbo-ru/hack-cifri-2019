var heatmap = {}
$.getJSON("heatmap.json", function(json) {
  heatmap = json;
    // console.log(json); 
});

var get_color = function(t) {
  var key = t.properties.name;
  if (key in heatmap) {
    return heatmap[key];
  } else {
    if ("default" in heatmap) {
      return heatmap["default"];
    } else {
      return '#FFE2';
    }
  }
  // console.log(t.properties.name);
  // if (t.properties.name === 'Кировский район') {
  //   return '#44BB22';
  // } else if (t.properties.name === 'Красносельский район') {
  //   return '#440000';
  // } else {
  //   return '#FFE2';
  // }
};