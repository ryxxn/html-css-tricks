document.addEventListener('DOMContentLoaded', function () {
  initPiano();
});

function initPiano() {
  const pianoKeys = document.querySelectorAll('.key');
  const audioElements = {};
  const keyStates = {};

  setUpKeys(pianoKeys, audioElements, keyStates);
  setUpKeyboardEvents(audioElements, keyStates);
}

function setUpKeys(pianoKeys, audioElements, keyStates) {
  pianoKeys.forEach((key) => {
    const note = key.dataset.note;
    audioElements[note] = new Audio(`mp3/${note}.mp3`);

    key.addEventListener('mousedown', () => handleMouseDown(note, keyStates, audioElements));
    key.addEventListener('mouseup', () => handleMouseUp(note, keyStates));
    key.addEventListener('mouseleave', () => handleMouseLeave(note, keyStates));
  });
}

function handleMouseDown(note, keyStates, audioElements) {
  if (!keyStates[note]) {
    keyStates[note] = true;
    updateKeyState(note, true);
    playSound(note, audioElements);
  }
}

function handleMouseUp(note, keyStates) {
  keyStates[note] = false;
  updateKeyState(note, false);
}

function handleMouseLeave(note, keyStates) {
  if (keyStates[note]) {
    keyStates[note] = false;
    updateKeyState(note, false);
  }
}

function setUpKeyboardEvents(audioElements, keyStates) {
  document.addEventListener('keydown', (event) => handleKeyDown(event, keyStates, audioElements));
  document.addEventListener('keyup', (event) => handleKeyUp(event, keyStates));
}

function handleKeyDown(event, keyStates, audioElements) {
  const key = event.key.toLowerCase();
  const note = getNoteFromKey(key);
  if (note && !keyStates[note]) {
    keyStates[note] = true;
    updateKeyState(note, true);
    playSound(note, audioElements);
  }
}

function handleKeyUp(event, keyStates) {
  const key = event.key.toLowerCase();
  const note = getNoteFromKey(key);
  if (note) {
    keyStates[note] = false;
    updateKeyState(note, false);
  }
}

function updateKeyState(note, isActive) {
  const keyElement = document.querySelector(`[data-note="${note}"]`);
  keyElement.dataset.active = isActive.toString();
}

function getNoteFromKey(key) {
  const keyNoteMap = {
    q: 'C3',
    2: 'Csharp3',
    w: 'D3',
    3: 'Dsharp3',
    e: 'E3',
    r: 'F3',
    5: 'Fsharp3',
    t: 'G3',
    6: 'Gsharp3',
    y: 'A3',
    7: 'Asharp3',
    u: 'B3',
    x: 'B3',
    i: 'C4',
    c: 'C4',
    f: 'Csharp4',
    v: 'D4',
    g: 'Dsharp4',
    b: 'E4',
    n: 'F4',
    j: 'Fsharp4',
    m: 'G4',
    k: 'Gsharp4',
    ',': 'A4',
    l: 'Asharp4',
    '.': 'B4',
    '/': 'C5',
  };
  return keyNoteMap[key];
}

function playSound(note, audioElements) {
  const audio = audioElements[note];
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}
