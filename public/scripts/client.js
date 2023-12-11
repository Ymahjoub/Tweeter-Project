
const createTweetElement = function (tweet) {
  const daysAgo = timeago.format(tweet.created_at)
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

function loadTweets() {
  $.ajax({
    method: 'GET', 
    url: 'http://localhost:8080/tweets',
    dataType: 'json',
    success: function (tweets) {
      renderTweets(tweets);
    },
    error: function (error) {
      console.error('Error loading tweets:', error);
    }
  });
}

$(document).ready(function () {
  loadTweets();
});






