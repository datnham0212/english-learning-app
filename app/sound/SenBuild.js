import { Audio } from 'expo-av';

let soundSenBuild;
export async function playSound(soundFile) {
  if (soundSenBuild) {
    await soundSenBuild.unloadAsync();
  }
  const { sound } = await Audio.Sound.createAsync(soundFile, { volume: 1.0 });
  soundSenBuild = sound;
  await sound.playAsync();
}