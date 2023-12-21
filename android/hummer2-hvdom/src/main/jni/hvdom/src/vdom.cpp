//
// Created by didi on 2023/11/20.
//

#include "hvdom/vdom.h"

ElementVDOM *vdom::createElement(string tag) {
    ElementVDOM *element = new ElementVDOM();
    element->tag = "dsdsds";
    element->value = nullptr;
    element->id = 1;

    return element;
}
