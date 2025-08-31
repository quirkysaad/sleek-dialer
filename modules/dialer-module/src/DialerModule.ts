import { NativeModule, requireNativeModule } from 'expo';

import { DialerModuleEvents } from './DialerModule.types';

declare class DialerModule extends NativeModule<DialerModuleEvents> {
  PI: number;
  hello(): string;
  calculate(a: number, b: number): number;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<DialerModule>('DialerModule');
