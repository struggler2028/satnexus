from typing import List
from app.models.schemas import ScenarioItem
from app.services.graph_service import SatelliteNetworkService


class ScenarioService:
    @staticmethod
    def get_available_scenarios() -> List[ScenarioItem]:
        return [
            ScenarioItem(
                id="default_mesh",
                name="Orbital Resilient Mesh (8 Satellites)",
                description="8-satellite dual-plane constellation with 13 redundant cross-plane links. Optimal for demonstration.",
                node_count=8,
                link_count=13,
            ),
            ScenarioItem(
                id="starlink_polar",
                name="Starlink Polar Constellation (10 Satellites)",
                description="10 polar satellites in high-inclination orbit with intra-plane laser crosslinks and ground relay anchors.",
                node_count=10,
                link_count=16,
            ),
            ScenarioItem(
                id="walker_delta",
                name="Walker Delta 12/3/1 Constellation (12 Satellites)",
                description="12 satellites distributed across 3 orbital planes inclined at 53 degrees, modeling commercial broadband megaconstellations.",
                node_count=12,
                link_count=22,
            ),
        ]

    @staticmethod
    def load_scenario(service: SatelliteNetworkService, scenario_id: str) -> bool:
        if scenario_id == "default_mesh":
            service.load_default_topology()
            return True

        elif scenario_id == "starlink_polar":
            service.clear()
            nodes = [
                (1, "STAR-P1", 120.0, 150.0, "Polar-Plane-1"),
                (2, "STAR-P2", 280.0, 130.0, "Polar-Plane-1"),
                (3, "STAR-P3", 450.0, 120.0, "Polar-Plane-1"),
                (4, "STAR-P4", 650.0, 140.0, "Polar-Plane-1"),
                (5, "STAR-P5", 850.0, 170.0, "Polar-Plane-1"),
                (6, "STAR-P6", 880.0, 480.0, "Polar-Plane-2"),
                (7, "STAR-P7", 680.0, 520.0, "Polar-Plane-2"),
                (8, "STAR-P8", 480.0, 540.0, "Polar-Plane-2"),
                (9, "STAR-P9", 280.0, 500.0, "Polar-Plane-2"),
                (10, "STAR-P10", 120.0, 440.0, "Polar-Plane-2"),
            ]
            for nid, name, x, y, plane in nodes:
                service.add_satellite(nid, name, x, y, plane)

            links = [
                # Intra-plane links
                (1, 2, 9.0), (2, 3, 11.0), (3, 4, 10.0), (4, 5, 12.0),
                (6, 7, 9.5), (7, 8, 10.5), (8, 9, 11.5), (9, 10, 9.0),
                # Inter-plane crosslinks
                (1, 10, 14.0), (2, 9, 15.0), (3, 8, 13.5), (4, 7, 16.0), (5, 6, 14.5),
                (1, 9, 21.0), (2, 8, 22.0), (4, 6, 18.0)
            ]
            for u, v, w in links:
                service.add_link(u, v, w)
            return True

        elif scenario_id == "walker_delta":
            service.clear()
            nodes = [
                (1, "WLK-A1", 150.0, 140.0, "Plane-A"),
                (2, "WLK-A2", 380.0, 120.0, "Plane-A"),
                (3, "WLK-A3", 620.0, 120.0, "Plane-A"),
                (4, "WLK-A4", 850.0, 150.0, "Plane-A"),
                (5, "WLK-B1", 140.0, 320.0, "Plane-B"),
                (6, "WLK-B2", 370.0, 310.0, "Plane-B"),
                (7, "WLK-B3", 630.0, 310.0, "Plane-B"),
                (8, "WLK-B4", 860.0, 330.0, "Plane-B"),
                (9, "WLK-C1", 160.0, 520.0, "Plane-C"),
                (10, "WLK-C2", 390.0, 540.0, "Plane-C"),
                (11, "WLK-C3", 640.0, 530.0, "Plane-C"),
                (12, "WLK-C4", 840.0, 510.0, "Plane-C"),
            ]
            for nid, name, x, y, plane in nodes:
                service.add_satellite(nid, name, x, y, plane)

            links = [
                # Plane A intra
                (1, 2, 11.0), (2, 3, 10.5), (3, 4, 12.0),
                # Plane B intra
                (5, 6, 11.2), (6, 7, 10.8), (7, 8, 11.9),
                # Plane C intra
                (9, 10, 10.5), (10, 11, 11.0), (11, 12, 12.2),
                # Inter-plane crosslinks (A <-> B)
                (1, 5, 14.0), (2, 6, 13.5), (3, 7, 14.2), (4, 8, 15.0),
                (1, 6, 19.0), (2, 7, 18.5), (3, 8, 20.0),
                # Inter-plane crosslinks (B <-> C)
                (5, 9, 14.5), (6, 10, 13.8), (7, 11, 14.0), (8, 12, 15.5),
                (5, 10, 19.5), (6, 11, 18.0),
            ]
            for u, v, w in links:
                service.add_link(u, v, w)
            return True

        return False
