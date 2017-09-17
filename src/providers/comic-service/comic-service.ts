import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { md5 } from '../../assets/md5';

@Injectable()
export class ComicServiceProvider {

  private listComic:any[] = [];
  private listComicSearch:any[] = [];
  private _Comic:any[] = [];

  cargo: any;
  private _ts = Date();
  private _APIPrivate: String = "bf7f9221d44271a914312792b932f9228008508f";
  private _APIPublic:String = "d00c1f1ebadaaa622e5580dfc0b95104";
  private _Hash:String = "";
  private _offset = 20;

  private _URLBase: String = "https://gateway.marvel.com/v1/public/comics";
  searchQuery: string = '';
  
  constructor(public http: Http) {
  
    this.cargo = false;
    this._Hash = md5(this._ts + "" + this._APIPrivate + "" + this._APIPublic);
 
  }

  public load(index?: number, 
       isData?: boolean){
    if(this.cargo){
      return Promise.resolve(this.cargo);
    }
    return new Promise( resolve => {
      this.http.get(this._URLBase + "?format=comic&formatType=comic&hasDigitalIssue=true&ts=" + this._ts + "&apikey=" + this._APIPublic + "&hash=" + this._Hash + "&limit=50&offset=" + this._offset*(index-1))
      .map( res => res.json())
      .subscribe (data => {
        this.addMoreComic(data.data.results);
        // console.log(data.data.results);
        resolve(this.cargo);
      });
    })
  }

  public loadComic(_id: number){
    this.http.get(this._URLBase + "/" + _id + "?ts=" + this._ts + "&apikey=" + this._APIPublic + "&hash=" + this._Hash)
    .map( res => res.json())
    .subscribe (data => {
      this._Comic = data.data.results;
      // console.log(this._Comic);
    });
  }

  private addMoreComic(_listComic:any[]){
      this.listComic = this.listComic.concat(_listComic);
      this.listComicSearch = this.listComicSearch.concat(_listComic);
  }
  private initializeItems() {
    this.listComicSearch = this.listComic;
  }

  public getItems(ev: any) {

    this.initializeItems();
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.listComicSearch = this.listComicSearch.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
