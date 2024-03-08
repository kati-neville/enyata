//@ts-ignore
import ColorThief from "colorthief";
import { Themes } from "@/components/theme-switcher";
import { BASE_URL, POKEMONS, THEME } from "./constants";

export function handleSetTheme(theme: Themes) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME, theme);
}

export function handlePersistPokemons(
  pokemons: { name: string; url: string }[],
) {
  localStorage.setItem(POKEMONS, JSON.stringify(pokemons));
}

export function handleGetPersistedPokemons() {
  try {
    return JSON.parse(localStorage.getItem(POKEMONS) || "");
  } catch (error) {
    return null;
  }
}

export function getDominantColor(imageUrl: string, callback: Function) {
  const img = document.createElement("IMG");
  const colorThief = new ColorThief();
  img.setAttribute("src", imageUrl);
  //@ts-ignore
  img.crossOrigin = "Anonymous";
  //@ts-ignore
  if (img.complete) {
    callback(colorThief.getColor(img));
  } else {
    img.addEventListener("load", function () {
      callback(colorThief.getColor(img));
    });
  }
}

export async function fetchPokemonCardData(name: string) {
  const response = await fetch(`${BASE_URL}/pokemon/${name}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();

    return data;
  } else {
    throw new Error("Failed, to fetch data");
  }
}

export function resolveTypeIcon(type: string) {
  let icon = "";
  switch (type.toLowerCase()) {
    case "flying":
      icon = "🦋";
      break;
    case "grass":
      icon = "🌿";
      break;
    case "ghost":
      icon = "👻";
      break;
    case "water":
      icon = "🌊";
      break;
    case "electric":
      icon = "⚡️";
      break;
    case "poison":
      icon = "☠️";
      break;
    case "normal":
      icon = "🐻";
      break;
    case "bug":
      icon = "🐞";
      break;

    default:
      icon = "🔥";
      break;
  }

  return icon;
}

export async function fetchPokemonCardTypes(typeUrl: string) {
  const response = await fetch(`${typeUrl}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();

    return data;
  } else {
    throw new Error("Failed, to fetch types");
  }
}
