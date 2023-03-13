import { createStore } from "vuex";

const store = createStore({
    state: {
        count: 1,
        dataFilm:[],
        AllDataFilms:[],
        objectNumber: 1,
        options: {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '446a849920msh40579f805fb4bffp15077ajsn780f820fb8f3',
                'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
            }
        },
      },
    mutations: {
        increment: state => state.count++,
        decrement: state => state.count--,
        getDataFromServer: state => {
            return fetch('https://unogs-unogs-v1.p.rapidapi.com/search/titles?order_by=date&type=movie', state.options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    state.AllDataFilms=response.results;
                })
                .catch(err => console.error(err));
        },
        getDataSingleFilm: state => state.dataFilm=state.AllDataFilms[state.objectNumber]
        },
    getters: {
        count: state => state.count,
        dataFilmTitle: state => {
            if(state.dataFilm.length>0){
                 return state.dataFilm.title.replace('&#39;', "'")
            }
        },
        dataFilm: state => state.dataFilm,
    }
  })

export default store