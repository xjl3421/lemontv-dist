export { Flv };
/** 并非所有事件都可用 */
export type EventTypes =
  | "loadstart"
  | "loadeddata"
  | "play"
  | "pause"
  | "ended"
  | "error"
  | "playing"
  | "seeking"
  | "seeked"
  | "timeupdate"
  | "waiting"
  | "canplay"
  | "canplaythrough"
  | "durationchange"
  | "volumechange"
  | "ratechange"
  | "video_resize"
  | "definition_change"
  | "user_action"
  | "rotate"
  | "definition_change"
  | "retry"
  | "replay"
  | "destroy"
  | "mini_state_change"
  | "cssFullscreen_change"
  | "fullscreen_change"
  | "blur"
  | "focus"
  | "complete"
  | "autoplay_started"
  | "autoplay_was_prevented"
  | "ready"
  | "pip_change";

declare class Flv extends EventEmitter<EventTypes> {
  static isSupported(mediaType: ("video" | "audio") | null): boolean;
  static enableLogger(): void;
  static disableLogger(): void;

  constructor(opts: FlvOption);
  media: HTMLMediaElement | null;
  _loading: boolean;
  _opts: FlvOption;
  _bufferService: K.BufferService;
  _gapService: K.GapService;
  _stats: K.MediaStatsService;
  _mediaLoader: K.NetLoader;
  _maxChunkWaitTimer: any;
  _tickTimer: any;
  _tickInterval: number;
  _urlSwitching: boolean;
  _seamlessSwitching: boolean;
  _disconnectRetryCount: number;
  _preLoadEndPoint: number;
  _keyframes: any;
  _acceptRanges: boolean;
  _firstProgressEmit: boolean;
  _seiService: K.SeiService;
  _bandwidthService: K.BandwidthService;
  get version(): any;
  get isLive(): boolean;
  get baseDts(): number;
  get seekable(): boolean;
  get loader(): K.NetLoader;
  get blobUrl(): any;
  speedInfo(): {
    speed: any;
    avgSpeed: number;
  };
  getStats(): K.Stats;
  bufferInfo(maxHole?: number): {
    start: number;
    end: number;
    buffers: [number, number][];
    remaining: number;
    index?: number;
    nextStart?: number;
    nextEnd?: number;
    prevStart?: number;
    prevEnd?: number;
  };
  playbackQuality(): {
    droppedVideoFrames?: undefined;
    totalVideoFrames?: undefined;
    creationTime?: undefined;
  } | {
    droppedVideoFrames: any;
    totalVideoFrames: any;
    creationTime: any;
  };
  load(url?: string, reuseMse?: boolean): Promise<any>;
  replay(seamlesslyReload: boolean, isPlayEmit: any): Promise<any>;
  disconnect(): Promise<void>;
  switchURL(url: string, seamless?: boolean): Promise<void>;
  destroy(): Promise<any>;
  _emitError(error: any, endOfStream?: boolean): void;
  _reset(reuseMse?: boolean): Promise<void>;
  _loadData(url: any, range: any): Promise<void>;
  /**
   * startTime: 当前流式分段开始read时间
   * endTime: 当前流式分段结束read时间
   * st: 拉流开始时间
   * firstByteTime: 首字节响应时间
   */
  _onProgress: (
    chunk: ArrayBuffer,
    done: boolean,
    { startTime, endTime, st, firstByteTime }: {
      startTime: number;
      endTime: number;
      st: number;
      firstByteTime: number;
    },
    response: Response,
  ) => Promise<void>;
  _onRetryError: (error: any, retryTime: any) => void;
  _clear(): Promise<void>;
  _end: () => void;
  _resetDisconnectCount: () => void;
  _tick: () => void;
  _onPlay: () => void;
  _onSeeking: () => Promise<void>;
  _onTimeupdate: () => void;
  _onWaiting: () => void;
  _onBufferUpdate: () => void;
  _checkPreload: () => Promise<void>;
  _onFlvScriptData: (sample: any) => void;
}

