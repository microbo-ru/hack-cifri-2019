var get_color = function(t) {
  // console.log(t.properties.name);
  if (t.properties.name === 'Кировский район') {
    return '#44BB22';
  } else if (t.properties.name === 'Красносельский район') {
    return '#440000';
  } else {
    return '#FFE2';
  }
};