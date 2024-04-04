import AsyncStorage from '@react-native-async-storage/async-storage';

const LikedReelsStorage = {
  async getLikedReels() {
    try {
      const likedReels = await AsyncStorage.getItem('likedReels');
      return likedReels ? JSON.parse(likedReels) : [];
    } catch (error) {
      console.error('Error getting liked reels:', error);
      return [];
    }
  },

  async setLikedReels(likedReels) {
    try {
      await AsyncStorage.setItem('likedReels', JSON.stringify(likedReels));
    } catch (error) {
      console.error('Error setting liked reels:', error);
    }
  },
};

export default LikedReelsStorage;

