import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search', pure: false})
export class SearchPipe implements PipeTransform {
  
  transform(input: any, orderer: string, reverse: boolean = false): any {
    if (input && orderer)
    {
      return input.filter((item) => {
        let value:string = "";
        for(var key in item) {
          if (item[key]["department"] === undefined) {
            value += item[key];
          }
          else {
            value += item[key]["department"]
          }
        }
        return value.includes(orderer);
      });
    } 
    return input; 
  }
}