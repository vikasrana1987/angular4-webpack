import { Injectable } from '@angular/core';

@Injectable()
export class DomService {

    addClass (element, classes) {
        for (let i = 0, length = classes.length; i < length; i++) {
            document.querySelector(element).classList.add (classes[i]);
        }
    }

    removeClass (element, classes) {
        for (let i = 0, length = classes.length; i < length; i++) {
            document.querySelector(element).classList.remove (classes[i]);
        }
    }
}
