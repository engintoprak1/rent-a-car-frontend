import { Pipe, PipeTransform } from '@angular/core';
import { CarForList } from '../models/carForList';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: CarForList[], filterText: string): CarForList[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';

    return filterText
      ? value.filter(
          (c: CarForList) =>
            c.brandName.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            c.modelName.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            c.colorName.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            (c.brandName + " " + c.modelName + " " + c.colorName).toLocaleLowerCase().indexOf(filterText) !== -1 ||
            (c.colorName + " " + c.brandName + " " + c.modelName).toLocaleLowerCase().indexOf(filterText) !== -1 ||
            (c.colorName + " " + c.modelName).toLocaleLowerCase().indexOf(filterText) !== -1

        )
      : value;
  }
}
