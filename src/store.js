import { createStore } from "vuex";

const store = createStore({
    state: {
        film: {},
        lastFilm:{},
        films: [],
        numb: 0,
        options: {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '446a849920msh40579f805fb4bffp15077ajsn780f820fb8f3',
                'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
            }
        },
    },
    mutations: {
        SET_FILMS: (state) => {
            fetch('https://unogs-unogs-v1.p.rapidapi.com/search/titles?order_by=rating&type=movie', state.options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                state.films = response.results;
            })
            .catch(err => console.error(err));
        },
        SET_FILM: (state, film) => {state.film = film; console.log(state.film)},
        SET_LASTFILM: (state, lastFilm) => {state.lastFilm = lastFilm;console.log(state.lastFilm)},
        SET_NUMB:(state, numb=0) => {state.numb = numb; console.log(state.numb)}
    },
    actions:{
        SET_FILMS({commit}){commit('SET_FILMS')},
        SET_FILM({commit},payload){commit('SET_FILM',payload)},
        SET_LASTFILM({commit},payload){commit('SET_LASTFILM',payload)}
    },
    getters: {
        getLastFilm: state => state.lastFilm,
        getFilm: state => state.film,
        getFilms: state => state.films,
    }
  })

export default store