<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">Github searcher</h2>
  <p align="center">
    Search for github users and Repositries
    <br />
  </p>
</p>
    <br />
    <br />

## About The Project

---

In this project you can search for users and repositries, and we cache your last result, 'You Do NOT Need To Do More Requests'

## Technologies

---

- [React js](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [Emotion js](https://emotion.sh/docs/introduction)

## How To Run

---

In the project directory, you can run:

`yarn start`

## Solutions and Decisions (S&D)

---

### # Use localStorage VS redux-persist:

---

- I used localStorage instead of redux-persist to avoid a big liberary which I didn't need in this case, I prefered to implement cache solution in a simple case by save last search data in localStorage.

- Scale : my solutin will not scale, it's only save the last search data, I think redux persist is a good liberary to use in a large scale

---

### # Store Management:

---

- I used redux-toolkit library, it's depend on redux js, it has middlewares which allow me to make AsyncActions also give me the AsyncAction status ['Pending', 'fulfiled', 'rejected']
