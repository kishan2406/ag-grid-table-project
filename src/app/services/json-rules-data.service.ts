import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rule } from '../models/rules';

@Injectable({
  providedIn: 'root'
})
export class JsonRulesDataService {
private jsonUrl = '../../assets/rules.json'
  constructor(private http:HttpClient) { }

  getRules():Observable<Rule[]>{

    return this.http.get<Rule[]>(this.jsonUrl)
  
  }
}
