export default function useLoader(loader) {
  return {
    open() {
      loader.classList.add('open')
    },

    close() {
      loader.classList.remove('open')
    }
  }
}