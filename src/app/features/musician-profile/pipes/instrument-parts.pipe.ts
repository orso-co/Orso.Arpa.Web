import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instrumentParts',
})
export class InstrumentPartsPipe implements PipeTransform {

  private parts = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

  transform(value: number | number[]): string {
    if (Array.isArray(value)) {
      const result: string[] = [];
      value.forEach(v => {
        result.push(this.parts[v - 1]);
      });
      return result.join(', ');
    }
    return this.parts[value as number - 1];
  }

}
