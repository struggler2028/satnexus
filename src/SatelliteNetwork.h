
#ifndef SATELLITE_NETWORK_H
#define SATELLITE_NETWORK_H

#include "Satellite.h"
#include <vector>
#include <string>

struct Link {
    int destination;
    float weight;
};

class SatelliteNetwork {
private:
    std::vector<Satellite> satellites;
    std::vector<std::vector<Link>> adj;

    int findIndex(int id) const;

public:
    bool addSatellite(int id, std::string name, float x, float y);

    bool addLink(int from, int to, float weight);

    void displayNetwork() const;

    const std::vector<Satellite>& getSatellites() const;

    const std::vector<std::vector<Link>>& getAdjacencyList() const;
};

#endif
