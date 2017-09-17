import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CharacterPage } from '../character/character';
import { SeriePage } from '../serie/serie';
import { ComicServiceProvider } from '../../providers/comic-service/comic-service';

@IonicPage()
@Component({
  selector: 'page-comic',
  templateUrl: 'comic.html',
  providers: [ ComicServiceProvider ]
})
export class ComicPage {

  private _dbComic: ComicServiceProvider;
  
    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public dbComic: ComicServiceProvider) {
                  this._dbComic = navParams.get("dbComic");
                  dbComic.loadComic(this._dbComic["id"]);
    }
  
    pushPage(_Comicdb, _URL, type){
      if(type == "Chara"){
        this.navCtrl.push(CharacterPage,{
          dbComic: _Comicdb,
          URLChara: _URL
        });
      }
      else if(type == "Serie"){
        this.navCtrl.push(SeriePage,{
          dbComic: _Comicdb,
          URLSerie: _URL
        });
      }
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad ComicPage');
    }

}
