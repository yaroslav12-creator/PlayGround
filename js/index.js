const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

ctx.strokeStyle = 'black';
ctx.lineWidth = 3;
ctx.shadowOffsetX = 4;
ctx.shadowOffsetY = 4;
ctx.shadowBlur = 10;
ctx.shadowColor = 'black';
// ctx.globalCompositeOperation = 'difference';
let hue = 0;
let drawing = false;

function drawShape(x, y, radius, inset, n) {
    ctx.fillStyle = 'hsl(' + hue +', 100%,50%)';
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    ctx.moveTo(0, 0 - radius);

    for(let i = 0; i < n; i++) {
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - (radius * inset));
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - radius);  
    }

    ctx.restore();
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
const radius = 100;
const inset = 0.5
const n = 6;
let angle = 0;
let rotationCnterPoint = 0;
drawShape(100, 100, radius, inset, n);

window.addEventListener('mousemove', (e) => {
    if(drawing) {
        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.rotate(angle);
        hue+=2;
        angle += 0.2;
        drawShape(rotationCnterPoint, rotationCnterPoint, radius, inset, n);     
        ctx.restore();
    }
});
window.addEventListener('mousedown', (e) => {
    drawing = true;
});

window.addEventListener('mouseup', (e) => {
    drawing = false;
});