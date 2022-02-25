# Authentication and Testing Sprint Challenge

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **Authentication and Testing**. During this sprint, you studied **authentication, JSON web tokens, unit testing, and backend testing**. In your challenge this week, you will demonstrate your mastery of these skills by creating **a dad jokes app**.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers on Monday following the challenge submission. For more information on the review process [click here.](https://www.notion.so/bloomtech/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a)

You are not allowed to collaborate during the sprint challenge.

## Project Setup

- [ ] Run `npm install` to install your dependencies.
- [ ] Build your database executing `npm run migrate`.
- [ ] Run tests locally executing `npm test`.

## Project Instructions

Dad jokes are all the rage these days! In this challenge, you will build a real wise-guy application.

Users must be able to call the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

We also need to make sure nobody without the token can call `[GET] /api/jokes` and gain access to our dad jokes.

We will hash the user's password using `bcryptjs`, and use JSON Web Tokens and the `jsonwebtoken` library.

### MVP

Your finished project must include all of the following requirements (further instructions are found inside each file):

- [ ] An authentication workflow with functionality for account creation and login, implemented inside `api/auth/auth-router.js`.
- [ ] Middleware used to restrict access to resources from non-authenticated requests, implemented inside `api/middleware/restricted.js`.
- [ ] A minimum of 2 tests per API endpoint, written inside `api/server.test.js`.

**IMPORTANT Notes:**

- Do not exceed 2^8 rounds of hashing with `bcryptjs`.
- If you use environment variables make sure to provide fallbacks in the code (e.g. `process.env.SECRET || "shh"`).
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries. Do not update existing packages.
- The database already has the `users` table, but if you run into issues, the migration is available.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing.

## Submission format

- [ ] Submit via Codegrade by pushing commits to your `main` branch on Github.
- [ ] Check Codegrade before the deadline to compare its results against your local tests.
- [ ] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [ ] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics.

1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.

    The fundamental difference between sessions and JSON web tokens for authentication is that sessions are stored on the server and when requested it is sent through session cookies whereas JSON web tokens are not stored on the server but in a token where it is sent to the client and stored when requested. Sessions has issues when it comes to scalability because the sessions are stored in the servers versus a token based authentication where the token is stored on the client side so scalabity is not an issue with tokens.

2. What does `bcryptjs` do to help us store passwords in a secure manner?

    Bcryptjs allows us to 'hash' passwords making it harder for hackers to obtain someones original password. Through bcryptjs hashing we can hash the passwords as many times as the developer would like so any hacker would have a very difficult time decrypting the hash to find the original password that is stored. 

3. How are unit tests different from integration and end-to-end testing?

    They all differ because unit tests work on a single 'unit' of code. Usually smaller and quicker in size compared to the other forms of testing. Integration tests are used to test how and if different components or parts of the code work together. End to end testing is testing of the code/application from beginning to end of how the user would use the website or application. Basically a full functioning test of the overall application.

4. How does _Test Driven Development_ change the way we write applications and tests?

    It changes the way we write code and tests because it is almost like we are starting from the end and working backwards. There are three phases of test driven development and it starts with creating the tests first, then producing the code to make the tests work and then we refactor the code to optimize by making it clean, efficent, and DRY. 