
function start_app () {
    draw();
};

async function draw ()  {
    await  NOOPBOT_FETCH({
      API: 'hexbot',
      count: 1000
    }, drawSet);
  }

  function drawSet (response) {
      const arrayOfClors  = response.colors.map(el => el.value);
      document.querySelector('#timer').innerHTML = 'Loading...';
      setInterval(() => {
        const dateObject = new Date();
        const randomColor = arrayOfClors[Math.floor(Math.random()*arrayOfClors.length)];
        const timeString = `${dateObject.getHours()}<span class="blink_me">:</span>${dateObject.getMinutes()}<span class="blink_me">:</span>${dateObject.getSeconds()}`;
        document.querySelector('html').style.backgroundColor = randomColor;
        document.querySelector('#colorHex').innerHTML = randomColor;
        document.querySelector('#timer').innerHTML = timeString;
        document.title = `🤖 ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()} | ${randomColor} 🤖`;
        document.querySelector('#timer').style.color = invertHex(randomColor);
        document.querySelector('#colorHex').style.color = invertHex(randomColor);
        document.querySelector('#colorHex').style.borderColor = invertHex(randomColor);
      }, 1000);
  }

  function invertHex(hex) {
    const removeHash = hex.split('').splice(1).join('')
    const result = (Number(`0x1${removeHash}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
    return `#${result}`;
  }
