var EventEmitter = require('events').EventEmitter;

module.exports = function (slides) {
    return new Swoop(slides || {});
};

function Swoop (slides) {
    var self = this;
    self.slides = {};
    self.history = [];
    self.element = document.createElement('div');
    
    Object.keys(slides).forEach(function (name) {
        self.addSlide(name, slides[name]);
    });
}

Swoop.prototype = new EventEmitter;

Swoop.prototype.addSlide = function (name, element) {
    this.slides[name] = element;
    css(element, 'display', 'none');
    this.scan(element);
    this.element.appendChild(element);
};

Swoop.prototype.scan = function (element) {
    var self = this;
    var links = element.querySelectorAll('.link');
    if (element.className === 'link'
    || (typeof element.hasClass === 'function' && element.hasClass('link'))) {
        wrap(element);
    }
    
    for (var i = 0; i < links.length; i++) wrap(links[i]);
    
    function wrap (link) {
        link.addEventListener('click', function (ev) {
            var href = link.getAttribute('href');
            if (!href) return;
            
            if (ev && typeof ev.preventDefault === 'function') {
                ev.preventDefault();
            }
            var name = href.replace(/^#/, '');
            if (name === '_back') {
                self.back();
            }
            else self.show(name)
        });
    }
};

Swoop.prototype.show = function (name) {
    var self = this;
    var slide = self.slides[name];
    if (!slide) return undefined;
    
    var prev = self.active;
    var useDefault = true;
    
    self.preventDefault = function () { useDefault = false };
    self.emit('show', name, prev);
    self.preventDefault = function () {};
    
    if (useDefault) {
        css(slide, 'display', 'block');
        if (prev && prev !== name) {
            css(self.slides[prev], 'display', 'none');
        }
    }
    
    if (prev === self.active && self.active !== name) {
        self.active = name;
        self.history.push(name);
    }
    
    return slide;
};

Swoop.prototype.back = function () {
    var self = this;
    self.history.pop(); // present slide
    var name = self.history.pop(); // previous slide
    return self.show(name);
};

Swoop.prototype.appendTo = function (e) {
    e.appendChild(this.element);
};

Swoop.prototype.size = function (w, h) {
    css(this.element, 'width', w);
    css(this.element, 'height', h);
};

function css (elem, name, value) {
    if (!elem.style) elem.style = {};
    elem.style[name] = value;
}
