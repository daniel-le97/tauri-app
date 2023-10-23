import { writable } from "svelte/store";

export const initialAppState= {
  current: 0,
  id: 0,
  email: "",
  asset: "",
  ticket: "",
  phone: "",
  description: "",
  textEditorDescription: "",
  textEditor: false,
  timerCount: "",
  timerOn: false,
  date: new Date(),
  formatted: "",
  formattedTime: "00:00:00",
};
export type AppState = typeof initialAppState

export const appState = writable(initialAppState);

export function resetAppState() {
  appState.set({
    current: 0,
    id: 0,
    email: "",
    asset: "",
    ticket: "",
    phone: "",
    description: "",
    textEditorDescription: "",
    textEditor: false,
    timerCount: "",
    timerOn: false,
    date: new Date(),
    formatted: "",
    formattedTime: "00:00:00",
  });
}

export const templateState = writable({
  content: '',
  tag: '',
  title: ''
})