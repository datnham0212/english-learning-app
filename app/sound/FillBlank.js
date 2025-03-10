import { Audio } from 'expo-av';

let soundFill;
export async function playSound(soundFile) {
  if (soundFill) {
    await soundSenBuild.unloadAsync();
  }
  const { sound } = await Audio.Sound.createAsync(soundFile, { volume: 1.0 });
  soundFill = sound;
  await sound.playAsync();
}