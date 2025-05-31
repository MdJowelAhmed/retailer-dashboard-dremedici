export const getImageUrl = (path) => {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  } else {
const baseUrl = "https://api.elmagocigarsapp.com";
// const baseUrl = "https://rakibur5003.binarybards.online";
    return `${baseUrl}/${path}`;
  }
};
