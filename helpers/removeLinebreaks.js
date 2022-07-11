function removeLinebreaks(str) {
  return str.replace(/[\r\n]+/gm, "");
}

export { removeLinebreaks };
