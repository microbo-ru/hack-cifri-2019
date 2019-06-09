var geoMap = 0;
ymaps.ready(function() {
  geoMap = new ymaps.Map('map', {
    center: [59.969718, 30.316536],
    type: "yandex#map",
    zoom: 10
  }, {
    geoObjectBalloonPanelMapMaxArea: Infinity
  });


  var depth = [],
    names = {};

  function buildAddr() {
    var d = $(".legend");
    d.html('');
    for (var i in depth) {
      (function(i) {

        var name = depth[i];
        // console.log(i, name)
        var oname = names[name] || name;

        var l = $("<a href='#'>" + oname + "</a>");
        l.click(function() {
          depth.length = i;
          load(name);
        });
        l.appendTo(d);
      })(i);
    }
  }

  var lastCollection = 0;

  function load(addr, callback) {
    osmeRegions.geoJSON(addr, {
      lang: 'ru'
    }, function(data) {

      var thisId = data.metaData.osmId;
      var list = [];
      for (var i in data.features) {
        var iso = '';
        if (data.features[i].properties.properties.iso3166) {
          iso = ' (' + data.features[i].properties.properties.iso3166 + ')';
        }
        // console.log(data.features[i]);
        list.push("<li>" + data.features[i].properties.name + iso + "</li>");
        if (data.features[i].properties.osmId == thisId) {
          names[addr] = data.features[i].properties.name;
        }
      }
      $(".regionList").html("<ul>" + list.join('') + "</ul>");

      depth.push(addr);
      buildAddr();

      var collection = osmeRegions.toYandex(data, ymaps);
      if (lastCollection) {
        lastCollection.remove(geoMap);
      }
      lastCollection = collection;
      collection.add(geoMap);

      geoMap.setBounds(collection.collection.getBounds(), {
        duration: 300
      });
      var strokeColors = [
        '#000',
        '#F0F',
        '#00F',
        '#0FF',
      ];
      var meta = data.metaData,
        // minLevel = meta.levels[0],
        maxLevel = meta.levels[1] + 1;

      collection.setStyles(function(object, yobject) {
        var level = object.properties.level;
        yobject.properties.set('balloonContent', "<div style=''>" + JSON.stringify(object.properties).split(',').join(", ") + "</div>");
        return ({
          zIndex: level,
          zIndexHover: level,
          strokeWidth: Math.max(1, level == 2 ? 2 : (maxLevel - level)),
          strokeColor: strokeColors[maxLevel - level] || '#000',
          fillColor: get_color(object),
          balloonPanelMaxMapArea: Infinity,
          balloonAutoPan: false,
          autoPanDuration: 5000,
          draggable: true
        });
      });

      collection.addEvent('dblclick', function(object, type, target) {
        var osmId = object.properties.osmId;
        event.preventDefault();
        if (osmId) {
          geoMap.setBounds(target.geometry.getBounds());
          setTimeout(function() {
            load('' + osmId);
          }, 1);
        }
      });
      if (callback) {
        callback();
      }
    });
  }

  load('RU-SPE');
  window.rload = load;

});