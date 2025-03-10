import { Audio } from 'expo-av';

export async function playSound(soundFile) {
  const { sound } = await Audio.Sound.createAsync(soundFile, { volume: 1.0 });
  await sound.playAsync();
  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.didJustFinish) {
      sound.unloadAsync();
    }
  });
}