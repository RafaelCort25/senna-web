import { create } from 'zustand';

export const useOrbStore = create((set) => ({
  scale: 1,
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  energy: 0.35,
  color: '#c9a668',
  wireOpacity: 0.08,
  glowOpacity: 0.05,
  shape: 0.5,
  noiseScale: 1.6,
  mouseX: 0,
  mouseY: 0,

  setOrb: (partial) => set(partial),
  setMouseOffset: (x, y) => set({ mouseX: x, mouseY: y }),

  reset: () => set({
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    energy: 0.35,
    color: '#c9a668',
    wireOpacity: 0.08,
    glowOpacity: 0.05,
    shape: 0.5,
    noiseScale: 1.6,
    mouseX: 0,
    mouseY: 0,
  }),
}));
