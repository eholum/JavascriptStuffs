function Rectangles(canvas, ctx) {
    canvas: canvas;
    ctx: ctx;

    var rects = [];
    
    // Privileged methods
    this.clearAll = function() {
        clear();
        rects = [];
    };
    
    this.add = function() {
        var x = getRandomInt(0, canvas.width);
        var y = getRandomInt(0, canvas.height);
        var width = getRandomInt(25, 50);
        var height = getRandomInt(25, 50);
        var color = generateRandomFill();

        var rect = [ x, y, width, height, color ];
        rects.push(rect);

        drawAll();
    };
    
    this.remove = function() {
        rects.pop();
        drawAll();
    };
    
    // Private methods
    var clear = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    
    var drawAll = function() {
        clear();
        for (var i=0; i<rects.length - 1; i++) {
            drawRect(rects[i]);
            connect(rects[i], rects[i+1], 1, "");
        };
        drawRect(rects[rects.length-1]);
    };

    var drawRect = function(r) {
        ctx.fillStyle = r[4];
        ctx.fillRect(r[0], r[1], r[2], r[3]);
    };

    var connect = function(r, q, weight, style) {
        ctx.strokeStyle = style;
        ctx.lineWidth = weight;
        ctx.beginPath();
        ctx.lineTo(r[0] + r[2] / 2, r[1] + r[3] / 2);
        ctx.lineTo(q[0] + q[2] / 2, q[1] + q[3] / 2);
        ctx.stroke();
    };

    var generateRandomFill = function() {
        var str = 'rgba(' + getRandomInt(0, 255) + ',' + getRandomInt(0, 255)
                + ',' + getRandomInt(0, 255) + ',' + Math.random() + ')';

        return str;
    };

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    
    return this;
};


$(document).ready(function() {
    scanvas = $('#shapes')[0];
    rctx = scanvas.getContext("2d");
    rctx.canvas.width  = window.innerWidth;
    rctx.canvas.height = window.innerHeight;
    rectangles = new Rectangles(scanvas, rctx);
    
    $('#add').click(function() {
        rectangles.add();
    });
    
    $('#remove').click(function() {
        rectangles.remove();
    });
    
    $('#clear').click(function() {
        rectangles.clearAll();
    });
});