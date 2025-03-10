import { Audio } from 'expo-av';

let TFsound;
export async function playSound(soundFile) {
  if (TFsound) {
    await TFsound.unloadAsync();
  }
  const { sound } = await Audio.Sound.createAsync(soundFile, { volume: 1.0 });
  TFsound = sound;
  await sound.playAsync();
}