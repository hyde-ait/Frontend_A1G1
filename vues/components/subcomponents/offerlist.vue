<!--
@Author: Hichem Aitouakli <Hayden>
@Date:   2021-06-03T21:13:00+01:00
@Email:  alterhichem99@gmail.com
@Project: Jobhunt
@Last modified by:   hayden99
@Last modified time: 2021-06-16T22:37:08+01:00
-->
<!-- Listes des offres d'emplois (pour Jobseeker)  -->
<template>
  <v-container fluid >
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          class="mb-1 border border-primary"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-arrow-up"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="#FFC600"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="#FFC600"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.IntituleOffre"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="border border-primary">
              <v-card-title class="subheading font-weight-bold">
                {{ item.IntituleOffre }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                >
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                    {{ key }}:
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ item[key] }}
                  </v-list-item-content>

                </v-list-item>
                <div class="d-flex justify-content-center">
                  <v-dialog persistent v-model="dialog"
                  :retain-focus="false" max-width="900px">
                    <!--  DONT TOUCH RETAIN FOCUS -->
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="#FFC600" :value="true" v-bind="attrs"
                      v-on="on">
                        Details
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">Details Offer</span>
                      </v-card-title>
                      <v-card-text>
                        <v-row justify="center">
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model=" item.IntituleOffre "
                                        label="Entitled"
                                        readonly
                                        background-color="grey lighten-2"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model ="item.Lieu"
                                        label="Address"
                                        readonly
                                        prepend-inner-icon="mdi-map-marker"
                                        background-color="grey lighten-2"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                      <v-textarea
                                        v-model="item.Description"
                                        label="Description*"
                                        readonly
                                        background-color="grey lighten-2"
                                      ></v-textarea>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                    >
                                    <v-row>
                                       <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                        >
                                        <v-menu
                                          ref="menu"
                                          v-model="menu"
                                          :close-on-content-click="false"
                                          :return-value.sync="item.From"
                                          transition="scale-transition"
                                          offset-y
                                          min-width="auto"
                                        >
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                              v-model="item.From"
                                              label="From"
                                              prepend-icon="mdi-calendar"
                                              readonly
                                              v-bind="attrs"
                                              v-on="on"
                                            ></v-text-field>
                                          </template>
                                          <v-date-picker
                                            v-model="item.From"
                                            no-title
                                            scrollable
                                            dark
                                            readonly
                                          >
                                          </v-date-picker>
                                        </v-menu>
                                      </v-col>
                                      <v-col
                                       cols="12"
                                       sm="6"
                                       md="4"
                                       >
                                       <v-menu
                                         ref="menu2"
                                         v-model="menu2"
                                         :close-on-content-click="false"
                                         :return-value.sync="item.To"
                                         transition="scale-transition"
                                         offset-y
                                         min-width="auto"
                                       >
                                         <template v-slot:activator="{ on, attrs }">
                                           <v-text-field
                                             v-model="item.To"
                                             label="To"
                                             prepend-icon="mdi-calendar"
                                             readonly
                                             v-bind="attrs"
                                             v-on="on"
                                           ></v-text-field>
                                         </template>
                                         <v-date-picker
                                           v-model="item.To"
                                           no-title
                                           scrollable
                                           dark
                                         >
                                         </v-date-picker>
                                       </v-menu>
                                     </v-col>
                                     </v-row>
                                    </v-col>
                                  </v-row>
                                </v-container>
                        </v-row>
                      </v-card-text>
                      <v-btn color="#FFC600" @click='$emit("back")'>
                        Apply
                      </v-btn>
                      <v-btn
                       color="#1A1A1A" style="color:white;"
                       @click="dialog = false"
                       >
                       Close
                      </v-btn>
                    </v-card>
                  </v-dialog>
              </div>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row
          class="mt-2"
          align="center"
          justify="center"
        >
          <span class="dark--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                class="ml-2"
                v-bind="attrs"
                v-on="on"
                color="#1A1A1A"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>


          <v-btn
            fab
            dark
            color="#FFC600"
            style="color:black;"
            class="mr-1 border border-dark"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            style="color:black;"
            color="#FFC600"
            class="ml-1 border border-dark"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <span
            class="mr-4
            dark--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
/* eslint-disable */
import axios from 'axios';
import Swal from 'sweetalert2';
import jobformEdit from '../subcomponents/jobformEdit';

export default {
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      dialog: false,
      itemsPerPage: 8,
      sortBy: 'IntituleOffre',
      keys: [

        'From',
        'To',
        'Address',
        'Description',
      ],
      items: [

      ],
      role: '',
      menu: false,
      modal: false,
      menu2: false,
      modal2: false,
    };
  },
  components:{
    jobformEdit,
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name');
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {   // for the data iterator
      this.itemsPerPage = number;
    },
    clone(obj) {            // Cloner un objet
      return Object.assign({}, obj);
    },
    renameKey(object, key, newKey) {  // function to change key names
      const clonedObj = this.clone(object);
      const targetKey = clonedObj[key];
      delete clonedObj[key];
      clonedObj[newKey] = targetKey;
      return clonedObj;
    },
    loadData(data) {  //fonction pour charger les offres
      for (let i = 0; i < data.length; i++) {
        data[i] = this.renameKey(data[i], 'NumOffre', 'Offer Number');
        data[i] = this.renameKey(data[i], 'Datedebut', 'From');
        data[i] = this.renameKey(data[i], 'DateFin', 'To');
        data[i] = this.renameKey(data[i], 'Lieu', 'Address');
        delete data[i].role;
        delete data[i].__v;
        delete data[i]._id;
        data[i].To = (data[i].To).substr(0,10);
        data[i].From = (data[i].From).substr(0,10);
      }
      this.items = data;
      console.log(this.items);
    },
    refreshPage(){
      this.$forceUpdate();
    },
    emitBack(){
      console.log("emitting");
      this.$emit('back');
      this.$root.$emit('reload');
    }
  },
  created() {
    axios.get('http://localhost:3000/getOffers').then((resp) => {
      this.loadData(resp.data.data);
    });

  },
  mounted(){
    this.$root.$on('reload', data => {
        console.log('reloading....');
        axios.get('http://localhost:3000/getOffers').then((resp) => {
          this.loadData(resp.data.data);
        });
    });
  },
};
</script>
