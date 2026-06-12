(function () {
  const canvas = document.getElementById("colorField");
  const context = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let frame = 0;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    width = canvas.width = Math.floor(window.innerWidth * ratio);
    height = canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
  }

  function draw() {
    const ratio = window.devicePixelRatio || 1;
    frame += 0.01;
    context.clearRect(0, 0, width, height);
    context.lineWidth = Math.max(1, ratio);

    for (let row = 0; row < 14; row += 1) {
      const y = (height / 15) * (row + 1);
      context.beginPath();
      for (let x = 0; x <= width; x += 20 * ratio) {
        const wave = Math.sin(x * 0.0034 + frame + row * 0.7) * 18 * ratio;
        const pulse = Math.cos(x * 0.0016 + frame * 2.4 + row) * 6 * ratio;
        if (x === 0) context.moveTo(x, y + wave + pulse);
        else context.lineTo(x, y + wave + pulse);
      }
      context.strokeStyle = row % 4 === 0
        ? "rgba(255, 54, 95, 0.2)"
        : row % 3 === 0
          ? "rgba(255, 209, 92, 0.18)"
          : "rgba(24, 230, 255, 0.14)";
      context.stroke();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}());
