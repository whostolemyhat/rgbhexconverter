const colour = require('./colour');
const Ractive = require('./vendor/ractive');

const ractive = new Ractive({
    el: 'container',
    template: '#template',
    data: {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255),
        class: 'light'
    }
});

ractive.observe('red green blue',  () => {
    ractive.set('hex', colour.rgbToHex(
        ractive.get('red'),
        ractive.get('green'),
        ractive.get('blue')
    ));
    const luminance = colour.checkLuminance(
        ractive.get('red'),
        ractive.get('green'),
        ractive.get('blue')
    );
    ractive.set('class', luminance);
});

// new, old, keyPath
ractive.observe('hex', newValue => {
    try {
        const updated = colour.hexToRgb(newValue);
        ractive.set('red', updated.r);
        ractive.set('green', updated.g);
        ractive.set('blue', updated.b);
    } catch(ignore) {
        console.log('That\'s not a valid hex!');
    }
});

