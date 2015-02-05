var ractive = new Ractive({
    el: 'container',
    template: '#template',
    data: {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255),
        class: 'light'
    }
});

ractive.observe('red green blue',  function() {
        ractive.set('hex', rgbToHex(ractive.get('red'),ractive.get('green'),ractive.get('blue')));
    checkLuminance(ractive.get('red'),ractive.get('green'),ractive.get('blue'));
});

ractive.observe('hex', function(newValue, oldValue, keyPath) {
    try {
        var updated = hexToRgb(newValue);
        ractive.set('red', updated.r);
        ractive.set('green', updated.g);
        ractive.set('blue', updated.b);
    } catch(ignore) {
        console.log('That\'s not a valid hex!');
    }
});

