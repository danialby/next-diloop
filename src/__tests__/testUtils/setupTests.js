globalThis.ResizeObserver = class {
  observe() { }
  unobserve() { }
  disconnect() { }
}

if (!document.elementFromPoint) {
  document.elementFromPoint = () => null
}
