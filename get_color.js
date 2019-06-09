var heatmap = {}
// $.getJSON("7705598840-woodvolume_map.json", function(json) {
//   heatmap = json;
// });

function load_heat_map(filename) {
  $.getJSON(filename, function(json) {
    heatmap = json;
  });
}

var get_color = function(t) {
  var key = t.properties.name;
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