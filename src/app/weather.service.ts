import { Injectable } from '@angular/core';

import { CurrentWeather } from './current-weather';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  current:CurrentWeather=new CurrentWeather('','',
  '','','','')
  private apiURL='https://api.openweathermap.org/data/2.5/';
  private appKey='c3d93bafc80f940ffa58e019b470d77c';

  constructor(private http:HttpClient) { }

  weatherNow(){
    return this.current;
  }

  localWeather(cityName:string):Observable<any>{
    return this.http.get(this.apiURL+'weather?units=metric&appid='+this.appKey+'&q='+cityName);
  }

  forecastWeather(cityName:string):Observable<any>{
    return this.http.get(this.apiURL+'forecast?units=metric&appid='+this.appKey+'&q='+cityName);
  }

}
