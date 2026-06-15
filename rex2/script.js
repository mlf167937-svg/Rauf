console.log("REX2 romance mode active");

// simple effect biar hidup
setInterval(() => {
    document.body.style.filter = 
        "hue-rotate(" + Math.random()*360 + "deg)";
}, 5000);
