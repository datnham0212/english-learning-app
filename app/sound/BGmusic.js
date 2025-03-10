import { Audio } from 'expo-av';

let backgroundMusic;

export async function playBackgroundMusic() {
  if (backgroundMusic) {
    await backgroundMusic.unloadAsync();
  }
  const { sound } = await Audio.Sound.createAsync(
    require('../soundassets/BackgroundMusic1_mix.mp3'),
    { isLooping: true } 
  );
  backgroundMusic = sound;
  await sound.setVolumeAsync(0.2);
  await sound.playAsync();
}

export async function stopBackgroundMusic() {
  if (backgroundMusic) {
    await backgroundMusic.stopAsync();
  }
}