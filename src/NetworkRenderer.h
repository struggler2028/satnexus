
#ifndef NETWORK_RENDERER_H
#define NETWORK_RENDERER_H

#include "SatelliteNetwork.h"
#include <SFML/Graphics.hpp>

class NetworkRenderer {
private:
    sf::RenderWindow window;
    sf::Font font;

    void drawLinks(const SatelliteNetwork& network);
    void drawSatellites(const SatelliteNetwork& network);

public:
    NetworkRenderer();

    bool initialize();

    void run(const SatelliteNetwork& network);
};

#endif
