const stage = document.getElementById('fogStage');
const load = async () => {
  try {
    const {initFogScene} = await import('./fog-scene.bundle.js?v=20260910c');
    initFogScene(stage);
  } catch (error) {
    console.warn('3D preview unavailable:', error.message);
    document.getElementById('fogLoadStatus').textContent = 'تصفّح صور الأعمدة وتفاصيلها في قسم المنتجات.';
    document.getElementById('fogFallback').hidden = false;
    document.getElementById('fogControls').hidden = true;
    document.getElementById('fogHint').hidden = true;
    stage.querySelector('canvas')?.remove();
  }
};
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    if(entries.some(entry => entry.isIntersecting)) { observer.disconnect(); load(); }
  }, {rootMargin:'160px'});
  observer.observe(stage);
} else load();
