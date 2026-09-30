"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  type MapRef,
} from "react-map-gl/maplibre";
import type { Map as MapLibreMap, MapLibreEvent } from "maplibre-gl";
import { useReducedMotion, motion } from "motion/react";
import { LionMark } from "@/components/brand/LionMark";
import "maplibre-gl/dist/maplibre-gl.css";

// 57 W Main St, Plantsville, CT 06479 (US Census geocoder)
const SHOP = { latitude: 41.587592, longitude: -72.891211 };
// Free vector tiles, no API key: https://openfreemap.org
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
/** Wide town view the map starts from before gliding in to the shop. */
const START_VIEW = { zoom: 12.5, pitch: 0, bearing: 0 };

/** Served from public/maplibre/ (copied there by scripts/copy-maplibre-worker.mjs). */
const WORKER_URL = "/maplibre/maplibre-gl-worker.mjs";
function loadMapLib() {
  return import("maplibre-gl").then((lib) => {
    lib.setWorkerUrl(WORKER_URL);
    return lib;
  });
}

/** Read a brand token from globals.css so the map never hard-codes colors. */
function token(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

/** Recolor the Positron base style with the Lions Den palette. */
function applyBrandStyle(map: MapLibreMap) {
  const c = {
    espresso: token("--color-espresso"),
    gold: token("--color-gold"),
    bronze: token("--color-bronze"),
    latte: token("--color-latte"),
    cream: token("--color-cream"),
    white: token("--color-warm-white"),
  };
  type PaintProp = Parameters<MapLibreMap["setPaintProperty"]>[1];
  const paint = (layer: string, prop: PaintProp, value: string | number) => {
    if (!map.getLayer(layer)) return;
    try {
      map.setPaintProperty(layer, prop, value);
    } catch {
      /* layer type doesn't support this property */
    }
  };

  paint("background", "background-color", c.cream);
  paint("landuse_residential", "fill-color", c.cream);
  paint("landuse_residential", "fill-opacity", 0.6);
  for (const l of ["park", "landcover_wood"]) {
    paint(l, "fill-color", c.latte);
    paint(l, "fill-opacity", 0.28);
  }
  paint("water", "fill-color", c.latte);
  paint("water", "fill-opacity", 0.55);
  paint("waterway", "line-color", c.latte);
  paint("building", "fill-color", c.latte);
  paint("building", "fill-opacity", 0.35);

  for (const l of [
    "highway_path",
    "highway_minor",
    "highway_major_inner",
    "highway_major_subtle",
  ])
    paint(l, "line-color", c.white);
  for (const l of ["highway_major_casing", "tunnel_motorway_casing"])
    paint(l, "line-color", c.latte);
  for (const l of [
    "highway_motorway_inner",
    "highway_motorway_subtle",
    "highway_motorway_bridge_inner",
    "tunnel_motorway_inner",
  ])
    paint(l, "line-color", c.gold);
  for (const l of ["highway_motorway_casing", "highway_motorway_bridge_casing"])
    paint(l, "line-color", c.bronze);
  for (const l of [
    "railway",
    "railway_service",
    "railway_transit",
    "boundary_2",
    "boundary_3",
  ])
    paint(l, "line-color", c.latte);

  for (const layer of map.getStyle().layers ?? []) {
    if (layer.type !== "symbol") continue;
    paint(layer.id, "text-color", c.espresso);
    paint(layer.id, "text-halo-color", c.cream);
    paint(layer.id, "text-halo-width", 1.4);
  }
}

export default function VisitMap() {
  const mapRef = useRef<MapRef>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [styled, setStyled] = useState(false);
  // Load MapLibre in the browser only, with the worker path set first.
  const mapLib = useMemo(
    () => (typeof window === "undefined" ? undefined : loadMapLib()),
    [],
  );

  const onLoad = useCallback((event: MapLibreEvent) => {
    try {
      applyBrandStyle(event.target);
    } finally {
      setStyled(true);
    }
  }, []);

  const [arrived, setArrived] = useState(false);
  const arrivedRef = useRef(false);

  // Glide in from the wider town view every time the map scrolls into view,
  // and snap back out (unanimated) when it leaves so the next visit replays.
  useEffect(() => {
    if (!styled || !wrapRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const map = mapRef.current;
        if (!map) return;
        if (entry.intersectionRatio >= 0.4 && !arrivedRef.current) {
          arrivedRef.current = true;
          map.flyTo({
            center: [SHOP.longitude, SHOP.latitude],
            zoom: 15.6,
            pitch: 35,
            bearing: -12,
            duration: reduced ? 0 : 2600,
            essential: true,
          });
          setArrived(true);
        } else if (!entry.isIntersecting && arrivedRef.current) {
          // Fully off-screen, so the reset is never visible.
          arrivedRef.current = false;
          map.stop();
          map.jumpTo({
            ...START_VIEW,
            center: [SHOP.longitude, SHOP.latitude],
          });
          setArrived(false);
        }
      },
      { threshold: [0, 0.4] },
    );
    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, [styled, reduced]);

  return (
    <div
      ref={wrapRef}
      className={`visit-map ${styled ? "is-styled" : ""}`}
      role="region"
      aria-label="Map showing Lions Den Coffee Shop at 57 W Main St, Plantsville"
    >
      <Map
        ref={mapRef}
        mapLib={mapLib}
        mapStyle={STYLE_URL}
        initialViewState={{ ...SHOP, ...START_VIEW }}
        onLoad={onLoad}
        scrollZoom={false}
        cooperativeGestures
        attributionControl={{ compact: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" showCompass={false} />
        <Marker {...SHOP} anchor="bottom">
          <a
            className="map-pin"
            href="https://www.google.com/maps/dir/?api=1&destination=57+W+Main+St+Plantsville+CT+06479"
            target="_blank"
            rel="noreferrer"
            aria-label="Get directions to Lions Den Coffee Shop"
          >
            <motion.span
              className="map-pin-card"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={
                arrived
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: { delay: reduced ? 0 : 2.4, duration: 0.4 },
                    }
                  : { opacity: 0, y: 8, transition: { duration: 0 } }
              }
            >
              <strong>Lions Den</strong>
              <span>57 W Main St</span>
            </motion.span>
            <span className="map-pin-badge">
              <span className="map-pin-pulse" aria-hidden />
              <LionMark decorative />
            </span>
            <span className="map-pin-tip" aria-hidden />
          </a>
        </Marker>
      </Map>
    </div>
  );
}
