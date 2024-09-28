export default function useHeroImagesAnimate(heroBoards) {
  heroBoards.forEach((board) => {
    board.addEventListener('mouseenter', (e) => {
      if (board.classList.contains('flex-grow')) return;

      heroBoards.forEach(b => {
        b.classList.remove('flex-grow')
        hideText(b);
      });
      board.classList.add('flex-grow');
      revealText(board);
    });
  });
}