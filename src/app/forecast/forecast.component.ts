import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WeatherService} from '../weather.service';
import {ForecastWeather} from '../forecast-weather';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  formBuilder = new FormBuilder();
  currentForm = this.formBuilder.group({
    cityName: ['', Validators.required]
  });
  forecastWeather:ForecastWeather[]=[];
  constructor(private _weatherService:WeatherService) { }

  ngOnInit() {
  }

  onSubmit(weatherForm:any){
    this._weatherService.forecastWeather(weatherForm.cityName).subscribe(
      (data)=>{
        for(let i=0;i<data.list.length;i+=8){
          const temporary=new ForecastWeather(data.list[i].dt_txt,
                                                data.list[i].weather[0].icon,
                                                data.list[i].main.temp_max,
                                                data.list[i].main.temp_max,
                                                data.list[i].main.temp_min)
          this.forecastWeather.push(temporary);
        }
      }
    )
  }

}
