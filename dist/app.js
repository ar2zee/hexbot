function start_app () {
  draw();
};

const draw = () => {
  const arrayOfColors = [];
  for(let i = 0; i <= 200; i++){
    NOOPBOT_FETCH({
      API: 'hexbot',
      count: 1000
    }, (response) => {
      arrayOfColors.push(response)
      if(i === 200){
        drawSet(arrayOfColors)
      }
      return;
    });
  }
}

const drawSet = response => {
  const arrayOfColors  = [...new Set(response.map(color => color.colors).flat(2).map(el => el.value))];
  setInterval(() => {
    const dateObject = new Date();
    const randomColor = arrayOfColors[Math.floor(Math.random()*arrayOfColors.length)];
    document.title = `${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()} | ${randomColor}`;
    const timeString = `${dateObject.getHours()}<span class="blink_me">:</span>${dateObject.getMinutes()}<span class="blink_me">:</span>${dateObject.getSeconds()}`;
    document.querySelector('html').style.backgroundColor = randomColor;
    document.querySelector('#timer').innerHTML = timeString;
    document.querySelector('#timer').style.color = invertHex(randomColor);
    document.querySelector('#colorHex').innerHTML = randomColor;
    document.querySelector('#colorHex').style.color = invertHex(randomColor);
    document.querySelector('#colorHex').style.borderColor = invertHex(randomColor);
  }, 1000);
}

const invertHex = hex => {
  const removeHash = hex.split('').splice(1).join('')
  const result = (Number(`0x1${removeHash}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
  return `#${result}`;
}
