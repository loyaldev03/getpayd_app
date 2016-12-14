/*
 * Example use
 *    Basic Array of single type: *ngFor="#todo of todoService.todos | orderBy : '-'"
 *    Multidimensional Array Sort on single column: *ngFor="#todo of todoService.todos | orderBy : ['-status']"
 *    Multidimensional Array Sort on multiple columns: *ngFor="#todo of todoService.todos | orderBy : ['status', '-title']"
 */

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'orderBy', pure: false})
export class OrderByPipe implements PipeTransform {

    transform(input: any, orderer: string, reverse: boolean = false): any {
        if (input && orderer) {
            let output = input.sort(this.dynamicSort(orderer));
            if (reverse) {
                return output.reverse();
            } else {
                return output;
            }
        } else {
            return input;
        }
    }

    private dynamicSort(property: string): any {
       if (property != "department") {
            return (a: any, b: any) => {
                return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            }            
        }
        else {
            return (a: any, b: any) => {
                let depart_a = a[property] === undefined? undefined : a[property].department;
                let depart_b = b[property] === undefined? undefined : b[property].department;
                return (a[property].department < b[property].department) ? -1 : (a[property].department > b[property].department) ? 1 : 0;
            }    
        }
    }
}