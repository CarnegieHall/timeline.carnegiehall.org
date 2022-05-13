import create from 'zustand';

export type PlayerStatus = 'preauth' | 'authed' | 'added' | 'error' | 'loading';

type AudioPlayer = {
  playing?: boolean;
  busy?: boolean;
  loading?: boolean;
  status?: PlayerStatus;
};

type UsePlayer = {
  set(state: AudioPlayer): void;
  init(): void;
  musickit?: MusicKit.MusicKitInstance | null;
  musickitLoading?: boolean;
} & AudioPlayer;

async function initMusickit() {
  const { token } = await fetch('/api/musicKit').then((r) => r.json());
  const configure = () => {
    window.MusicKit.configure({
      developerToken: token
    });
  };

  if (!!window.MusicKit) {
    configure();
  } else {
    document.addEventListener('musickitloaded', configure);
  }

  return window.MusicKit?.getInstance();
}

export const usePlayer = create<UsePlayer>((set, get) => {
  return {
    playing: false,
    busy: false,
    loading: false,
    status: 'preauth',
    musickit: null,
    musickitLoading: true,
    set: (state) => set(state),
    init: async () => {
      if (get().musickit) {
        console.warn('Musickit already initialised');
        return;
      }
      set({ musickitLoading: true });
      const musickit = await initMusickit();
      set({ musickit, musickitLoading: false });
    }
  };
});
