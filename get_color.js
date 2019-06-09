var heatmap = {}
$.getJSON("heatmap.json", function(json) {
  heatmap = json;
});

var get_color = function(t) {
  var key = t.properties.name;
  print(key);
  if (key in heatmap) {
    return heatmap[key];
  } else {
    if ("default" in heatmap) {
      return heatmap["default"];
    } else {
      return "#FFF";
    }
  }
};