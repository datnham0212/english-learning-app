import { Audio } from 'expo-av';

let soundObject;

export async function playSound(soundFile) {
  if (soundObject) {
    await soundObject.unloadAsync();
  }
  const { sound } = await Audio.Sound.createAsync(soundFile, { volume: 1.0 });
  soundObject = sound;
  await sound.playAsync();
}