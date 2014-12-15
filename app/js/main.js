var ractive = new Ractive({
    el: 'container',
    template: '#template',
    data: {
        red: 245,
        green: 44,
        blue: 125,
        hex: '#f52c7d',
        class: 'light'
    }
});

ractive.observe('red green blue',  function() {
        ractive.set('hex', rgbToHex(ractive.get('red'),ractive.get('green'),ractive.get('blue')));
    checkLuminance(ractive.get('red'),ractive.get('green'),ractive.get('blue'));
    });

ractive.observe('hex', function(newValue, oldValue, keyPath) {
    if(newValue.length === 7) {
        var updated = hexToRgb(newValue);
        console.log(updated);
        ractive.set('red', updated.r);
        ractive.set('green', updated.g);
        ractive.set('blue', updated.b);
    }
});

