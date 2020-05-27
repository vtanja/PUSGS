import { Component, OnInit, ViewChild, QueryList, ViewChildren, ElementRef, Input } from '@angular/core';
import { AnimatedDigitComponent } from '../../../animated/animated-digit.compoanent';

@Component({
  selector: 'app-admin-home-counter-card',
  templateUrl: './admin-home-counter-card.component.html',
  styleUrls: ['./admin-home-counter-card.component.css']
})
export class AdminHomeCounterCardComponent implements OnInit {

  @Input('image') image:string;
  @Input('countTo') counter:number;
  @Input('text') text:string;

  nums: Array<number> = [25, 76, 48];

  @ViewChild("oneItem") oneItem: any;
  @ViewChildren("count") count: QueryList<any>;

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.animateCount();
  }

  animateCount() {
    let _this = this;

    let single = this.oneItem.nativeElement.innerHTML;

    this.counterFunc(single, this.oneItem, 7000);

    this.count.forEach(item => {
      _this.counterFunc(item.nativeElement.innerHTML, item, 2000);
    });
  }

  counterFunc(end: number, element: any, duration: number) {
    let range, current: number, step, timer;

    range = end - 0;
    current = 0;
    step = Math.abs(Math.floor(duration / range));

    timer = setInterval(() => {
      current += 1;
      element.nativeElement.textContent = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, step);
  }

}
