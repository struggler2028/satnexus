#ifndef SATELLITE_H
#define SATELLITE_H

#include <string>
using namespace std;

struct Satellite {
    int id;
    string name;
    float x;
    float y;

    Satellite(int id, string name, float x, float y) {
        this->id = id;
        this->name = name;
        this->x = x;
        this->y = y;
    }
};

#endif
