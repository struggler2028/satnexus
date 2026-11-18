
#include <iostream>
#include "SatelliteNetwork.h"
#include "NetworkRenderer.h"

int main() {
    SatelliteNetwork network;

    network.addSatellite(1, "SAT-A", 150, 180);
    network.addSatellite(2, "SAT-B", 450, 130);
    network.addSatellite(3, "SAT-C", 300, 400);
    network.addSatellite(4, "SAT-D", 700, 350);
    network.addSatellite(5, "SAT-E", 850, 150);

    network.addLink(1, 2, 10);
    network.addLink(1, 3, 20);
    network.addLink(2, 4, 15);
    network.addLink(3, 4, 12);
    network.addLink(2, 5, 18);
    network.addLink(4, 5, 8);

    network.displayNetwork();

    NetworkRenderer renderer;

    if (!renderer.initialize()) {
        std::cerr << "Error: Could not load font.\n";
        return 1;
    }

    renderer.run(network);

    return 0;
}
