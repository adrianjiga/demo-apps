document.addEventListener('DOMContentLoaded', () => {
  const colorInput = document.getElementById('colorInput');
  const addColorBtn = document.getElementById('addColor');
  const colorPalette = document.getElementById('colorPalette');

  addColorBtn.addEventListener('click', () => {
    const color = colorInput.value;
    addColorToPalette(color);
  });

  function addColorToPalette(color) {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.backgroundColor = color;
    swatch.title = color;

    swatch.addEventListener('click', () => {
      navigator.clipboard.writeText(color).then(() => {
        alert(`Color ${color} copied to clipboard!`);
      });
    });

    colorPalette.appendChild(swatch);
  }
});
