import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero; // name: type

  constructor(
    private route: ActivatedRoute, // holds information about the route to this instance of the HeroDetailComponent
    private heroService: HeroService, // gets hero data from the remote server and this component will use it to get the hero-to-display
    private location: Location // an Angular service for interacting with the browser
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot // the route.snapshot is a static image of the route information shortly after the component was created.
    .paramMap.get('id'); // the paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.

    this.heroService.getHero(id).subscribe(hero => this.hero = hero)
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
