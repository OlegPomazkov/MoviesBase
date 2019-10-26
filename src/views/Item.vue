<template>
  <div class="film">
  	<div  class="film__up">
	  	<img 
	      class="film__up__poster" 
	      :src="`http://image.tmdb.org/t/p/w342/${filmData.poster_path}`"
	    />

	    <div  class="film__up__info">
		    <div class="film__up__info__title">
	    		{{ filmData.title }}
	    		<span class="year">
	    			{{`(${releaseYear})`}}
	    		</span>
	    	</div>

	    	<div class="film__up__info__tag">
	    		{{ filmData.tagline }}
	    	</div>

		    <div class="film__up__info__genres">
		    	<div
		    		class="film__up__info__genres__item"
		    		v-for="(item, k) in filmData.genres"
		    		:key="`film_genre_${k}`"
		    	>
		    		{{ item.name }}
		    	</div>
		    </div>

		    <div class="film__up__info__overview">
		    	{{ filmData.overview }}
		    </div>

		    <div class="film__up__info__status">
		    	<div class="film__up__info__status__item">	
		    		{{ filmData.status }}
		    	</div>

		    	<div class="film__up__info__status__item">	
		    		{{ `${filmData.runtime} min` }}
		    	</div>

		    	<div class="film__up__info__status__item">	
		    		{{ `${filmData.adult? 'adult': ''}` }}
		    	</div>

		    	<a 
		    		v-if="filmData.homepage"
		    		class="film__up__info__status__homepage"
		    		:href="filmData.homepage"
		    	>	
		    		Film homepage
		    	</a>
		    </div>

		    <div class="film__up__info__production">
		    	<div class="film__up__info__production__money">
		    		<data-item
		    			v-if="filmData.budget"
		    			class="film__up__info__production__money__item"
		    			:item="{title: 'Budget', value: `$${filmData.budget}`}"
		    		/>

		    		<data-item
		    			v-if="filmData.revenue"
		    			class="film__up__info__production__money__item"
		    			:item="{title: 'Revenue', value: `$${filmData.revenue}`}"
		    		/>
			    </div>

	    		<data-item
	    			class="film__up__info__production__countries"
	    			:item="{title: 'Production countries', value: productionCountries}"
	    		/>
	    		<data-item
	    			class="film__up__info__production__companies"
	    			:item="{title: 'Production companies', value: productionCompanies}"
	    		/>
		    </div>

		    <div
		    	v-if="videos.length"
		    	class="film__up__info__trailers"
		    >
		    	<div class="film__up__info__trailers__title">
		    		You can see film trailers by links below:
		    	</div>

		    	<div
		    		class="film__up__info__trailers__item"
		    		v-for="(item, k) in videos"
		    		:key="item.id"
		    		@click="showTrailer(k)"
		    	>
		    		{{ item.name }}
		    	</div>	
		    </div>

		    <div class="film__up__info__voting">
	    		<data-item
	    			class="film__up__info__voting__item"
	    			:item="{title: 'Popularity', value: filmData.popularity}"
	    		/>

					<data-item
	    			class="film__up__info__voting__item"
	    			:item="{title: 'Vote average', value: filmData.vote_average}"
	    		/>	    		
		    </div>
		  </div>
		</div>

		<video-component
			v-if="videoVisible"
			:trailer="currentVideo"
			@hideVideo="handleHideVideo"
		/>
  </div>
</template>

<script>
import DataItem from "@/components/DataItem"	
import VideoComponent from "@/components/VideoComponent"

import { mapGetters } from "vuex"

export default {
  name: "item",
  components: {
  	DataItem,
  	VideoComponent
  },
  data() {
  	return {
  		videos: [],
  		currentVideo: null,
  		videoVisible: false
  	}
  },
  computed: {
    ...mapGetters({
      filmData: "currentFilm",
      apiKey: "apiKey"
    }),
    releaseYear() {
    	return this.filmData && this.filmData.release_date? this.filmData.release_date.split('-')[0]: '-'
    },
    productionCountries() {
    	if(!this.filmData.production_countries) return

    	return this.filmData.production_countries.map( i => i.name).join(', ')
    },
    productionCompanies() {
    	if(!this.filmData.production_companies) return

    	return this.filmData.production_companies.map( i => `${i.name} ${i.origin_country? `(${i.origin_country})`:''}`).join(', ')
    }
  },  
  async created() {
	  await this.$store.dispatch('getFilmData', this.$route.params.id)
	  await this.getVideos()
  },
  methods: {
  	async getVideos() {
  		const resp = await this.$axios.get(`movie/${this.$route.params.id}/videos`,{
  			params: {
		      api_key: this.apiKey
		    }
  		})
  		const allVideos = resp.data && resp.data.results? resp.data.results: [] 
  		
  		this.videos = allVideos.filter( item => (item.type === 'Trailer') && (item.site === "YouTube"))
  	},
  	showTrailer(num) {
  		this.currentVideo = this.videos[num]
  		this.videoVisible = true
  	},
  	handleHideVideo() {
  		this.videoVisible = false
  		this.currentVideo = null
  	}
  }
}
</script>

<style lang="scss">
.film {
	position: relative;
}
</style>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.film {
	width: 100%;
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background: $white;

	&__up {
		box-sizing: border-box;
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;

		&__poster {
			box-sizing: border-box;
			width: 344px;
		}

		&__info {
			box-sizing: border-box;
			flex: 1;
			min-width: 344px;
			padding: 10px; 
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;

			&__title {
				box-sizing: border-box;
				padding-bottom: 8px;
				font-size: $title;
				font-weight: bold;
				color: $text_prim;

				& .year {box-sizing: border-box;
					font-weight: normal
				}
			}

			&__tag {
				box-sizing: border-box;
				padding-bottom: 15px;
				font-size: $title_s;
				font-weight: normal;
				color: $text_sec;
			}

			&__genres {
				box-sizing: border-box;
				padding-bottom: 5px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				font-size: $text_l;
				font-weight: 600;
				color: $text_prim;

				&__item {
					box-sizing: border-box;
					padding-right: 10px;
				}				
			}

			&__overview {
				box-sizing: border-box;
				width: 100%;
				padding-bottom: 5px;
				font-size: $text;
				font-weight: normal;
				font-style: italic;
				color: $text_prim;
			}

			&__status {
				box-sizing: border-box;
				padding-bottom: 5px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				font-size: $text_xl;
				font-weight: 400;
				color: $text_prim;

				&__item {
					padding-right: 10px;
				}
			}

			&__production {
				&__money,
				&__countries {
					box-sizing: border-box;
					padding-bottom: 5px;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: flex-start;
					align-items: center; 
				}

				&__companies {
					box-sizing: border-box;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: flex-start;
					align-items: center; 
				}
			}

			&__trailers {
				box-sizing: border-box;
				padding: 10px;

				&__title {
					padding-bottom: 7px;
					font-size: text_xl;
					font-weight: 600;
					color: $text_sec;
				}

				&__item {
					padding-right: 10px;
					padding-left: 10px;
					height: 30px;
					margin-bottom: 5px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: $text;
					color: black;
					background: $back_prim;
					border-radius: 15px;
					cursor: pointer;

					&:hover {
						opacity: 0.5;
					}
				}
			}

			&__voting {
				box-sizing: border-box;
				padding-top: 5px;
				padding-bottom: 5px;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				align-items: center; 
			}
		}
	}
}
</style>