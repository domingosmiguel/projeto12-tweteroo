const usernamePattern =
  /^(?=.{6,20}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9._-]+(?<![_.-])$/;
// Lack of negative look-behind support
const usernamePattern1 =
  /^(?=[a-zA-Z0-9._-]{6,20}$)(?!.*[_.-]{2})[^_.-].*[^_.-]$/;
const tweetPattern = /^(?=[\s\S]{1,140}$)/;

const urlPattern = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
  'i'
); // fragment locator

function validUsername(str) {
  return !!usernamePattern.test(str) || !!usernamePattern1.test(str);
}
function validURL(str) {
  return !!urlPattern.test(str);
}
function validUser(username, avatar) {
  return validUsername(username) && validURL(avatar);
}

function validTweetText(str) {
  return !!tweetPattern.test(str);
}
function validTweet(username, tweet) {
  return validUsername(username) && validTweetText(tweet);
}

export { validUser, validTweet };
