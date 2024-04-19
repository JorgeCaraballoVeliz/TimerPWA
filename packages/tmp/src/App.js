import "./index.css";
import { TimerPlayerComponent, TimerComponent, TimerPartComponent , soundComponent} from "@jorgeecaraballoveliz/components-library";
import fairySound from './fairy.mp3';


document.getElementById("app").innerHTML = `
<div class="container">
  <div>Name: tmp(temporizador)</div>
</div>
<div id="timer">
    <timer-player-component play-btn pause-btn reset-btn>
        <sound-component></sound-component>
        <timer-component start="1500"></timer-component>
    </timer-player-component>
    <button id="lokiyo">change</button>
</div>

`;

///funcion de modificar los segundos//se ubicará en host
const loko = document.getElementById("lokiyo");
loko.addEventListener("click", () => {
  console.log("wawi");

  const timer = document.querySelector("timer-component");
  timer.setAttribute("start", "2");
  const player = document.querySelector("timer-player-component");
  console.log(player);
  const shadow = player.shadowRoot;

 const resetbutton = shadow.querySelector(".timer-player-component__actions--reset");
 console.log(resetbutton);
 resetbutton.click();
  
  //player.removeAttribute("reset-btn");
  //.click()
  //console.log(shadow.lastChild);
})