export function getOption(opts: FlvOption): FlvOption;
export type FlvOption = {
  media: HTMLMediaElement;
  url?: string;
  isLive?: boolean;
  softDecode?: boolean;
  analyzeDuration?: number;
  maxJumpDistance?: number;
  maxLatency?: number;
  targetLatency?: number;
  bufferBehind?: number;
  retryCount?: number;
  retryDelay?: number;
  disconnectRetryCount?: number;
  loadTimeout?: number;
  maxReaderInterval?: number;
  preloadTime?: number;
  defaultVodLoadSize?: number;
  disconnectTime?: number;
  fetchOptions?: RequestInit;
  seamlesslyReload: boolean;
  keepStatusAfterSwitch?: boolean;
  onlyVideo?: boolean;
  onlyAudio?: boolean;
  preferMMS?: boolean;
  preProcessUrl?: (url: string, ext?: {
    [propName: string]: any;
  }) => {
    [propName: string]: any;
    url: string;
  };
};

declare namespace K {
  type StatsInfo = {
    downloadSpeed: number;
    avgSpeed: number;
    currentTime: number;
    bufferEnd: number;
    decodeFps: number;
    encodeType: string;
    audioCodec: string;
    videoCodec: string;
    domain: string;
    fps: number;
    bitrate: number;
    width: number;
    height: number;
    samplerate: number;
    channelCount: number;
    gop: number;
  };

  export class BufferService {
    constructor(flv: Flv, softVideo?: any, opts?: any);
    flv: Flv | null;
    _demuxer: FlvDemuxer;
    _remuxer: any;
    _mse: any;
    _softVideo: any;
    _sourceCreated: boolean;
    _needInitSegment: boolean;
    _discontinuity: boolean;
    _contiguous: boolean;
    _initSegmentId: string;
    _cachedBuffer: any;
    _demuxStartTime: number;
    _opts: any;
    get baseDts(): number;
    get blobUrl(): any;
    isFull(mediaType?: string): any;
    seamlessSwitch(): void;
    unContiguous(startTime: any): void;
    reset(reuseMse?: boolean): Promise<void>;
    endOfStream(): Promise<void>;
    updateDuration(duration: any): Promise<void>;
    destroy(): Promise<void>;
    appendBuffer(chunk: any): Promise<any[]>;
    evictBuffer(bufferBehind: any): Promise<any>;
    _emitMetaParsedEvent(videoTrack: any, audioTrack: any): void;
    _fireEvents(videoTrack: any, audioTrack: any, metadataTrack: any): void;
  }

  export class FlvDemuxer {
    static AUDIO_RATE: number[];
    static probe(data: Uint8Array): boolean;
    /**
     * @param {VideoTrack} [videoTrack]
     * @param {AudioTrack} [audioTrack]
     * @param {MetadataTrack} [metadataTrack]
     */
    constructor(
      videoTrack?: VideoTrack,
      audioTrack?: AudioTrack,
      metadataTrack?: MetadataTrack,
    );
    _headerParsed: boolean;
    _remainingData: any;
    _gopId: number;
    _needAddMetaBeforeKeyFrameNal: boolean;
    videoTrack: VideoTrack;
    audioTrack: AudioTrack;
    metadataTrack: MetadataTrack;
    _fixer: FlvFixer;
    /**
     * @param {Uint8Array} data
     * @param {boolean} [discontinuity=false] 切流
     * @param {boolean} [contiguous=true]
     * @returns {DemuxResult}
     */
    demux(
      data: Uint8Array,
      discontinuity?: boolean,
      contiguous?: boolean,
    ): DemuxResult;

    fix(
      startTime?: number,
      discontinuity?: boolean,
      contiguous?: boolean,
    ): DemuxResult;

    demuxAndFix(
      data: Uint8Array,
      discontinuity?: boolean,
      contiguous?: boolean,
      startTime?: number,
    ): DemuxResult;
    _parseAudio(data: any, pts: any): void;
    _parseG711(data: any, pts: any, format: any): void;
    _parseAac(data: any, pts: any): void;
    _parseVideo(data: any, dts: any): void;
    _checkAddMetaNalToUnits(hevc: any, units: any, track: any): any;
    _parseScript(data: any, pts: any): void;
  }

