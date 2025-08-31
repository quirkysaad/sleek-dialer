// Reexport the native module. On web, it will be resolved to DialerModule.web.ts
// and on native platforms to DialerModule.ts
export { default } from './src/DialerModule';
export * from  './src/DialerModule.types';

export { default as CallLogsModule } from './src/CallModule';
