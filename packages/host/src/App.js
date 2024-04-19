import "./index.css";
import { TimerPlayerComponent, TimerComponent, TimerPartComponent , soundComponent} from "@jorgeecaraballoveliz/components-library";
import fairySound from './fairy.mp3';
import * as logo from './images/logo.png'


document.getElementById("app").innerHTML = `
<div class="container">
  <img src="${logo.default}" alt="Logo TimerPWA">
</div>
`;

///funcion de modificar los segundos//se ubicará en host
const loko = document.getElementById("save");
loko.addEventListener("click", () => {
  console.log("wawi");

  const newseconds = document.getElementById("newseconds");
  console.log(newseconds.value);

  const timer = document.querySelector("timer-component");
  timer.setAttribute("start", newseconds.value);
  const player = document.querySelector("timer-player-component");
  console.log(player);
  const shadow = player.shadowRoot;

 const resetbutton = shadow.querySelector(".timer-player-component__actions--reset");
 console.log(resetbutton);
 resetbutton.click();
  
})

//web worker
/*
const myWorker = new Worker(new URL('./worker.js', import.meta.url));
myWorker.onmessage = function(e) {
  console.log('worker said: ', e.data);
}
myWorker.postMessage('hi workiy, you have tuwork');
*/
//
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("./sw.js", { scope: '/'})
  .then(() => console.log('service worker registered'))
  .catch((err) => console.log("service worker not registerd", err));
}