  export type DemuxResult = {
    videoTrack: VideoTrack;
    audioTrack: AudioTrack;
    metadataTrack: MetadataTrack;
  };
  export class FlvFixer {
    constructor(videoTrack: any, audioTrack: any, metadataTrack: any);
    videoTrack: any;
    audioTrack: any;
    metadataTrack: any;
    _baseDts: number;
    _baseDtsInited: boolean;
    _audioNextPts: any;
    _videoNextDts: any;
    _audioTimestampBreak: number;
    _videoTimestampBreak: number;
    _lastVideoDuration: number;
    _keyFrameInNextChunk: boolean;
    _lastAudioExceptionGapDot: number;
    _lastAudioExceptionOverlapDot: number;
    _lastAudioExceptionLargeGapDot: number;
    _lastVideoExceptionLargeGapDot: number;
    _lastVideoExceptionChunkFirstDtsDot: number;
    /**
     * @param {number} startTime 点播seek到的时间点
     * @param {boolean} discontinuity 是否换流
     * @param {boolean} contiguous 前后chunk时间戳是否连续
     */
    fix(
      startTime?: number,
      discontinuity?: boolean,
      contiguous?: boolean,
    ): void;
    _videoLastSample: any;
    _fixVideo(videoTrack: any): void;
    _fixAudio(audioTrack: any): void;
    _calculateBaseDts(audioTrack: any, videoTrack: any): boolean;
    _resetBaseDtsWhenStreamBreaked(): void;
    _doFixAudioInternal(audioTrack: any, samples: any, timescale: any): void;
    _getG711Duration(track: any): number;
    _getSilentFrame(track: any): Uint8Array;
  }

  class SeiService {
    constructor(emitter: any);
    _seiSet: Set<any>;
    emitter: any;
    throw(currentTime: any, isLive: any): void;
    reset(): void;
  }

  export class BandwidthService {
    _chunkSpeeds: any[];
    _speeds: any[];
    addRecord(totalByte: any, ms: any): void;
    addChunkRecord(totalByte: any, ms: any): void;
    getAvgSpeed(): number;
    getLatestSpeed(): any;
    reset(): void;
  }

  export class NetLoader {
    static isFetchSupport(): boolean;
    constructor(cfg: any);
    type: string;
    _queue: any[];
    _alive: any[];
    _currentTask: any;
    _finnalUrl: string;
    _config: any;
    log: any;
    isFetch(): boolean;
    load(url: any, config?: {}): Promise<any>;
    cancel(): Promise<void>;
    _processTask(): void;
  }

  export class GapService {
    _prevCurrentTime: number;
    do(
      media: any,
      maxJumpDistance: number,
      isLive: any,
      seekThreshold?: number,
    ): void;
  }

  class MediaStatsService {
    constructor(core: any, timescale?: number);
    _core: any;
    _samples: any[];
    _timescale: number;
    _stats: Stats;
    getStats(): StatsInfo;
    _bindEvents(): void;
    reset(): void;
  }

  type Stats = StatsInfo;

  class VideoTrack {
    id: number;
    /** @readonly */
    readonly type: string;
    codecType: string;
    pid: number;
    /** @type {Uint8Array | Object} */
    hvcC: Uint8Array | any;
    codec: string;
    timescale: number;
    formatTimescale: number;
    sequenceNumber: number;
    baseMediaDecodeTime: number;
    baseDts: number;
    duration: number;
    warnings: any[];
    // VideoSample
    samples: any[];
    /** @type {Uint8Array[]} */
    pps: Uint8Array[];
    /** @type {Uint8Array[]} */
    sps: Uint8Array[];
    /** @type {Uint8Array[]} */
    vps: Uint8Array[];
    fpsNum: number;
    fpsDen: number;
    /** @type {[number, number]} */
    sarRatio: [number, number];
    width: number;
    height: number;
    nalUnitSize: number;
    present: boolean;
    isVideoEncryption: boolean;
    isAudioEncryption: boolean;
    isVideo: boolean;
    kid: any;
    pssh: any;
    /** @type {any} */
    ext: any;
    reset(): void;
    /**
     * @returns {boolean}
     */
    exist(): boolean;
    /**
     * @returns {boolean}
     */
    hasSample(): boolean;
    get isEncryption(): boolean;
  }

  class AudioTrack {
    id: number;
    /** @readonly */
    readonly type: string;
    codecType: string;
    pid: number;
    codec: string;
    sequenceNumber: number;
    sampleDuration: number;
    timescale: number;
    formatTimescale: number;
    baseMediaDecodeTime: number;
    duration: number;
    warnings: any[];
    samples: AudioSample[];
    baseDts: number;
    sampleSize: number;
    sampleRate: number;
    channelCount: number;
    objectType: number;
    sampleRateIndex: number;
    config: number[];
    present: boolean;
    isVideoEncryption: boolean;
    isAudioEncryption: boolean;
    kid: any;
    /** @type {any} */
    ext: any;
    reset(): void;
    /**
     * @returns {boolean}
     */
    exist(): boolean;
    /**
     * @returns {boolean}
     */
    hasSample(): boolean;
    get isEncryption(): boolean;
  }

