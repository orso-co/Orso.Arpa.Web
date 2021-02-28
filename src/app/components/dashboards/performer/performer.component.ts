import { Component, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'arpa-performer',
  templateUrl: './performer.component.html',
  styleUrls: ['./performer.component.scss']
})
export class PerformerComponent implements OnDestroy {
private subs = new SubSink();

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
