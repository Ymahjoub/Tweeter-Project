//Import test data 
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1702088929973
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1702175329973
  }
]

const calculateDaysAgo = function (timestamp) {
  const currentTimestamp = new Date().getTime();
  const differenceInMilliseconds = currentTimestamp - timestamp;
  const daysAgo = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  return daysAgo;
}

const createTweetElement = function (tweet) {
  const daysAgo = calculateDaysAgo(tweet.created_at)
  const $tweet = $(`
  <article class="tweet">
  <header>
    <img src="${tweet.user.avatars}" alt="User Profile Picture">
    <h3>${tweet.user.name}</h3>
    <p class="tweet-handle">${tweet.user.handle}</p>
  </header>
  <div class="tweet-content">
    <p>${tweet.content.text}</p>
  </div>
  <footer>
  <p>${daysAgo} days ago</p>
    <div class="icons">
      <i class="far fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </div>
  </footer>
</article>
`);
  return $tweet;
};

const renderTweets = function (tweets) {
  $('.tweet-container').empty();
  console.log($('tweet-container'))
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    console.log($tweet)
    $('.tweet-container').append($tweet);
  });
};



const run = function () {
  renderTweets(data);
}




