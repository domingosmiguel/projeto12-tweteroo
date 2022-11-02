const usernamePattern =
  /^(?=.{6,20}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9._-]+(?<![_.-])$/;
const tweetPattern = /^[\w\n\r\t ]{1,140}$/;

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
  return new Promise((resolve) => {
    resolve({ validatedUser: !!usernamePattern.test(str) });
  });
}
function validURL(str) {
  return new Promise((resolve) => {
    resolve({ validatedURL: !!urlPattern.test(str) });
  });
}
async function validUser(username, avatar) {
  const { validatedUser } = await validUsername(username);
  const { validatedURL } = await validURL(avatar);
  return validatedUser && validatedURL;
}

function validTweetText(str) {
  return new Promise((resolve) => {
    resolve({ validString: !!tweetPattern.test(str) });
  });
}
async function validTweet(username, tweet) {
  const { validatedUser } = await validUsername(username);
  const { validString } = await validTweetText(tweet);
  return validatedUser && validString;
}

export { validUser, validTweet };
