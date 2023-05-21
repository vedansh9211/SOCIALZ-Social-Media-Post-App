const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST endpoint for submitting the content to be posted
app.post('/post', async (req, res) => {
  const { content, platforms } = req.body;

  try {
    // Iterate over the selected platforms
    for (const platform of platforms) {
      // Make API requests to the corresponding social media platforms
      switch (platform) {
        case 'facebook':
          await postToFacebook(content);
          break;
        case 'twitter':
          await postToTwitter(content);
          break;
        case 'instagram':
          await postToInstagram(content);
          break;
        // Add more cases for other platforms
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }
    }

    res.status(200).json({ message: 'Content posted successfully on all platforms.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to post content on Facebook
async function postToFacebook(content) {
  // Implement your Facebook API logic here
  // Use the axios library or a Facebook SDK to make the API request
  // Make sure to handle authentication and post creation
    try {
      // Implement your Facebook API logic here
      // Make sure to handle authentication and post creation
  
      const accessToken = '<YOUR_FACEBOOK_ACCESS_TOKEN>'; // Replace with your Facebook access token
  
      const response = await axios.post(
        `https://graph.facebook.com/me/feed`,
        {
          message: content
        },
        {
          params: {
            access_token: accessToken
          }
        }
      );
  
      if (response.data && response.data.id) {
        console.log(`Posted on Facebook with ID: ${response.data.id}`);
      } else {
        throw new Error('Failed to post on Facebook.');
      }
    } catch (error) {
      throw new Error(`Failed to post on Facebook: ${error.message}`);
    }
  }
  

// Function to post content on Twitter
async function postToTwitter(content) {
  // Implement your Twitter API logic here
  // Use the axios library or a Twitter SDK to make the API request
  // Make sure to handle authentication and tweet creation
    try {
      // Implement your Twitter API logic here
      // Make sure to handle authentication and tweet creation
  
      const consumerKey = '<YOUR_TWITTER_CONSUMER_KEY>'; // Replace with your Twitter consumer key
      const consumerSecret = '<YOUR_TWITTER_CONSUMER_SECRET>'; // Replace with your Twitter consumer secret
      const accessToken = '<YOUR_TWITTER_ACCESS_TOKEN>'; // Replace with your Twitter access token
      const accessTokenSecret = '<YOUR_TWITTER_ACCESS_TOKEN_SECRET>'; // Replace with your Twitter access token secret
  
      const oauth = {
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        token: accessToken,
        token_secret: accessTokenSecret
      };
  
      const response = await axios.post(
        'https://api.twitter.com/1.1/statuses/update.json',
        {
          status: content
        },
        {
          headers: {
            Authorization: `OAuth oauth_consumer_key="${oauth.consumer_key}", oauth_nonce="${oauth.nonce}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${oauth.timestamp}", oauth_token="${oauth.token}", oauth_version="1.0", oauth_signature="${oauth.signature}"`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
  
      if (response.data && response.data.id_str) {
        console.log(`Posted on Twitter with ID: ${response.data.id_str}`);
      } else {
        throw new Error('Failed to post on Twitter.');
      }
    } catch (error) {
      throw new Error(`Failed to post on Twitter: ${error.message}`);
    }
  }
  

// Function to post content on Instagram
async function postToInstagram(content) {
  // Implement your Instagram API logic here
  // Use the axios library or an Instagram SDK to make the API request
  // Make sure to handle authentication and post 
    try {
      // Implement your Instagram API logic here
      // Make sure to handle authentication and post creation
  
      const accessToken = '<YOUR_INSTAGRAM_ACCESS_TOKEN>'; // Replace with your Instagram access token
  
      const response = await axios.post(
        'https://api.instagram.com/v1/media/upload',
        {
          access_token: accessToken,
          caption: content,
          type: 'image/jpeg'
        }
      );
  
      if (response.data && response.data.data && response.data.data.id) {
        console.log(`Posted on Instagram with ID: ${response.data.data.id}`);
      } else {
        throw new Error('Failed to post on Instagram.');
      }
    } catch (error) {
      throw new Error(`Failed to post on Instagram: ${error.message}`);
    }
  }
  

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
