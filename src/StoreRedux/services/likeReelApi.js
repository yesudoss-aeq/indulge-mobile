import axios from 'axios';

const BASE_URL = 'https://www.indulge.blokxlab.com/like-reel';

export const likeReelApi = async (reelObj) => {
  try {
    const response = await axios.post(BASE_URL, reelObj, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("Like response ::", response.data)
    // Assuming the API returns a status indicating whether the reel is liked
    return response?.data?.message;
  } catch (error) {
    console.error('Error liking reel:', error);
    throw error;
  }
};
