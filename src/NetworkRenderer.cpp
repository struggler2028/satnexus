
#include "NetworkRenderer.h"
#include <string>

NetworkRenderer::NetworkRenderer()
    : window(sf::VideoMode({1000u, 700u}), "SatNexus - Satellite Network") {
}

bool NetworkRenderer::initialize() {
    if (!font.openFromFile("assets/arial.ttf")) {
        return false;
    }

    window.setFramerateLimit(60);
    return true;
}

void NetworkRenderer::drawLinks(const SatelliteNetwork& network) {
    const auto& satellites = network.getSatellites();
    const auto& adj = network.getAdjacencyList();

    for (int i = 0; i < static_cast<int>(satellites.size()); i++) {
        for (const auto& link : adj[i]) {
            int j = -1;

            for (int k = 0; k < static_cast<int>(satellites.size()); k++) {
                if (satellites[k].id == link.destination) {
                    j = k;
                    break;
                }
            }

            if (j == -1 || satellites[i].id > satellites[j].id) {
                continue;
            }

            sf::Vector2f start(satellites[i].x, satellites[i].y);
            sf::Vector2f end(satellites[j].x, satellites[j].y);

            sf::Vertex line[] = {
                sf::Vertex(start, sf::Color(70, 180, 255)),
                sf::Vertex(end, sf::Color(70, 180, 255))
            };

            window.draw(line, 2, sf::PrimitiveType::Lines);

            sf::Vector2f middle(
                (start.x + end.x) / 2.0f,
                (start.y + end.y) / 2.0f
            );

            sf::Text weightText(font, std::to_string(link.weight), 16);
            weightText.setFillColor(sf::Color::White);
            weightText.setPosition(middle);

            window.draw(weightText);
        }
    }
}

void NetworkRenderer::drawSatellites(
    const SatelliteNetwork& network) {

    const auto& satellites = network.getSatellites();

    for (const auto& satellite : satellites) {
        sf::CircleShape node(25.0f);

        node.setOrigin({25.0f, 25.0f});
        node.setPosition({satellite.x, satellite.y});
        node.setFillColor(sf::Color(0, 150, 220));
        node.setOutlineThickness(3);
        node.setOutlineColor(sf::Color::Cyan);

        window.draw(node);

        sf::Text label(font, satellite.name, 18);
        label.setFillColor(sf::Color::White);
        label.setPosition({satellite.x - 30, satellite.y + 35});

        window.draw(label);
    }
}

void NetworkRenderer::run(const SatelliteNetwork& network) {
    while (window.isOpen()) {
        while (const auto event = window.pollEvent()) {
            if (event->is<sf::Event::Closed>()) {
                window.close();
            }
        }

        window.clear(sf::Color(12, 20, 38));

        drawLinks(network);
        drawSatellites(network);

        window.display();
    }
}
