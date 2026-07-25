/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string;
      alt?: string;
      crossorigin?: string;
      "camera-controls"?: boolean;
      "auto-rotate"?: boolean;
      "disable-zoom"?: boolean;
      "disable-pan"?: boolean;
      "environment-image"?: string;
      exposure?: string;
      "shadow-intensity"?: string;
      poster?: string;
      "poster-color"?: string;
      bounds?: string;
      "camera-target"?: string;
      "camera-orbit"?: string;
      "min-camera-orbit"?: string;
      "max-camera-orbit"?: string;
      "interaction-prompt"?: string;
      "interaction-prompt-threshold"?: string;
    };
  }
}
