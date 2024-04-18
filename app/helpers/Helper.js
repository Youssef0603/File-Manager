
export function fontHandler(oldFont) {
  let newFont = oldFont;
    if (oldFont == 'Skew-Medium') {
      newFont = 'Karla-Medium';
    }
    if (oldFont == 'Skew-Regular') {
      newFont = 'Karla-Regular';
    }
    if (oldFont == 'Skew-Bold') {
      newFont = 'Karla-Bold';
  }
  return newFont;
}
