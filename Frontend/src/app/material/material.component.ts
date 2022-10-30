import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import {UrbanService} from '../Urban.service'

@Component({
  selector: 'app-materiales',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})

export class MaterialesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
