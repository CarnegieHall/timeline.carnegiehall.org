import { GlobalData } from '$src/lib/GlobalData';
import { usePlayer } from '$src/stores/usePlayer';
import { parseSong, useSong } from '$src/stores/useSong';
import { useCallback, useContext, useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import { AudioElement } from './AudioElement';

export function GlobalPlayer() {
  const { settings } = useContext(GlobalData),
    [song, setSong] = useSong(
      useCallback((s) => [s.song, s.set], []),
      shallow
    ),
    [playing, status, setPlayer, musickit, init, busy] = usePlayer(
      useCallback(
        (s) => [s.playing, s.status, s.set, s.musickit, s.init, s.busy],
        []
      ),
      shallow
    ),
    [activePlayer, setActivePlayer] = useState<'local' | 'musickit'>(),
    local = song?.source?.type === 'local';

  /**
   * Initialise musickit
   */
  useEffect(() => {
    init();
  }, [init]);

  /**
   * @effect
   * Stop playing state at end of musickit song
   */
  useEffect(() => {
    function stopIfAtEnd() {
      if (
        musickit &&
        musickit?.player.currentPlaybackTimeRemaining === 0 &&
        playing
      ) {
        setPlayer({ playing: false });
      }
    }

    if (!musickit) {
      return;
    }

    musickit?.addEventListener('playbackProgressDidChange', stopIfAtEnd);
    return () => {
      musickit?.removeEventListener('playbackProgressDidChange', stopIfAtEnd);
    };
  }, [musickit, setPlayer, playing]);

  /**
   * @effect
   * Use default song if none set
   */
  useEffect(() => {
    if (!song || !Object.keys(song).length) {
      setSong(parseSong(settings.default_song));
    }
  }, [song, setSong, settings.default_song]);

  /**
   * @effect
   * Reset active player on song change
   */
  useEffect(() => {
    if (local) {
      setActivePlayer('local');
      return;
    }

    setActivePlayer(status === 'preauth' ? 'local' : 'musickit');
  }, [song, local, status]);

  /**
   * @effect
   * Reflect musickit auth status
   */
  useEffect(() => {
    const updateStatus = () => {
      setPlayer({ status: musickit?.isAuthorized ? 'authed' : 'preauth' });
    };

    updateStatus();
    musickit?.addEventListener('authorizationStatusDidChange', updateStatus);

    return () =>
      musickit?.removeEventListener(
        'authorizationStatusDidChange',
        updateStatus
      );
  }, [musickit, setPlayer]);

  /**
   * @effect
   * Reset player status after changing song
   */
  useEffect(() => {
    if (status === 'added') {
      setPlayer({ status: 'authed' });
    }
  }, [song, setPlayer]);

  /**
   * @effect
   * Reflect global playing state to musickit
   */
  useEffect(() => {
    async function update() {
      setPlayer({ busy: true });

      if (playing) {
        if (musickit?.player.queue.item(0)?.id !== song?.source?.appleId) {
          setPlayer({ loading: true });
          await musickit?.setQueue({ song: song?.source?.appleId });
        }
        await musickit?.player.play();
      } else if (!playing && musickit?.player.isPlaying) {
        await musickit?.player.pause();
      }
      setPlayer({ busy: false, loading: false });
    }

    if (activePlayer === 'musickit') {
      update();
    }
  }, [playing, setPlayer, activePlayer, song?.source?.appleId, musickit]);

  return (
    <AudioElement
      className="hidden"
      src={song?.audio}
      playing={activePlayer === 'local' ? playing : false}
      onEnded={() => setPlayer({ playing: false })}
    />
  );
}
