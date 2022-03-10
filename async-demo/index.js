// Asynchronous
console.log("step first : (before)");
// getUser(1, (user) => {
//   getRepositories(user, (repos) => {
//     getCommits(repos, (commits) => {
//       console.log(commits);
//     });
//   });
// });

// Promise-based approach
// 2. then'dan sonraki thenlerde promise'lere ulaşıyoruz ve kullanıyoruz.
// getUser(1)
//   .then((user) => getRepositories(user.gitHubUsername))
//   .then((repos) => getCommits(repos[0]))
//   .then((commits) => console.log("Commits : ", commits))
//   .catch((err) => console.log("Error : ", error.messsage));

// Async and Await
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = getCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log("Error : ", err.message);
  }
}
displayCommits();

console.log("step last : (after)");

// // Synchronous
// console.log("step first : (before)");
// const user = getUser(1);
// const repos = getRepositories(user.gitHubUsername);
// const commits = getCommits(repos[0]);
// console.log("step last : (after)");

// function getRepositories(user) {
//   getRepositories(user.gitHubUsername, getCommits);
// }
// function getCommits(repo) {
//   getCommits(repo, displayCommit);
// }
// function displayCommit(commits) {
//   console.log(commits);
// }
// Callbacks
// Promises
// Async/Await

// function getUser(id, callback) {
//   setTimeout(() => {
//     console.log("Reading user from a databases");
//     callback({ id: id, gitHubUsername: "serifcolakel" });
//   }, 2000);
// }
// PROMISE KULLANARAK GETUSET FONK TANIMLAYALIM
function getUser(id) {
  return new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
      console.log("Reading user from a databases");
      resolve({ id: id, gitHubUsername: "serifcolakel" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling github API...");
      // resolve(["repo1", "repo2", "repo3"]);
      reject(new Error("Could not get the repos"));
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling github API...");
      resolve(["commit"]);
    }, 2000);
  });
}
