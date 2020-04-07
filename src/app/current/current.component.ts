import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService} from '../weather.service';
import {CurrentWeather} from '../current-weather';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  myWeather:CurrentWeather;
  showWeather:boolean=false;
   lat:string='';
   lon:string='';
  formBuilder = new FormBuilder();
  currentForm = this.formBuilder.group({
    cityName: ['', Validators.required]
  });
  constructor(private _weatherService:WeatherService) { }

  ngOnInit() {
    //this.myWeather=this._weatherService.weatherNow();
  }

  onSubmit(weatherForm:any){
    console.log(weatherForm);
    this._weatherService.localWeather(weatherForm.cityName).subscribe(
      (data)=>{
        console.log(data);
        this.myWeather=new CurrentWeather(data.name,
                                          data.main.temp,
                                          data.weather[0].icon,
                                          data.main.humidity,
                                          data.main.temp_max,
                                          data.main.temp_min)
        this.lon=data.coord.lon;
        this.lat=data.coord.lat;
        this.showWeather=true;
      }
    )
  }

}
