<template>
  <section>
    <div class="col-5 input-group input-group-lg search">
      <input
        type="text"
        v-model="searchQuery"
        class="form-control"

        placeholder="Type address..."
      >
      <input
        type="hidden"
        id="loc_lat"
      >
      <input
        type="hidden"
        id="loc_long"
      >
      <button
        @click="searchAddress"
        class="btn rounded-right"
        style="border-radius: 0"
      >
        <span class="fa fa-search search-icon" />
      </button>
    </div>
  </section>
</template>

<script>
import googlePlacesService from 'google-places-autocomplete-service'

export default {
  name: 'Search',
  props: {
    filter: String,
    coordinateSearchEnabled: Boolean
  },
  components: {},
  data () {
    return {
      apiBaseUrl: process.env.VUE_APP_ROOT_API,
      autocompleteStartLength: 5,

      refreshTokenTimeoutFunction: null,
      searchResponse: [],
      searchTextData: null,
      selectedSearchResult: null,
      selectedValue: null,
      token: '',
      searchQuery: '',
      googlePlaces: null,
      options: {
        type: 'address',
        filterByCountry: 'ZA',
        outputPlaceTypes: [
          'postalCode',
          'locality',
          'administrativeAreaLevel1',
          'country'
        ],
        searchStrategies: [
          'searchByPlaceId'
        ]
      }
    }
  },
  mounted () {

  },
  methods: {
    getLabel (item) {
      if (!item) {
        return null
      }
      return item.description
    },
    getSearchDetails (item) {
      if (!item) {
        return null
      }
      if (item.type !== 'seoid') {
        return null
      }

      const url = `${this.apiBaseUrl}/addressdetails?seoid=${item.seoid}`
      this.$http.get(url).then(data => {
        this.selectedSearchResult = data.body.result.map(d => ({
          seoId: d.seoid,
          description: d.formatted_address,
          latitude: d.geometry.location.lat,
          longitude: d.geometry.location.lng
        }))

        this.$emit('selectionChanged', this.selectedSearchResult[0])
      })
      this.clearAddressSearchInputs()

      return item.description
    },
    searchAddress () {
      const url = `${this.apiBaseUrl}/search?query=${this.searchTextData}`
      this.$http.get(url).then(data => {
        this.searchResponse = data.body.result.map(r => ({
          description: r.formatted_address,
          type: 'seoid',
          seoid: r.seoid
        }))
        this.$children[0].focus()
      })
    },
    updateSearchResponse (text) {
      this.searchTextData = text
      if (text.length < 3) {
        return
      }
      const url = `https://saas.afrigis.co.za/intiendols/autocomplete/?token=${
        this.token
      }&query=${encodeURIComponent(text)}`

      this.$http.jsonp(url).then(
        data => {
          if (data.body.callsLeft === 5) {
            this.getToken()
          }
          this.searchResponse = data.body.result
            .slice(0, this.autocompleteStartLength)
            .map(r => ({
              description: r.description,
              type: 'seoid',
              seoid: r.seoid
            }))
        },
        () => {
          return null
        }
      )
    },
    getToken () {
      let me = this
      const tokenUrl = `${this.apiBaseUrl}/token`
      this.$http.get(tokenUrl).then(function (data) {
        if (this.refreshTokenTimeoutFunction) {
          clearTimeout(this.refreshTokenTimeoutFunction)
          this.refreshTokenTimeoutFunction = null
        }
        this.token = data.body.result.token

        if (!this.refreshTokenTimeoutFunction) {
          this.refreshTokenTimeoutFunction = setTimeout(function () {
            me.getToken()
          }, 300000)
        }
      })
    },
    clearAddressSearchInputs () {
      this.searchResponse = []
    },
    googleAutocomplete (text) {
      let callback = null
      let predictionObject = this.googlePlaces.getPredictions(text, callback)
      console.log('predictionObject: ' + predictionObject)
      let places = this.googlePlaces.getPlace(predictionObject, callback)
      console.log('places: ' + places)
    }
  },
  created: {
    searchQuery () {
      this.googlePlaces = googlePlacesService(this.options)
    }
  },
  watch: {
    searchQuery (text) {
      console.log(text)
      this.googleAutocomplete(text)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  z-index: 1001;
  width: 100%;
  pointer-events: all;
  padding-top: 15px;
  padding-right: 0px;
  position: relative;
  float: left;
}
.searchBox {
  max-width: 600px;
  max-height: 45px;
}
.search-icon {
  color: #015c95;
}
</style>
<style src="@/assets/css/autocomplete.css"></style>
