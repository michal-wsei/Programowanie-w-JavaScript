import "./styles.css";

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return null;
  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
  setTimeout(function () {
    key.classList.remove("playing");
  }, 100);
}

window.addEventListener("keydown", playSound);

const recordedSounds = {
  "1": null,
  "2": null,
  "3": null,
  "4": null
};

function recordSound(channel) {
  const fn = (e) => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    recordedSounds[channel] = audio;
  };

  window.addEventListener("keydown", fn);

  setTimeout(() => {
    window.removeEventListener("keydown", fn);
    console.log("recordedSounds", recordedSounds);
  }, 2000);
}

function playChannel(channel) {
  if (recordedSounds[channel] === null) {
    window.alert("no record");
    return;
  }

  recordedSounds[channel].play();
}

document.querySelector("#channel1").addEventListener("click", () => {
  recordSound(1);
});
document.querySelector("#channel2").addEventListener("click", () => {
  recordSound(2);
});
document.querySelector("#channel3").addEventListener("click", () => {
  recordSound(3);
});
document.querySelector("#channel4").addEventListener("click", () => {
  recordSound(4);
});

document.querySelector("#playchannel1").addEventListener("click", () => {
  playChannel(1);
});
document.querySelector("#playchannel2").addEventListener("click", () => {
  playChannel(2);
});
document.querySelector("#playchannel3").addEventListener("click", () => {
  playChannel(3);
});
document.querySelector("#playchannel4").addEventListener("click", () => {
  playChannel(4);
});

document.querySelector("#playall").addEventListener("click", () => {
  recordedSounds[1]?.play();
  recordedSounds[2]?.play();
  recordedSounds[3]?.play();
  recordedSounds[4]?.play();
});
