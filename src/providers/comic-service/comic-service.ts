import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { md5 } from '../../assets/md5';

@Injectable()
export class ComicServiceProvider {

  private listComic:any[] = [];
  private listComicSearch:any[] = [];

  private _Comic:any[] = [];
  private _Chara:any[] = [];
  private _Serie:any[] = [];
  
  cargo: any;
  private _ts = 1;
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
      console.log(this._URLBase + "?format=comic&formatType=comic&hasDigitalIssue=true&ts=" + this._ts + "&apikey=" + this._APIPublic + "&hash=" + this._Hash + "&limit=50&offset=" + this._offset*(index-1));
      this.http.get(this._URLBase + "?format=comic&formatType=comic&hasDigitalIssue=true&ts=" + this._ts + "&apikey=" + this._APIPublic + "&hash=" + this._Hash + "&limit=50&offset=" + this._offset*(index-1))
      .map( res => res.json())
      .subscribe (data => {
        this.addMoreComic(data.data.results);
        resolve(this.cargo);
      });
    })
  }

  public loadComic(_id: number){
    this.http.get(this._URLBase + "/" + _id + "?ts=" + this._ts + "&apikey=" + this._APIPublic + "&hash=" + this._Hash)
    .map( res => res.json())
    .subscribe (data => {
      this._Comic = data.data.results;
    });
  }

  public loadChara(_URLChara: String){
    _URLChara = this.replaceHTTPtoHTTPS(_URLChara);
    this.http.get(_URLChara + "?ts=" + this._ts + "&apikey=" + this._APIPublic + "&hash=" + this._Hash)
    .map( res => res.json())
    .subscribe (data => {
      this._Chara = data.data.results;
    });
  }

  public loadSerie(_ULRSerie: String){
    _ULRSerie = this.replaceHTTPtoHTTPS(_ULRSerie);
    this.http.get(_ULRSerie + "?ts=" + this._ts + "&apikey=" + this._APIPublic + "&hash=" + this._Hash)
    .map( res => res.json())
    .subscribe (data => {
      this._Serie = data.data.results;
    });
  }

  private addMoreComic(_listComic:any[]){
      this.listComic = this.listComic.concat(_listComic);
      this.listComicSearch = this.listComicSearch.concat(_listComic);
  }
  private initializeItems() {
    this.listComicSearch = this.listComic;
  }
  private replaceHTTPtoHTTPS(_URL){
    var _rHTTP = /http/gi;
    return _URL.replace(_rHTTP,"https");
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
