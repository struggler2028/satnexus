
cmake_minimum_required(VERSION 3.20)

project(SatNexus LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(SFML 3 COMPONENTS Graphics Window System REQUIRED)

add_executable(SatNexus
    src/main.cpp
    src/SatelliteNetwork.cpp
    src/NetworkRenderer.cpp
)

target_link_libraries(SatNexus PRIVATE
    SFML::Graphics
    SFML::Window
    SFML::System
)
