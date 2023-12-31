
const createTweetElement = function (tweet) {
  const daysAgo = timeago.format(tweet.created_at)
  const $tweet = $(`
  <article class="tweet">
  <header>
  <div>
    <img src="${tweet.user.avatars}" alt="User Profile Picture">
    <h3>${tweet.user.name}</h3>
    </div>
    <p class="tweet-handle">${tweet.user.handle}</p>
  </header>
  <div class="tweet-content">
  <p>${escapeTweetText(tweet.content.text)}</p>
  </div>
  <footer>
  <p>${daysAgo}</p>
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
  $('.tweets-container').empty();
  console.log($('.tweets-container'))
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    console.log($tweet)
    $('.tweets-container').prepend($tweet);
  });
};

function loadTweets() {
  $.ajax({
    method: 'GET',
    url: '/tweets',
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

const showError = function (errorMsg) {
  const errorContainer = $('#error-container')
  errorContainer.addClass('error-container')
  errorContainer.removeClass('hide')
  errorContainer.text(errorMsg)
}

const hideError = function () {
  const errorContainer = $('#error-container')
  errorContainer.addClass('hide')
  errorContainer.removeClass('error-container')
  errorContainer.text('')
}

const validateTweetContent = function () {
  const tweetContent = $('#tweet-text').val();
  if (!tweetContent) {
    showError('tweet content is empty, please fill in your message');
    return false
  }
  if (tweetContent.length > 140) {
    showError('exceeds the maximum limit of 140 characters')
    return false;
  }
  hideError();
  return true;
};

const escapeTweetText = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const clearTweetContent = function () {
  $('#tweet-text').val('').trigger("input");
}


$(document).ready(function () {
  // Add an event listener for form submission
  $('form').submit(function (event) {

    //prevent the default form submission behavior 
    event.preventDefault();

    if (!validateTweetContent()) {
      return
    }

    // Serialize the form data
    const formData = $(this).serialize();

    // Log the serialized data
    console.log('Serialized form Data:', formData);

    // Use AJAX to submit the form data to the server 
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
      success: function (response) {
        loadTweets();
        clearTweetContent();
        // Log the server response
        console.log('Server Response:', response);
      },
      error: function (error) {
        console.error('Error:', error);
      }
    });

  });
});






