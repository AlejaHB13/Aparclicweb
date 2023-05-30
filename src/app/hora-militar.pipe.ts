import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horaMilitar'
})
export class HoraMilitarPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const [time, modifier] = value.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = (parseInt(hours, 10) + 12).toString();
    }

    return `${hours}:${minutes}`;
  }
}

