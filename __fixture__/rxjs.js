import { Observable, Subject } from 'rxjs';

// Normal import
import 'rxjs/observable/interval'
import 'rxjs/observable/zip';

const trigger$ = Reflect.construct(Subject, []);
const timer$ = Observable.interval(1000);

Observable.zip(trigger$, timer$).subscribe((value) => {
  console.log(value);
});