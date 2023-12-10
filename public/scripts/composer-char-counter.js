$(document).ready(function () {
  $("#tweet-text").on('input', function () {
    let charCount = this.value.length;
    let remainingChars = 140 - charCount;
    let counterElement = $(this).closest('form').find('.counter');
      console.log(counterElement);
    counterElement.text(remainingChars);

    if (remainingChars < 0) {
      counterElement.addClass('invalid');
    } else {
      counterElement.removeClass('invalid');
    }
  });
});
