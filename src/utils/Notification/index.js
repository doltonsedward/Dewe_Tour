const playNotif = (url) => {
  const audio = new Audio(url);
  audio.play();
};

export { playNotif };