  class AudioSample {
    /**
     * @param {number} pts
     * @param {Uint8Array} data
     * @param {number} [duration=1024]
     */
    constructor(
      pts: number,
      data: Uint8Array,
      duration?: number,
      sampleOffset?: any,
    );
    duration: number;
    flag: {
      dependsOn: number;
      isNonSyncSample: number;
    };
    keyframe: boolean;
    originPts: number;
    pts: number;
    dts: number;
    data: Uint8Array;
    size: number;
    sampleOffset: any;
  }

  class FlvScriptSample extends Sample {
  }
  class SeiSample extends Sample {
  }
  class MetadataTrack {
    readonly id: 3;
    readonly type: string;
    timescale: number;
    flvScriptSamples: FlvScriptSample[];
    seiSamples: SeiSample[];
    exist(): boolean;
    reset(): void;
    hasSample(): boolean;
  }
  class Sample {
    constructor(data: any, pts: number);
    time: number;
    data: any;
    originPts: number;
    pts: number;
  }
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 */
declare class EventEmitter<
  EventTypes extends E.ValidEventTypes = string | symbol,
  Context extends any = any,
> {
  static prefixed: string | boolean;

  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   */
  eventNames(): Array<E.EventNames<EventTypes>>;

  /**
   * Return the listeners registered for a given event.
   */
  listeners<T extends E.EventNames<EventTypes>>(
    event: T,
  ): Array<E.EventListener<EventTypes, T>>;

  /**
   * Return the number of listeners listening to a given event.
   */
  listenerCount(event: E.EventNames<EventTypes>): number;

  /**
   * Calls each of the listeners registered for a given event.
   */
  emit<T extends E.EventNames<EventTypes>>(
    event: T,
    ...args: E.EventArgs<EventTypes, T>
  ): boolean;

  /**
   * Add a listener for a given event.
   */
  on<T extends E.EventNames<EventTypes>>(
    event: T,
    fn: E.EventListener<EventTypes, T>,
    context?: Context,
  ): this;
  addListener<T extends E.EventNames<EventTypes>>(
    event: T,
    fn: E.EventListener<EventTypes, T>,
    context?: Context,
  ): this;

  /**
   * Add a one-time listener for a given event.
   */
  once<T extends E.EventNames<EventTypes>>(
    event: T,
    fn: E.EventListener<EventTypes, T>,
    context?: Context,
  ): this;

  /**
   * Remove the listeners of a given event.
   */
  removeListener<T extends E.EventNames<EventTypes>>(
    event: T,
    fn?: E.EventListener<EventTypes, T>,
    context?: Context,
    once?: boolean,
  ): this;
  off<T extends E.EventNames<EventTypes>>(
    event: T,
    fn?: E.EventListener<EventTypes, T>,
    context?: Context,
    once?: boolean,
  ): this;

  /**
   * Remove all listeners, or those of the specified event.
   */
  removeAllListeners(event?: E.EventNames<EventTypes>): this;
}

declare namespace E {
  export interface ListenerFn<Args extends any[] = any[]> {
    (...args: Args): void;
  }

  export interface EventEmitterStatic {
    new <
      EventTypes extends ValidEventTypes = string | symbol,
      Context = any,
    >(): EventEmitter<EventTypes, Context>;
  }

  /**
   * `object` should be in either of the following forms:
   * ```
   * interface EventTypes {
   *   'event-with-parameters': any[]
   *   'event-with-example-handler': (...args: any[]) => void
   * }
   * ```
   */
  export type ValidEventTypes = string | symbol | object;

  export type EventNames<T extends ValidEventTypes> = T extends string | symbol
    ? T
    : keyof T;

  export type ArgumentMap<T extends object> = {
    [K in keyof T]: T[K] extends (...args: any[]) => void ? Parameters<T[K]>
      : T[K] extends any[] ? T[K]
      : any[];
  };

  export type EventListener<
    T extends ValidEventTypes,
    K extends EventNames<T>,
  > = T extends string | symbol ? (...args: any[]) => void
    : (
      ...args: ArgumentMap<Exclude<T, string | symbol>>[Extract<K, keyof T>]
    ) => void;

  export type EventArgs<
    T extends ValidEventTypes,
    K extends EventNames<T>,
  > = Parameters<EventListener<T, K>>;

  export const EventEmitter: EventEmitterStatic;
}
