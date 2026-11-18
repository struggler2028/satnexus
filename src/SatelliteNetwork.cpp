
#include "SatelliteNetwork.h"
#include <iostream>

int SatelliteNetwork::findIndex(int id) const {
    for (int i = 0; i < static_cast<int>(satellites.size()); i++) {
        if (satellites[i].id == id) {
            return i;
        }
    }

    return -1;
}

bool SatelliteNetwork::addSatellite(
    int id, std::string name, float x, float y) {

    if (id < 0 || name.empty() || findIndex(id) != -1) {
        return false;
    }

    satellites.emplace_back(id, name, x, y);
    adj.emplace_back();

    return true;
}

bool SatelliteNetwork::addLink(int from, int to, float weight) {
    int u = findIndex(from);
    int v = findIndex(to);

    if (u == -1 || v == -1 || u == v || weight <= 0) {
        return false;
    }

    for (const auto& link : adj[u]) {
        if (link.destination == to) {
            return false;
        }
    }

    adj[u].push_back({to, weight});
    adj[v].push_back({from, weight});

    return true;
}

void SatelliteNetwork::displayNetwork() const {
    std::cout << "\n===== SATNEXUS NETWORK =====\n";

    for (int i = 0; i < static_cast<int>(satellites.size()); i++) {
        std::cout << satellites[i].name
                  << " (ID: " << satellites[i].id << ") -> ";

        for (const auto& link : adj[i]) {
            std::cout << "[SAT-" << link.destination
                      << ", Weight: " << link.weight << "] ";
        }

        std::cout << '\n';
    }
}

const std::vector<Satellite>&
SatelliteNetwork::getSatellites() const {
    return satellites;
}

const std::vector<std::vector<Link>>&
SatelliteNetwork::getAdjacencyList() const {
    return adj;
}
