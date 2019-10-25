import Vue from 'vue'
import Vuex from 'vuex'

const API_KEY = '8e5de58a2504cc649d94b3b5da40907f'
const CATEGORIES_LIST = [
	{
		name: 'popular',
		label: 'Popular'
	},
	{
		name: 'top_rated',
		label: 'Top rated'
	},
	{
		name: 'upcoming',
		label: 'Upcoming'
	},
	{
		name: 'now_playing',
		label: 'Now playing'
	},
]

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  	categories: CATEGORIES_LIST,
  	currentList: CATEGORIES_LIST[0].name,
  	currentPage: 1,
  	visitedPages: {},
  	visitedFilms: {},
  	viewData: [],
  	currentFilm: {},
  	totalPages: 0
  },
  getters: {
  	categories: state => JSON.parse(JSON.stringify(state.categories)),
  	currentTitle: state => state.categories.filter( i => i.name === state.currentList)[0].label,
  	currentList: state => state.currentList,
  	currentPage: state => state.currentPage,
  	totalPages: state => state.totalPages,
  	viewData: state => JSON.parse(JSON.stringify(state.viewData)),
  	currentFilm: state => JSON.parse(JSON.stringify(state.currentFilm))
  },
  mutations: {
  	ADD_NEW_VISITED_DATA(state, obj) {
  		if(!(obj.list in state.visitedPages)) {
  			state.visitedPages[obj.list] = {totalPages: obj.totalPages}
  			state.totalPages = obj.totalPages
  		}
  		if(!(obj.page in state.visitedPages[obj.list])) state.visitedPages[obj.list][obj.page] = obj.data
  	},
  	ADD_NEW_VISITED_FILM(state, obj) {
  		state.visitedPages[obj.id] = obj.data
  	},
  	SET_CURRENT_VIEW_PARAMS(state, obj) {
  		if( state.currentList !== obj.list ) {
  			state.currentList = obj.list
  			state.totalPages = state.visitedPages[obj.list].totalPages
  		}
  		
  		state.currentPage = obj.page
  	},
  	SET_LIST_VIEW_DATA(state, data) {
  		state.viewData = data
  	},
  	SET_CURRENT_FILM_DATA(state, data) {
  		state.currentFilm = data
  	}
  },
  actions: {
	async getViewData({commit, state}, paramsObj) {
  		try {
  			let viewData = []
  			const currentList = paramsObj && paramsObj.list? paramsObj.list: state.currentList
  			const currentPage = paramsObj? paramsObj.page: state.currentPage

  			if((currentList in state.visitedPages) && (currentPage in state.visitedPages[currentList])) {
  				viewData = state.visitedPages[currentList][currentPage]
  			} else {
	  			const resp = await this.$axios(`movie/${currentList}`,{
				    params: {
				      api_key: API_KEY,
				      page: currentPage
				    }
				  })
	  			commit('ADD_NEW_VISITED_DATA', {
	  				list: currentList,
	  				page: currentPage, 
	  				data: resp.data.results,
	  				totalPages: resp.data.total_pages
	  			})
	  			viewData = resp.data.results	   				
  			}
  			if(paramsObj) {
  				commit('SET_CURRENT_VIEW_PARAMS', {
  					list: currentList,
  					page: currentPage
  				})
  			}
				commit('SET_LIST_VIEW_DATA', viewData)
  		} catch( err ) {
 				console.error('Something wrong with: ', err)
  		}
  	},
  	async getFilmData({commit, state}, filmId) {
  		try {
  			let filmData = {}

  			if(filmId in state.visitedFilms) {
  				filmData = state.visitedFilms[filmId]
  			} else {
	  			const resp = await this.$axios(`movie/${filmId}`,{
				    params: {
				      api_key: API_KEY
				    }
				  })
	  			commit('ADD_NEW_VISITED_FILM', {
	  				id: filmId, 
	  				data: resp.data
	  			})
	  			filmData = resp.data	   				
  			}
				commit('SET_CURRENT_FILM_DATA', filmData)
  		} catch( err ) {
 				console.error('Something wrong with: ', err)
  		}
  	}
  }
})

export default store
