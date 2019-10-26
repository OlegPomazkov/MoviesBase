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
			    	<div class="film__up__info__production__money__item">
			    		<span class="label">
			    			Budget:
			    		</span>
			    		<span class="value">
			    			{{ ` $${filmData.budget}` }}
			    		</span>
			    	</div>

			    	<div
			    		v-if="filmData.revenue" 
			    		class="film__up__info__production__money__item"
			    	>
			    		<span class="label">
			    			Revenew:
			    		</span>
			    		<span class="value">
			    			{{ `$${filmData.revenue}` }}
			    		</span>
			    	</div>
			    </div>
			    	
		    	<div class="film__up__info__production__countries">
		    		<div class="film__up__info__production__countries__title">
		    			Production countries: 
		    		</div>

		    		<div
		    			 class="film__up__info__production__countries__item"
		    			 v-for="item in filmData.production_countries"
		    			 :key="`country_${item.name}`"
		    		>
		    			{{ item.name }}	
		    		</div>
		    	</div>

					<div class="film__up__info__production__companies">
		    		<div class="film__up__info__production__countries__title">
		    			Production companies: 
		    		</div>

		    		<div
		    			 class="film__up__info__production__companies__item"
		    			 v-for="item in filmData.production_companies"
		    			 :key="`country_${item.name}`"
		    		>
		    			<img 
					      class="logo" 
					      :src="`http://image.tmdb.org/t/p/w45/${item.logo_path}`"
					    />	
		    			{{ ` ${item.name} (${item.origin_country})` }}	
		    		</div>		    		
		    	</div>		    	
		    </div>

		    <div
		    	v-if="videos.length"
		    	class="film__up__info__trailers"
		    >
		    	<div
		    		class="film__up__info__trailers__item"
		    		v-for="(item, k) in videos"
		    		:key="item.id"
		    		@click="showTrailer(k)"
		    	>
		    		{{ `Trailer ${k+1}` }}
		    	</div>	
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
import VideoComponent from "@/components/VideoComponent"

import { mapGetters } from "vuex"

export default {
  name: "item",
  components: {
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
    	console.log(this.filmData)
    	return this.filmData && this.filmData.release_date? this.filmData.release_date.split('-')[0]: '-'
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
  		
  		this.videos = allVideos.filter( item => item.type === 'Trailer')
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
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

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
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;

			&__title {
				box-sizing: border-box;
				font-size: $title;
				font-weight: bold;
				color: $text_prim;

				& .year {box-sizing: border-box;
					font-weight: normal
				}
			}

			&__tag {
				box-sizing: border-box;
				font-size: $title_s;
				font-weight: normal;
				color: $text_sec;			
				box-sizing: border-box;
			}

			&__genres {
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				font-size: $text_l;
				font-weight: normal;
				color: $text_prim;

				&__item {
					box-sizing: border-box;
					padding-right: 10px;
				}				
			}

			&__overview {
				box-sizing: border-box;
				width: 100%;
				font-size: $text;
				font-weight: normal;
				font-style: italic;
				color: $text_prim;
			}

			&__status {
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				font-size: $text_l;
				font-weight: normal;
				color: $text_prim;

				&__item {
					padding-right: 10px;
				}
			}

			&__production {
				&__countries {
					box-sizing: border-box;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: flex-start;
					align-items: center; 
					font-size: $text;

					&__title {
						font-weight: 500;
						color: $text_sec;
					}

					&__item {
						font-weight: normal;
						color: $text_prim;
					}
				}

				&__companies {
					box-sizing: border-box;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: flex-start;
					align-items: center; 
					font-size: $text;

					&__title {
						font-weight: 500;
						color: $text_sec;
					}

					&__item {
						box-sizing: border-box;
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						font-weight: normal;
						color: $text_prim;
					}
				}
			}
		}
	}
}
</style>